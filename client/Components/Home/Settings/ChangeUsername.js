import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Banner2 from "../Banner2";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from "react-native";

const ChangeUsername = () => {
  const [username, setUsername] = React.useState();
  const userId = useSelector((state) => state.user.id);
  const navigation = useNavigation();

  const updateUsername = () => {
    if (!username) {
      alert("Username Cannot Be Blank");
    } else {
      const update = {
        username: username.trim(),
      };
      //thunk to update password needed
      alert("Username was updated");
      navigation.goBack();
    }
  };

  return (
    <View style={{ flex: 0, backgroundColor: "white", height: "100%" }}>
      <Banner2 name={"Change Username"} />
      <View style={styles.container}>
        <Text style={styles.header}>Enter A New Username</Text>
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={username}
          maxLength={20}
          onChangeText={(text) => setUsername(text)}
        ></TextInput>

        <TouchableHighlight style={styles.button} onPress={() => updateUsername()}>
          <Text style={styles.bText}>Update</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default ChangeUsername;

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
