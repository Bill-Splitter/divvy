import React from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
  TouchableHighlight,
  Button,
  Alert,
  Platform,
  StatusBar,
  Dimensions,
  Header,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Banner() {
  return (
    <View style={{ width: "100%", height: "20%", }}>
      <View style={{ marginLeft: 10, padding: 5, }}>
        <AntDesign name="left" size={24} color="#ED3B5B" />
      </View>
      <View
        style={{
          flex: 0,
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "90%",
            borderBottomWidth: "1",
            backgroundColor: "#D7CBCB",
            borderColor: "#D7CBCB",
            marginTop: 10,
            height: 1,
          }}
        ></View>
      </View>
    </View>
  );
}
