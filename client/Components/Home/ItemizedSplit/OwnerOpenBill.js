/*
see figma for visual reference:
    1) get bill picture, done

    2) poll bill at set interval to see if payees sent updates to the parsed bill

    3) when all payees added to bill have submitted their payment, show Next button

    4) next button sends you to ItemizedSummary view
*/
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  fetchBillThunk,
  fetchParsedBillThunk,
  completeBillThunk,
} from "../../../store/bill";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import Banner2 from "../Banner2";
import useInterval from "../../Helpers/utils";

const adder = (total, num) => {
  return total + num;
};

const oneSecond = 1000;

const OwnerOpenBill = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user || {});
  const bill = useSelector((state) => state.bill.bill || {});
  const parsedBill = useSelector((state) => state.bill.parsedBill || {});
  //instead of parsedBill on state, I am using variable below for logic
  let userAmounts;

  const [allFriendsPaid, setAllFriendsPaid] = useState(false);
  const [mounted, setMounted] = useState(false);

  //1000ms * time you want between polls in seconds
  const [updateRate, setUpdateRate] = useState(oneSecond * 10);

  //used to poll for bill/parsedBill updates
  useInterval(() => {
    //allows initial api call to be loaded into bill state
    if (Object.keys(bill).length !== 0 && bill.owes) {
      checkAllFriendsPaid();
      dispatch(fetchBillThunk(route.params.bill.id));
    }
  }, updateRate);

  useEffect(() => {
    setMounted(true);
  }, []);

  //fetches only the parsedBill & loads it into state (not used)
  const fetchStates = async () => {
    await dispatch(fetchParsedBillThunk(route.params.bill.id));
  };

  //loads bill into state on load
  if (!mounted) {
    dispatch(fetchBillThunk(route.params.bill.id));
  }

  const checkAllFriendsPaid = () => {
    //checks if all friends paid
    if (Object.keys(bill).length !== 0 && bill.owes) {
      let allFriendsPaidTemp = true;

      //if any of them are false, the whole thing returns false;
      bill.owes.forEach((payee) => {
        if (checkIfFriendPaid(payee.id) === null) {
          allFriendsPaidTemp = false;
        }
      });

      //dont want to reset state if not already true
      if (!allFriendsPaid && allFriendsPaidTemp) {
        setAllFriendsPaid(true);
      }

      //catches if there is a time where all parsedBill had all friends,
      //but then gets updated to no longer include all of them.
      if (allFriendsPaid && !allFriendsPaidTemp) {
        setAllFriendsPaid(false);
      }
    }
  };

  //return index of friend if they paid, returns false if not.
  const checkIfFriendPaid = (friendId) => {
    let friendPaidTemp = null;

    if (Object.keys(bill).length !== 0 && bill.parsedBill) {
      userAmounts.forEach((payeeInfo, index) => {
        if (payeeInfo.id === friendId) {
          friendPaidTemp = index;
        }
      });
    }

    return friendPaidTemp;
  };

  if (Object.keys(bill).length !== 0 && bill.parsedBill) {
    userAmounts = bill.parsedBill.userAmounts;
    checkAllFriendsPaid();
  }

  //only clickable if allFriendsPaid == true
  const clickSubmit = () => {
    //stop useInterval running by passing null
    setUpdateRate(null);

    //add current user to bill as remaining total:

    //make this summary page again, whoops
    navigation.navigate("ItemizedSummary", { bill: bill, user: user });
  };

  //console.log('route: ', route);
  //console.log('navigation: ', navigation);

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <Banner2
        name={allFriendsPaid ? "Recieved Payments" : "Awaiting Payment"}
        home={true}
      />
      <View style={styles.view}>
        <Image
          source={
            Object.keys(bill).length !== 0
              ? { uri: bill.image }
              : { uri: route.params.bill.image }
          }
          style={{
            flex: 20,
            width: "100%",
            height: "100%",
            resizeMode: "contain",
          }}
        />
        <View style={styles.textFields}>
          <ScrollView
            style={{
              display: "flex",
              flex: 6,
              width: "100%",
              height: "100%",
              minHeight: 37,
            }}
          >
            {Object.keys(bill).length !== 0 && bill.owes ? (
              bill.owes.map((friend, index) => {
                let nameOutput = "";

                if (friend.fName.length + friend.lName.length > 10) {
                  nameOutput = `${friend.fName} ${friend.lName[0]}:`;
                } else {
                  nameOutput = `${friend.fName} ${friend.lName}:`;
                }

                return (
                  <View style={styles.textRow} key={friend.id}>
                    <Text
                      style={styles.listTextName}
                      key={friend.id}
                      numberOfLines={1}
                      onPress={() =>
                        console.log(
                          "change friend's total to show each line item"
                        )
                      }
                    >
                      {nameOutput}
                    </Text>
                    <Text
                      style={styles.listTextTotal}
                      key={friend.fName + friend.lName}
                      onPress={() =>
                        console.log(
                          "change friend's total to show each line item"
                        )
                      }
                    >
                      {/*had to say !== null because index 0 returning is a 'falsy' value*/}
                      {checkIfFriendPaid(friend.id) !== null
                        ? userAmounts[checkIfFriendPaid(friend.id)].totalString
                        : "waiting..."}
                    </Text>
                  </View>
                );
              })
            ) : (
              <View style={styles.textRow}>
                <Text style={styles.listText}>No Friend Data Recieved</Text>
              </View>
            )}
          </ScrollView>
          <View style={styles.statusField}>
            {allFriendsPaid ? (
              <TouchableHighlight
                style={styles.doneButton}
                onPress={() => clickSubmit()}
              >
                <Text style={styles.doneButtonText}>Summary</Text>
              </TouchableHighlight>
            ) : (
              <Text
                style={styles.paymentStatus}
                AccessibilityRole={"summary"}
                numberOfLines={1}
                suppressHighlighting={true}
                onPress={() => console.log("resendTextPromptToAll()")}
              >
                Awaiting Group Payments...
              </Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default OwnerOpenBill;

const styles = StyleSheet.create({
  view: {
    height: "100%",
    width: "100%",
    display: "flex",
    flex: 1,
    backgroundColor: "black",
    flexDirection: "column",
    justifyContent: "space-around",
    alignContent: "center",
    textAlign: "left",
    alignItems: "center",
  },
  textFields: {
    backgroundColor: "#e8e8e8",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flex: 9,
  },
  textRow: {
    borderStyle: "solid",
    borderBottomWidth: 1.5,
    borderBottomColor: "#828282",
    borderTopWidth: 0.25,
    borderTopColor: "#828282",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "100%",
    flex: 1,
    margin: -1,
  },
  listTextName: {
    display: "flex",
    flex: 1,
    fontSize: 26,
    color: "black",
    textAlign: "left",
    left: 3,
  },
  listTextTotal: {
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: "black",
    display: "flex",
    flex: 0,
    height: "100%",
    minWidth: "40%",
    fontSize: 26,
    fontStyle: "italic",
    color: "white",
    backgroundColor: "#ED3B5B",
    padding: 4,
    left: 1,
    top: 0.25,
    textAlign: "center",
  },
  statusField: {
    borderStyle: "solid",
    borderTopWidth: 1.5,
    borderBottomWidth: 1,
    borderColor: "#828282",
    backgroundColor: "white",
    width: "100%",
    minHeight: 25,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    flex: 0,
  },
  paymentStatus: {
    textAlign: "center",
    fontSize: 16,
    color: "#828282",
    width: "100%",
  },
  doneButton: {
    width: "45%",
    backgroundColor: "#ED3B5B",
    borderRadius: 45,
    marginTop: 0,
    alignItems: "center",
    alignSelf: "center",
  },
  doneButtonText: {
    fontSize: 22,
    color: "white",
    padding: 10,
    textAlign: "center",
  },
});
