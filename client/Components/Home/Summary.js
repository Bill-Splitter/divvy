import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Banner2 from "./Banner2";

const Summary = (props) => {
  const friendArray = props.friends.friend || [];
  console.log(friendArray.length);

  const navigation = useNavigation();

  const sendInvoices = () => {
    alert("sending invoices, each user will be charge");
  };
  return (
    <View style={{ display: "flex", backgroundColor: "white", height: "88%" }}>
      <Banner2 />
      <View
        style={{
          display: "flex",
          backgroundColor: "white",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.info}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Event Summary</Text>
          </View>

          <View style={styles.borderBar}></View>
          <View style={styles.listRow}>
            <Text style={styles.listName}>You</Text>
            <Text style={styles.listPercent}>
              {Math.floor(100 / (friendArray.length + 1))}%
            </Text>

            <Text style={styles.listText}>
              {"$ "}
              {(props.info.total / (friendArray.length + 1)).toFixed(2)}
            </Text>
          </View>

          {friendArray.map((element) => {
            return (
              <View key={element.id} style={styles.listRow}>
                <Text style={styles.listName}>{element.username}</Text>
                <Text style={styles.listPercent}>
                  {Math.floor(100 / (friendArray.length + 1))}
                  {"%"}
                </Text>
                <Text style={styles.listText}>
                  {"$"}{" "}
                  {(props.info.total / (friendArray.length + 1)).toFixed(2)}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={styles.footer}>
          <View style={styles.borderBar}></View>
          <Text style={styles.eventName}>{props.info.name}</Text>
          <Text style={styles.totalAmount}>
            Total:{"  "} ${props.info.total}
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

const mapStateToProps = (state) => {
  return {
    info: state.split,
    friends: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signUp: (data) => dispatch(signupThunk(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Summary);

const styles = StyleSheet.create({
  listRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    textAlign: "left",
    justifyContent: "space-between",
    padding: 10,
  },
  listText: {
    textAlign: "right",
    paddingRight: 20,
    width: "33.33%",
    color: "#ED3B5B",
    fontSize: 30,
    fontWeight: "bold",
  },
  listName: {
    textAlign: "left",
    color: "#ED3B5B",
    width: "33.33%",
    fontSize: 30,
    paddingLeft: 15,
  },
  listPercent: {
    width: "33.33%",
    textAlign: "center",
    color: "#ED3B5B",
    fontSize: 30,
  },

  headerText: {
    fontSize: 40,
    color: "#ED3B5B",
    textAlign: "left",
    fontWeight: "bold",
    paddingLeft: 20,
    marginBottom: 10,
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
    backgroundColor: "#ED3B5B",
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
