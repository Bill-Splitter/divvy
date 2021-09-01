import React, { useState } from "react";
import Banner2 from "../Banner2";

import { StyleSheet, Text, View, TouchableHighlight } from "react-native";

const IndividualTrans = ({ route, navigation }) => {
  const { data } = route.params;

  const date = new Date(data.date)
    .toISOString()
    .replace("-", "/")
    .split("T")[0]
    .replace("-", "/");

  return (
    <View style={{ flex: 0, backgroundColor: "white", height: "100%" }}>
      <Banner2 name={data.parsedBill.group} />
      <View style={styles.container}>
        <Text numberOfLines={1} style={styles.event}>
          {data.name}
        </Text>
        <View style={styles.dateHolder}>
          <Text style={styles.date}>{date}</Text>
        </View>
        <View style={styles.money}>
          <Text style={styles.text}>Total Cost</Text>
          <Text style={styles.dollars}>${Number(data.total).toFixed(2)}</Text>
          <Text style={styles.text}>You Paid</Text>
          <View style={styles.dateHolder2}>
          <Text style={styles.dollars2}>${Number(data.parsedBill.userAmounts).toFixed(2)}</Text>

          </View>
         
        </View>
      </View>
    </View>
  );
};

export default IndividualTrans;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
  },
  event: {
    fontSize: 35,
    color: "#ED3B5B",
    fontWeight: "bold",
    padding: 5,
  },
  dateHolder: {
    backgroundColor: "#ED3B5B",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 99,
  },
  dateHolder2: {
    backgroundColor: "#3bedac",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 99,
  },
  date: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  money: {
    alignItems: "center",
    marginTop: 10,
  },
  text: {
    fontSize: 20,
    padding: 5

  }, dollars: {
    fontSize: 30,
    color: "#ED3B5B",
    fontWeight: "bold",

  },
  dollars2: {
    fontSize: 40,
    color: "white",
    fontWeight: "bold",

  }
});
