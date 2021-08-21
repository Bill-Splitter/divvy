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
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Banner from "./Banner";

export default function Signup() {
  return (
    <SafeAreaView style={{ flex: 0, backgroundColor: "white", height: "100%", paddingTop: 25}}>
      <Banner></Banner>
      <View
        style={{
          width: "100%",
          flex: 0,
          alignContent: "center",
          textAlign: "left",
          justifyContent: "center",
          alignItems: "center",
          marginTop: -50,
        }}
      >
        <Text
          style={{
            fontSize: 40,
            color: "#ED3B5B",
            textAlign: "left",
            marginBottom: 20,
            width: "80%",
          }}
        >
          Signup
        </Text>
        <TextInput placeholder="username" style={styles.input}></TextInput>
        <TextInput placeholder="email" style={styles.input}></TextInput>
        <TextInput placeholder="phone number" style={styles.input}></TextInput>
        <TextInput placeholder="password" style={styles.input}></TextInput>
        <TouchableHighlight
          style={{ width: "50%", backgroundColor: "#ED3B5B", borderRadius: 45, marginTop: 20 }}

        >
          <Text
            style={{
              fontSize: 25,
              color: "white",
              padding: 16,
              textAlign: "center",
            }}
          >
            Login
          </Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderColor: "#313359",
    padding: 10,
    width: "90%",
    borderRadius: 999,
    paddingLeft: 20,
  },
});
