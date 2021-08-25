import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Banner2 from "./Banner2";

export default Messages = () => {
  return (
    <View style={{ flex: 0, backgroundColor: "white", height: "100%" }}>
      <Banner2 />
      <Text>Messages</Text>
    </View>
  );
};
