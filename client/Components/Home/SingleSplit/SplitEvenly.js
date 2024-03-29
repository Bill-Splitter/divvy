import React, { useState } from "react";
import { useSelector } from "react-redux";

import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";

const SplitEvenly = (props) => {
  const user = useSelector((state) => state.user);
  let [loaded, setLoaded] = React.useState(false);
  let data = [];
  const prepUserData = () => {
    data = [
      {
        name: user.fName + " " + user.lName,
        id: user.id,
        value: props.info.total / (props.groupFriends.length + 1).toFixed(2),
      },
    ];
    props.groupFriends.forEach((element, index) => {
      const name = element.fName + " " + element.lName;
      data.push({
        name: name,
        id: element.id,
        value: props.info.total / (props.groupFriends.length + 1).toFixed(2),
      });
    });
  };

  if (!loaded) {
    prepUserData();
    props.setUserData(data);
    setLoaded(true);
  }

  return (
    <ScrollView style={styles.info}>
      <View style={styles.borderBar}></View>
      <View style={styles.listRow}>
        <Text style={styles.listName}>You</Text>
        <Text style={styles.listPercent}>
          {Math.floor(100 / (props.groupFriends.length + 1))}%
        </Text>

        <Text numberOfLines={1} style={styles.listText}>
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
              {"$"}{" "}
              {(props.info.total / (props.groupFriends.length + 1)).toFixed(2)}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default SplitEvenly;

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
    fontSize: 20,
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
    fontSize: 20,
    fontWeight: "bold",
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
