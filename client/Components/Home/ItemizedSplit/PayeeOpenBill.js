/*
see figma for visual reference:
    1) get bill picture

    2) show text field with add button next to it

    3) when payee types in line item & hits add, it shows all the line items being added + total at very bottom
        if current items is: 3.50
        and they add 4.20 to it, then below the text field would show '$3.50 + $4.20'
        and the running total one line below that would show '$7.70'

    4) have done button that sends data to db & in-turn updates owner's open bill view
        sent to db in the bill's parsedBill field in the format of:
            {payeeName: [3.50, 4.20]}
            or maybe just {payeeName: 7.70}?
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
  KeyboardAvoidingView,
} from "react-native";
import Banner2 from "../Banner2";

const adder = (total, num) => {
  return total + num;
};

const PayeeOpenBill = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user || {});
  const bill = useSelector((state) => state.bill.bill || {});
  const parsedBill = useSelector((state) => state.bill.parsedBill || {});

  const [paid, setPaid] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userAmounts, setUserAmounts] = useState([]);

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

  //only clickable if allFriendsPaid == true
  const clickSubmit = () => {
    navigation.navigate("ProfilePage");
  };

  //console.log('route: ', route);
  //console.log('navigation: ', navigation);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ backgroundColor: "white", height: "100%" }}
    >
      <View style={{ backgroundColor: "white", height: "95%" }}>
        <Banner2 name="Submitting Payment" home={true} />
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
            <View style={styles.inputField}>
              <View style={styles.lineItemInputField}></View>
              <View style={styles.lineItemSumField}></View>
            </View>
            <View style={styles.totalField}>
              <Text
                style={styles.totalText}
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
    </KeyboardAvoidingView>
  );
};

export default PayeeOpenBill;

const styles = StyleSheet.create({
  view: {
    height: "100%",
    display: "flex",
    backgroundColor: "#6e6e6e",
    justifyContent: "flex-start",
    alignContent: "center",
    textAlign: "left",
    alignItems: "center",
    top: 0,
    bottom: 55,
  },
  textFields: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flex: 9,
    paddingTop: 5,
  },
  inputField: {
    display: "flex",
    flex: 6,
    width: "100%",
    height: "100%",
    minHeight: 38,
  },
  lineItemInputField: {
    backgroundColor: "white",
    display: "flex",
    flex: 4,
    width: "100%",
    height: "100%",
    minHeight: 20,
  },
  lineItemSumField: {
    backgroundColor: "#ababab",
    display: "flex",
    flex: 3,
    width: "100%",
    height: "100%",
    minHeight: 15,
  },
  lineItemSumText: {
    textAlign: "center",
    fontSize: 12,
    color: "black",
    width: "100%",
    top: 0,
  },
  totalField: {
    backgroundColor: "#ababab",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 2,
  },
  totalText: {
    textAlign: "left",
    fontSize: 12,
    color: "black",
    width: "100%",
    top: 0,
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
