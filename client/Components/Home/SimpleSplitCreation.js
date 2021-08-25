import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setData } from "../../store/split";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Banner2 from "./Banner2";

const SimpleSplitCreation = (props) => {
  const navigation = useNavigation();
  const [total, setTotal] = React.useState();
  const [tip, setTip] = React.useState();
  const [event, setEvent] = React.useState();

  const clickSubmit = () => {
    console.log(total, tip, event);
    if (!tip) setTip(0);
    if (!total || !event) {
      alert("Must enter total");
    } else {
      const totalDollars = Number(total) + Number(tip);
      props.submit(event, totalDollars);
      navigation.navigate("GroupList");
    }
  };

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <Banner2 />
      <View style={styles.view}>
        <Text style={styles.loginText}>Create Divvy Event</Text>
        <TextInput
          placeholder="Event Name Here"
          style={styles.input}
          value={event}
          maxLength={30}
          onChangeText={(text) => setEvent(text)}
        ></TextInput>

        <TextInput
          placeholder="Enter Total w/ Tax"
          style={styles.input}
          value={total}
          maxLength={6}
          onChangeText={(text) => setTotal(text)}
        ></TextInput>

        <TextInput
          placeholder="Tip (optional)"
          style={styles.input}
          value={tip}
          maxLength={6}
          onChangeText={(text) => setTip(text)}
        ></TextInput>

        <TouchableHighlight
          style={styles.loginButton}
          onPress={() => clickSubmit()}
        >
          <Text style={styles.loginButtonText}>Select Group</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  name: state.split.name,
  total: state.split.total,
});

const mapDispatchToProps = (dispatch) => ({
  submit: (name, total) => dispatch(setData(name, total)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SimpleSplitCreation);

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
    flex: 1,
    alignContent: "center",
    textAlign: "left",

    alignItems: "center",
    marginTop: 25,
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
