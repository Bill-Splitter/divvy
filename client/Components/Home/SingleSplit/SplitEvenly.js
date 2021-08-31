
import React, { useState } from "react";



import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  Alert,
  FlatList
} from "react-native";


const SplitEvenly = (props) => {
    return (
        <ScrollView style={styles.info}>
   
          <View style={styles.borderBar}></View>
          <View style={styles.listRow}>
            <Text style={styles.listName}>You</Text>
            <Text style={styles.listPercent}>
              {Math.floor(100 / (props.groupFriends.length + 1))}%
            </Text>

            <Text style={styles.listText}>
              {"$ "}
              {(props.info.total / (props.groupFriends.length + 1)).toFixed(2)}
            </Text>
          </View>

          {props.groupFriends.map((element) => {
            return (
              <View key={element.id} style={styles.listRow}>
                <Text numberOfLines={1} style={styles.listName}>
                  {element.fName} {element.lName}
                </Text>
                <Text style={styles.listPercent}>
                  {Math.floor(100 / (props.groupFriends.length + 1))}
                  {"%"}
                </Text>
                <Text numberOfLines={1} style={styles.listText}>
                  {"$"} {(props.info.total / (props.groupFriends.length + 1)).toFixed(2)}
                </Text>
              </View>
            );
          })}
        </ScrollView>

    )
}



export default SplitEvenly

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
  