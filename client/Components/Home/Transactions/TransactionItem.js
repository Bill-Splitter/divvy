import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { StyleSheet, Text, View, TouchableHighlight } from "react-native";

const TransactionItem = (props) => {
  const navigation = useNavigation();

  let dateObj = new Date(props.data.item.date);
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  dateObj = dateObj
    .toISOString()
    .replace("-", "/")
    .split("T")[0]
    .replace("-", "/");

  return (
    <TouchableHighlight
      underlayColor={"transparent"}
      onPress={() => navigation.navigate("IndividualTrans", {data: props.data.item})}
    >
      <View style={styles.container}>
        <Text style={styles.dateText}>
          {month}/{day}
        </Text>

        <View style={styles.info}>
          <Text numberOfLines={1} style={styles.text2}>
            {props.data.item.name}
          </Text>
          <Text numberOfLines={1} style={styles.text}>
            Total: ${Number(props.data.item.total).toFixed(2)}
          </Text>
          <Text numberOfLines={1} style={styles.text}>
            Your Share: $
            {Number(props.data.item.parsedBill.userAmounts).toFixed(2)}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  dateText: {
    fontSize: 35,
    margin: 0,
    color: "#ED3B5B",
  },
  info: {
    marginLeft: 15,
    color: "#ED3B5B",
  },
  text: {
    color: "#ED3B5B",
  },
  text2: {
    color: "#ED3B5B",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default TransactionItem;
