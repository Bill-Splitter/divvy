import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Banner2 from "../Banner2";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
} from "react-native";

const ChangePhoneNumber = () => {
  const [phoneNumber, setPhoneNumber] = React.useState();
  const navigation = useNavigation();

  const updatePhone = () => {
    if (!phoneNumber) {
      alert("Phone Numbers Cannot Be Blank");
    } else {
      const update = {
        phoneNumber: phoneNumber.trim(),
      };
      //thunk to update password needed
      alert("Phone Number was updated");
      navigation.goBack();
    }
  };

  return (
    <View style={{ flex: 0, backgroundColor: "white", height: "100%" }}>
      <Banner2 name={"Change Phone Number"} />
      <View style={styles.container}>
        <Text style={styles.header}>Enter A New Phone Number</Text>
        <TextInput
          placeholder="Phone Number"
          style={styles.input}
          value={phoneNumber}
          maxLength={20}
          onChangeText={(text) => setPhoneNumber(text)}
        ></TextInput>

        <TouchableHighlight style={styles.button} onPress={() => updatePhone()}>
          <Text style={styles.bText}>Update</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default ChangePhoneNumber;

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
    marginTop: 10,
  },
  button: {
    marginTop: 15,
    backgroundColor: "#ED3B5B",
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