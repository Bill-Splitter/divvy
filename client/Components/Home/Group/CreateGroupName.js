import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Banner2 from "../Banner2";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const CreateGroupName = () => {
  const navigation = useNavigation();
  const [groupName, setGroupName] = React.useState();

  const clickSubmit = () => {
    if (!groupName) {
      alert("all fields must be filled");
    } else {
      navigation.navigate("CreateGroup", { data: groupName });
    }
  };

  return (
    <View style={{ flex: 0, backgroundColor: "white", height: "100%" }}>
      <Banner2 name={"Name your Group"} />
      <View style={styles.view}>
        <TextInput
          placeholder="New Group Name"
          style={styles.input}
          value={groupName}
          maxLength={30}
          onChangeText={(text) => setGroupName(text)}
        ></TextInput>

        <TouchableHighlight
          style={styles.loginButton}
          onPress={() => clickSubmit()}
        >
          <Text style={styles.loginButtonText}>Next</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default CreateGroupName;

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
    marginTop: 40,
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
