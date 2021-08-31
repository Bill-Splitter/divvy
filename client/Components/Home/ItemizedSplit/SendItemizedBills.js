import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { createBillThunk } from "../../../store/bill";
import formatPhoneNumber from "../../Helpers/formatPhone";

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  Alert,
} from "react-native";

import Banner3 from "../Banner3";

const SendItemizedBills = () => {
  const info = useSelector((state) => state.split);
  const friends = useSelector((state) => state.user);
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  const friendArray = friends.friend || [];
  const navigation = useNavigation();
  const route = useRoute();

  const sendInvoices = () => {
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
  };
  
  const submit = () => {
    //console.log(route.params);
    const billText = {
      title: info.name,
      total: info.total,
      group: info.group,
      userAmounts: (info.total / (friendArray.length + 1)).toFixed(2),
    };

    const newBill = {
      type: "complex",
      name: info.name,
      total: info.total,
      parsedBill: billText,
      image: route.params.image.uri,
      completed: false,
      userId: userId,
      date: Date.now(),
    };
    dispatch(createBillThunk(newBill, userId, groupFriends));
    
    //send group text message to all members of group
    
    //natigate to OwnerOpenBill
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
        <ScrollView style={styles.info}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Event Summary</Text>
          </View>
          <View style={styles.borderBar}></View>
          {groupFriends.map((element) => {
            return (
              <View key={element.id} style={styles.listRow}>
                <Text numberOfLines={1} style={styles.listName}>
                  {element.fName} {element.lName}
                </Text>
                <Text style={styles.phoneNumber} numberOfLines={1}>
                  {formatPhoneNumber(element.phoneNumber)}
                </Text>
              </View>
            );
          })}
        </ScrollView>
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
            <Text style={styles.sendInvoiceText}>Send Invoice Invites</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

export default SendItemizedBills;

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
  phoneNumber: {
    width: "50%",
    textAlign: "center",
    // color: "#ED3B5B",
    fontSize: 22,
    fontStyle: "italic",
  },

  headerText: {
    fontSize: 40,
    color: "#ED3B5B",
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
    width: "66%",
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
