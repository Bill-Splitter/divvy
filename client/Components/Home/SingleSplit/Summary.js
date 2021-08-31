import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { createBillThunk } from "../../../store/bill";
import items from "./options";
import Item from "./Item";
import SplitEvenly from "./SplitEvenly";
import SplitCustom from "./SplitCustom";

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  Alert,
  FlatList,
} from "react-native";

import Banner3 from "../Banner3";

const Summary = () => {
  const info = useSelector((state) => state.split);
  const friends = useSelector((state) => state.user);
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  const friendArray = friends.friend || [];
  const navigation = useNavigation();
  const [selected, setSelected] = React.useState('simple')
  const [valid, setValid] = React.useState(false)

  const sendInvoices = () => {
    if(valid || selected==="simple"){
      Alert.alert(
        "Sending Invoices",
        "Each user will be sent a request for their repsective amount.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          { text: "Send", onPress: () => submit() },
        ]
      );

    } else {
      Alert.alert("Notice", "Cannot Process Until All Dollars Have Been Assigned")
    }

  };

  const toggle  = (value) => {
    if(value === true) setValid(true)
    if(value === false) setValid(false)
  }

  const submit = () => {
    const billText = {
      title: info.name,
      total: info.total,
      group: info.group,
      userAmounts: (info.total / (groupFriends.length + 1)).toFixed(2),
    };

    const newBill = {
      type: "simple",
      name: info.name,
      total: info.total,
      parsedBill: billText,
      completed: true,
      userId: userId,
      date: Date.now(),
    };
    dispatch(createBillThunk(newBill, userId, groupFriends));
    navigation.navigate("ProfilePage");
  };

 

  const groupFriends = friendArray.filter((element) => {
    if (info.idArray.includes(element.id)) {
      return element;
    }
  });

  return (
    <View style={{ display: "flex", backgroundColor: "white", height: "88%" }}>
      <Banner3 name={info.group} />
      <View
        style={{
          display: "flex",
          backgroundColor: "white",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Event Summary</Text>
          <FlatList
            horizontal={true}
            data={items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(item) => {
              return <Item data={item} selected={selected} setSelected={setSelected}/>;
            }}
          />
        </View>
        {selected === "simple" ? 
        <SplitEvenly groupFriends={groupFriends} info={info} toggle={toggle}  /> :
        <SplitCustom groupFriends={groupFriends} info={info} toggle={toggle}/> 
        }

        <View style={styles.footer}>
          <View style={styles.borderBar}></View>
          <Text style={styles.eventName}>{info.name}</Text>
          <Text style={styles.totalAmount}>
            Total:{"  "} ${info.total}
          </Text>
          <TouchableHighlight
            style={styles.sendInvoice}
            onPress={() => sendInvoices()}
          >
            <Text style={styles.sendInvoiceText}>Send Invoices</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

export default Summary;

const styles = StyleSheet.create({

  listRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    textAlign: "left",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
  },
  listText: {
    textAlign: "right",
    paddingRight: 20,
    width: "33.33%",
    // color: "#ED3B5B",
    fontSize: 25,
    fontWeight: "bold",
  },
  listName: {
    textAlign: "left",
    // color: "#ED3B5B",
    width: "45%",
    fontSize: 20,
    paddingLeft: 15,
    fontWeight: "bold",
  },
  listPercent: {
    width: "20%",
    textAlign: "center",
    // color: "#ED3B5B",
    fontSize: 25,
    fontWeight: "bold",
  },

  headerText: {
    fontSize: 40,
    // color: "#ED3B5B",
    textAlign: "left",
    fontWeight: "bold",
    paddingLeft: 20,
    marginBottom: 5,
    marginTop: 10,
  },
  totalAmount: {
    textAlign: "center",
    color: "black",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 10,
  },
  eventName: {
    textAlign: "center",
    color: "black",
    fontSize: 23,
    paddingTop: 20,
  },
  info: {
    backgroundColor: "white",
  },
  footer: {
    position: "relative",
    bottom: 0,
    alignItems: "center",
  },
  sendInvoice: {
    width: "50%",
    backgroundColor: "#3bedac",
    borderRadius: 45,
    marginTop: 20,
    marginBottom: 5,
  },
  sendInvoiceText: {
    fontSize: 25,
    color: "white",
    padding: 16,
    textAlign: "center",
  },
  borderBar: {
    width: "100%",
    borderBottomWidth: 1,
    backgroundColor: "#D7CBCB",
    borderColor: "#D7CBCB",
    marginTop: 10,
    height: 1,
  },
});
