import React, { useState } from "react";
import { signupThunk } from "../../store";
import { connect } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import Banner from "./Banner";

const Signup = (props) => {
  const navigation = useNavigation();
  const [username, setUsername] = React.useState();
  const [email, setEmail] = React.useState();
  const [phone, setPhone] = React.useState();
  const [password, setPassword] = React.useState();
  const [check, setCheck] = React.useState();
  const [fName, setFName] = React.useState();
  const [lName, setLName] = React.useState();

  const clickSubmit = async () => {
    if (
      !email ||
      !username ||
      !phone ||
      !password ||
      !check ||
      !lName ||
      !fName
    ) {
      Alert.alert("all fields must be filled");
    } else if (check !== password) {
      Alert.alert("passwords do not match");
    } else if (!email.includes("@")) {
      Alert.alert("not a valid email");
    } else if (password.length < 4) {
      Alert.alert("password must be at least four characters");
    } else {
      const f = fName[0].toUpperCase() + fName.slice(1).toLowerCase().trim();
      const l = lName[0].toUpperCase() + lName.slice(1).toLowerCase().trim();
      const data = {
        username: username.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password: password.trim(),
        phoneNumber: phone.trim(),
        fName: f,
        lName: l,
      };

      const status = await props.signUp(data);
      console.log("the statis is:", status);
      if (status) {
        console.log("the statis is");
        Alert.alert(status || "error");
      } else navigation.navigate("Login");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Banner></Banner>
      <View style={styles.form}>
        <Entypo name="scissors" size={50} color="#ED3B5B" />
        <Text style={styles.formTitle}>Create a new account</Text>
        <TextInput
          placeholder="Username"
          style={styles.input}
          maxLength={30}
          onChangeText={(text) => setUsername(text)}
          textContentType={"username"}
        ></TextInput>
        <TextInput
          placeholder="First Name"
          style={styles.input}
          maxLength={30}
          onChangeText={(text) => setFName(text)}
          textContentType={"username"}
        ></TextInput>
        <TextInput
          placeholder="Last Name"
          style={styles.input}
          maxLength={30}
          onChangeText={(text) => setLName(text)}
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
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state) => ({
  user: state,
});

const mapDispatchToProps = (dispatch) => ({
  signUp: (data) => dispatch(signupThunk(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

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
    marginTop: -100,
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
