import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Banner2 from "../Banner2";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
} from "react-native";

const ChangePassword = () => {
  const [check, setCheck] = React.useState();
  const [password, setPassword] = React.useState();
  const navigation = useNavigation();

  const updatePassword = () => {
    if (!password || !check) {
      alert("passwords cannot be blank");
    } else if (password !== check) {
      alert("passwords must match");
    } else if (password.length < 4) {
        alert("Password is too short")
    } else {
        const update = {
            password: password.trim()
        }
        //thunk to update password needed
        alert("Password was updated")
       navigation.goBack()
    }
  };

  return (
    <View style={{ flex: 0, backgroundColor: "white", height: "100%" }}>
      <Banner2 name={"Change Password"} />
      <View style={styles.container}>
        <Text style={styles.header}>Enter A New Password</Text>
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          style={styles.input}
          value={password}
          maxLength={20}
          onChangeText={(text) => setPassword(text)}
        ></TextInput>
        <TextInput
          placeholder="confirm"
          secureTextEntry={true}
          style={styles.input}
          value={check}
          maxLength={20}
          onChangeText={(text) => setCheck(text)}
        ></TextInput>
        <TouchableHighlight style={styles.button} onPress={() => updatePassword()}>
          <Text style={styles.bText}>Update</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  input: {
    height: 45,
    margin: 10,
    borderBottomWidth: 2,
    borderColor: "#313359",
    padding: 5,
    width: "55%",
    paddingLeft: 20,
  },
  container: {
    alignItems: "center",
  },
  header: {
    color: "#ED3B5B",
    fontSize: 26,
    fontWeight: "bold",
    padding: 10,
    marginTop: 10
  },
  button: {
    marginTop: 15,
    backgroundColor: "#31cc94",
    padding: 15,
    paddingLeft: 35,
    paddingRight: 35,
    borderRadius: 9999999,
  },
  bText: {
    color: "white",
    fontWeight: "bold",
  },
});
