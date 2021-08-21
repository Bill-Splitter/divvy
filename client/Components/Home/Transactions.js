import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Banner2 from "./Banner2";

export default Transactions = () => {
  return (
    <SafeAreaView style={{ flex: 0, backgroundColor: "white", height: "100%" }}>
      <Banner2/>
      <Text>Transactions</Text>
    </SafeAreaView>
  );
};
