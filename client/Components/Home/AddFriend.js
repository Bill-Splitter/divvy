import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  TextInput,
  ScrollView,
  Image,
} from "react-native";

import Banner2 from "./Banner2";
import { sendFriendRequest } from "../../store/user";

const AddFriend = (props) => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = React.useState();

  const clickSubmit = () => {
    props.sendRequest(props.user.id, phoneNumber);
    navigation.navigate("Friends");
  };

  return (
    <View style={{ flex: 0, backgroundColor: "white", height: "100%" }}>
      <Banner2 name="Add By Phone Number"></Banner2>
      <View style={styles.container}>
        <TextInput
          placeholder="Phone Number"
          style={styles.input}
          onChangeText={(text) => setPhoneNumber(text)}
          keyboardType={"phone-pad"}
          textContentType={"telephoneNumber"}
        ></TextInput>

        <TouchableHighlight
          style={styles.submitButton}
          onPress={() => clickSubmit()}
        >
          <Text style={styles.submitText}>Send Request</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  sendRequest: (userId, phoneNumber) =>
    dispatch(sendFriendRequest(userId, phoneNumber)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddFriend);

const styles = {
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
  submitButton: {
    width: "50%",
    backgroundColor: "#ED3B5B",
    borderRadius: 45,
    marginTop: 20,
  },
  submitText: {
    fontSize: 22,
    color: "white",
    padding: 16,
    textAlign: "center",
  },
  container: {
    padding: 30,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};
