import React, { useState } from "react";
import Banner2 from "../Banner2";

import { StyleSheet, Text, View, TouchableHighlight } from "react-native";

const IndividualTrans = ({ route, navigation }) => {
  const { data } = route.params;

  return (
    <View style={{ flex: 0, backgroundColor: "white", height: "100%" }}>
      <Banner2 name={"Transactions"} />
      <View>
        <Text>{data.name}</Text>
        <Text>{data.date}</Text>
        <Text>{data.parsedBill.group}</Text>
        <Text>{data.total}</Text>
        <Text>{data.parsedBill.userAmounts}</Text>
      </View>
    </View>
  );
};

export default IndividualTrans;
