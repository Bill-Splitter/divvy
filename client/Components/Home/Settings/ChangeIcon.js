import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner2 from "../Banner2";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from "react-native";

const ChangeIcon = () => {
  return (
    <View style={{ flex: 0, backgroundColor: "white", height: "100%" }}>
      <Banner2 name={"Change User Icon"} />
      <Text>To do</Text>
    </View>
  );
};

export default ChangeIcon;