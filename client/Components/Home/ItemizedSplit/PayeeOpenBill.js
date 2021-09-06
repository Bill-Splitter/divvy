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
  updateParsedBillThunk,
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
  Platform,
  Keyboard,
  Alert,
  TouchableWithoutFeedback,
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
  const [itemPrice, setItemPrice] = useState(null);
  
  let total = '$0.00';
  let lineSumOutput = '';

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

  //console.log("parsedBill: ", parsedBill);

  //only clickable if paid === true
  const clickSubmit = () => {
    if(!paid){
      Alert.alert("Error", "You must add all of your individual reciept items using input before submitting");
      
    } else {
      //append this users parsedBill to parsedBill from state
      const newUserAmounts = [...bill.parsedBill.userAmounts, {
        id: user.id,
        username: user.username,
        fName: user.fName,
        lName: user.lName,
        name: user.fName + " " + user.lName,
        userAmountsArr: userAmounts,
        total: userAmounts.reduce(adder),
        totalString: userAmounts.reduce(adder).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        }),
      }];
      
      const newParsedBill = {...bill.parsedBill, userAmounts: newUserAmounts};
      
      //confirm submission here?
      
      //send parsed bill to store to update bill in DB
      dispatch(updateParsedBillThunk(route.params.bill.id, newParsedBill));
      
      //maybe go to a "Split Sucessfully Submitted" page?
      navigation.navigate("ProfilePage");
    }
  };
  
  const clickAdd = () => {
    if(!itemPrice){
      alert("Must enter line item price");
      
    } else if(isNaN(itemPrice)) {
      Alert.alert("Error", "Line item price must be number; do not include $ sign");
      
    } else {
      const newUserAmounts = [...userAmounts, Number(itemPrice)];
      setUserAmounts(newUserAmounts);
      setItemPrice(null);
      setPaid(true);
    }
  };

  //console.log('route: ', route);
  //console.log('navigation: ', navigation);
  if(userAmounts.length !== 0){
    const userAmountsCopy = [...userAmounts];
    
    total = userAmountsCopy.reduce(adder).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    
    //console.log(userAmountsCopy);
    
    lineSumOutput = '';
    userAmountsCopy.map((value, index) => {
      if(index === userAmountsCopy.length - 1){//last case
        lineSumOutput = lineSumOutput.concat(` ${value}`);
      } else if (index === 0){//first case
        lineSumOutput = lineSumOutput.concat(`${value} +`);
      } else {
        lineSumOutput = lineSumOutput.concat(` ${value} +`);
      }
    });
  }
  
  console.log(lineSumOutput);
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex: 1}}
    >
      <View style={{ backgroundColor: "white", height: "100%" }}>
        <Banner2 name="Submitting Payment" home={true} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            <Text style={styles.infoText}>Calculate Your Bill Total</Text>
            <View style={styles.inputField}>
              <View style={styles.lineItemInputField}>
                <TextInput
                  placeholder="Enter Item Price"
                  style={styles.lineInput}
                  maxLength={6}
                  value={itemPrice}
                  onChangeText={setItemPrice}
                  keyboardType="numeric"
                ></TextInput>
                <TouchableHighlight
                  style={styles.addButton}
                  onPress={() => clickAdd()}
                >
                  <Text style={styles.addButtonText}>+</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.lineItemSumField}>
                <Text style={styles.lineItemSumText}>{lineSumOutput}</Text>
              </View>
            </View>
            <View style={styles.totalField}>
              <Text style={styles.currentTotalLabel}>current total: </Text>
              <Text style={styles.currentTotalText}>{total}</Text>
            </View>
            {paid ? (
              <TouchableHighlight
                style={styles.doneButton}
                onPress={() => clickSubmit()}
              >
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableHighlight>
            ) : (
              <TouchableHighlight
                style={styles.restrictedDoneButton}
                onPress={() => clickSubmit()}
              >
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableHighlight>
            )
            }
          </View>
        </View>
        </TouchableWithoutFeedback>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PayeeOpenBill;

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
    backgroundColor: "#A8A8A8",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flex: 9,
    paddingTop: 0,
  },
  infoText: {
    textAlign: "left",
    fontSize: 16,
    color: "black",
    width: "100%",
    paddingLeft: 15,
  },
  inputField: {
    backgroundColor: "#C4C4C4",
    display: "flex",
    flexDirection: "column",
    flex: 4,
    width: "95%",
    height: "100%",
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginHorizontal: 40,
  },
  lineItemInputField: {
    backgroundColor: "#C4C4C4",
    display: "flex",
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-evenly",
    alignContent: "center",
    alignSelf: "center",
    width: "100%",
    height: "100%",
    marginTop: 10,
    minHeight: 20,
  },
  lineInput: {
    textAlign: "center",
    fontSize: 20,
    backgroundColor: "white",
    width: "55%",
    borderRadius: 45,
    marginTop: 0,
    top: 0,
    
  },
  addButton: {
    width: "20%",
    height: "100%",
    backgroundColor: "#ED3B5B",
    borderRadius: 45,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  addButtonText: {
    fontSize: 25,
    color: "white",
  },
  lineItemSumField: {
    backgroundColor: "#C4C4C4",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  lineItemSumText: {
    textAlign: "center",
    fontSize: 18,
    fontStyle: "italic",
    color: "black",
    width: "100%",
  },
  totalField: {
    backgroundColor: "#C4C4C4",
    width: "95%",
    height: "100%",
    minHeight: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginHorizontal: 40,
    top: 5,
    flex: 1,
  },
  currentTotalLabel: {
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "black",
    right: 20,
  },
  currentTotalText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "black",
    right: 5,
  },
  doneButton: {
    width: "50%",
    backgroundColor: "#ED3B5B",
    borderRadius: 45,
    marginTop: 10,
    alignItems: "center",
    alignSelf: "center",
  },
  restrictedDoneButton: {
    width: "50%",
    backgroundColor: "#828282",
    borderRadius: 45,
    marginTop: 10,
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
