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

export default function Signup() {
  const [username, setUsername] = React.useState();
  const [email, setEmail] = React.useState();
  const [phone, setPhone] = React.useState();
  const [password, setPassword] = React.useState();
  const [check, setCheck] = React.useState();

  const clickSubmit = () => {
    if (!email || !username || !phone || !password || !check) {
      alert("all fields must be filled");
    } else if (check !== password) {
      alert("passwords do not match");
    } else {
      alert("account made");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Banner></Banner>
      <View style={styles.form}>
        <Text style={styles.formTitle}>Create a new account</Text>
        <TextInput
          placeholder="Username"
          style={styles.input}
          maxLength={30}
          onChangeText={(text) => setUsername(text)}
          textContentType={"username"}
        ></TextInput>
        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          textContentType={"emailAddress"}
        ></TextInput>
        <TextInput
          placeholder="Phone Number"
          style={styles.input}
          onChangeText={(text) => setPhone(text)}
          keyboardType={"phone-pad"}
          textContentType={"telephoneNumber"}
        ></TextInput>
        <TextInput
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          textContentType={"password"}
          style={styles.input}
          secureTextEntry={true}
          maxLength={30}
        ></TextInput>
        <TextInput
          placeholder="Confirm"
          textContentType={"password"}
          onChangeText={(text) => setCheck(text)}
          style={styles.input}
          secureTextEntry={true}
          maxLength={30}
        ></TextInput>
        <TouchableHighlight
          style={styles.submitButton}
          onPress={() => clickSubmit()}
        >
          <Text style={styles.submitText}>Signup</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: "white",
    height: "100%",
    paddingTop: 25,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: "#313359",
    padding: 10,
    width: "85%",
    borderRadius: 999,
    paddingLeft: 20,
  },

  form: {
    width: "100%",
    flex: 0,
    alignContent: "center",
    textAlign: "left",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -50,
  },

  formTitle: {
    fontSize: 35,
    color: "#ED3B5B",
    textAlign: "left",
    marginBottom: 20,
    width: "80%",
  },
  submitButton: {
    width: "50%",
    backgroundColor: "#ED3B5B",
    borderRadius: 45,
    marginTop: 20,
  },
  submitText: {
    fontSize: 25,
    color: "white",
    padding: 16,
    textAlign: "center",
  },
});
