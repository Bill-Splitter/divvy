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
import FriendsList from "./FriendsList";

export default Friends = () => {
  return (
    <View style={{ flex: 0, backgroundColor: "white", height: "100%" }}>
      <FriendsList />
    </View>
  );
};
