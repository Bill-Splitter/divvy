import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Banner from "./Banner";

export default function Login() {
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();

  return (
    <SafeAreaView style={{ flex: 0, backgroundColor: "white", height: "100%" }}>
      <Banner></Banner>
      <View style={styles.view}>
        <Text style={styles.loginText}>Login</Text>
        <TextInput placeholder="username" 
          style={styles.input}
          value={username}
          maxLength={30}
          onChangeText={(text) => setUsername(text)}></TextInput>

        <TextInput
          placeholder="password"
          secureTextEntry={true}
          style={styles.input}
          value={password}
          maxLength={30}
          onChangeText={(text) => setPassword(text)}
        ></TextInput>

        <TouchableHighlight
          style={styles.loginButton}
          onPress={() => alert(`username: ${username} password: ${password}`)}
        >
          <Text style={styles.loginButtonText}>Login</Text>
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
  view: {
    width: "100%",
    flex: 0,
    alignContent: "center",
    textAlign: "left",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -50,
  },
  loginText: {
    fontSize: 40,
    color: "#ED3B5B",
    textAlign: "left",
    marginBottom: 20,
    width: "80%",
  },

  loginButton: {
    width: "50%",
    backgroundColor: "#ED3B5B",
    borderRadius: 45,
    marginTop: 20,
  },

  loginButtonText: {
    fontSize: 25,
    color: "white",
    padding: 16,
    textAlign: "center",
  },
});
