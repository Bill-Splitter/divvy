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

const adder = (total, num) => {
  return total + num;
};

const OwnerOpenBill = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user || {});
  const bill = useSelector((state) => state.bill.bill || {});
  const parsedBill = useSelector((state) => state.bill.parsedBill || {});

  const { allFriendsPaid, setAllFriendsPaid } = useState(false);
  const [mounted, setMounted] = useState(false);

  const fetchStates = async () => {
    await dispatch(fetchParsedBillThunk(route.params.bill.id));
  };

  //loads bill into state on load
  if (!mounted) {
    dispatch(fetchBillThunk(route.params.bill.id));
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  console.log("parsedBill: ", parsedBill);

  const checkAllFriendsPaid = () => {
    //checks if all friends paid
    if (bill) {
      let allFriendsPaidTemp = true;

      bill.owes.forEach((payee) => {
        if (!bill.parsedBill.userAmounts.hasOwnProperty(payee.id)) {
          allFriendsPaidTemp = false;
        }
      });

      if (allFriendsPaidTemp) {
        setAllFriendsPaid(true);
      }
    }
  };

  //only clickable if allFriendsPaid == true
  const clickSubmit = () => {
    navigation.navigate("ProfilePage");
  };

  //console.log('route: ', route);
  //console.log('navigation: ', navigation);

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <Banner2
        name={allFriendsPaid ? "Awaiting Payment" : "Recieved Payments"}
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
                let userAmounts = bill.parsedBill.userAmounts;
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
                      {friend.fName} {friend.lName}:
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
                      {userAmounts.hasOwnProperty(friend.id) ? (
                        `$${userAmounts[friend.id].reduce(adder)}`
                      ) : ( 
                        "waiting..."
                      )}
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
            <Text
              style={styles.paymentStatus}
              AccessibilityRole={"summary"}
              numberOfLines={1}
              suppressHighlighting={true}
              onPress={() => console.log("resendTextPromptToAll()")}
            >
              Awaiting Group Payments...
            </Text>
          </View>
        </View>
        {/*
        uncomment when logic for hiding until all payments recieved is done
        <TouchableHighlight
          style={styles.loginButton}
          onPress={() => clickSubmit()}
        >
          <Text style={styles.loginButtonText}>Select Group</Text>
        </TouchableHighlight>
        */}
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
    backgroundColor: "#e3e3e3",
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
    margin: -1
  },
  listTextName: {
    display: "flex",
    flex: 1,
    fontSize: 26,
    color: "black",
    textAlign: "left",
    left: 3
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
    color: "#ED3B5B",
    width: "100%",
  },
  loginButton: {
    width: "50%",
    // backgroundColor: "#3bedac",
    backgroundColor: "#ED3B5B",
    // backgroundColor: "#32d197",
    borderRadius: 45,
    marginTop: 10,
  },
  loginButtonText: {
    fontSize: 20,
    color: "white",
    padding: 10,
    textAlign: "center",
  },
});
