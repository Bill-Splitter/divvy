//probably can use original summary, but should probably move that to a central/different folder if so
import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { completeBillThunk } from "../../../store/bill";

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  Alert,
  FlatList,
} from "react-native";

import Banner2 from "../Banner2";

const ItemizedSummary = () => {
  const info = useSelector((state) => state.split);
  const friends = useSelector((state) => state.user);
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  const friendArray = friends.friend || [];
  const navigation = useNavigation();
  const route = useRoute();
  const [selected, setSelected] = React.useState("complex");
  const [valid, setValid] = React.useState(false);
  const [infoArray, setInfoArray] = React.useState([]);

  console.log("here is bill info", info);
  console.log();

  const sendInvoices = () => {
    if (valid || selected === "complex") {
      Alert.alert(
        "Completing Transaction",
        "Each user will be sent a confirmation for their respective amount paid.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          { text: "Confirm", onPress: () => submit() },
        ]
      );
    } else {
      Alert.alert(
        "Notice",
        "Cannot Process Until All Dollars Have Been Assigned"
      );
    }
  };

  const submit = () => {
    // let billText = {};
    // if (selected === "complex") {
    //   billText = {
    //     title: info.name,
    //     total: info.total,
    //     group: info.group,
    //     userAmounts: (info.total / (groupFriends.length + 1)).toFixed(2),
    //     data: infoArray,
    //   };
    // } else {
    //   billText = {
    //     title: info.name,
    //     total: info.total,
    //     group: info.group,
    //     userAmounts: infoArray[0].value, //I am planning on making this point towards the bill owner's portion
    //     data: infoArray,
    //   };
    // }
    dispatch(completeBillThunk(route.params.user.id));

    // const newBill = {
    //   type: "complex",
    //   name: info.name,
    //   total: info.total,
    //   parsedBill: billText,
    //   completed: true,
    //   userId: userId,
    //   date: Date.now(),
    // };
    // dispatch(createBillThunk(newBill, userId, groupFriends));
    navigation.navigate("ProfilePage");
  };

  const groupFriends = friendArray.filter((element) => {
    if (info.idArray.includes(element.id)) {
      return element;
    }
  });

  return (
    <View style={{ display: "flex", backgroundColor: "white", height: "88%" }}>
      <Banner2 name={info.group} />
      <View style={styles.something}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Event Summary</Text>
          <View>
            {groupFriends.map((elem, index) => {
              return (
                <Text key={index} style={styles.listText}>
                  {elem.fName} {elem.lName}
                </Text>
              );
            })}
          </View>
        </View>

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
            <Text style={styles.sendInvoiceText}>Complete Transaction</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

export default ItemizedSummary;

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
    fontSize: 32,
    color: "#ED3B5B",
    padding: 15,
    textAlign: "left",
  },
  listName: {
    textAlign: "left",
    width: "45%",
    fontSize: 20,
    paddingLeft: 15,
    fontWeight: "bold",
  },
  listPercent: {
    width: "20%",
    textAlign: "center",
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
  something: {
    display: "flex",
    backgroundColor: "white",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
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
