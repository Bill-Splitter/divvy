import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setData } from "../../../store/split";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Foundation } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


import {
  StyleSheet,
  Text,
  View,
  Alert,
  SafeAreaView,
  TouchableHighlight,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Banner2 from "../Banner2";

const SoloSplitCreation = (props) => {
  const navigation = useNavigation();
  const [total, setTotal] = React.useState();
  const [tip, setTip] = React.useState(0);
  const [event, setEvent] = React.useState();

  const clickSubmit = () => {
    if (!tip) setTip(0);
    if (!total || !event) {
      alert("Must enter total");
    }
    else if(isNaN(total) || isNaN(tip)){
      Alert.alert("Error", "Total's and Tips must be numbers")

    }
     else {
      const totalDollars = Number(total) + Number(tip);
      props.submit(event, totalDollars);
      setTotal("")
      setEvent("")
      setTip(0)
      navigation.navigate("Summary");
    }
  };

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <Banner2 />
      <View style={styles.view}>
        <Text style={styles.loginText}>Create Divvy Event</Text>

        <View style={styles.inputRow}>
          <Text style={styles.iconHolder}>
            <MaterialIcons name="event" size={40} color="black" />
          </Text>
          <TextInput
            placeholder="Event Name Here"
            style={styles.input}
            //value={event}
            maxLength={28}
            onChangeText={(text) => setEvent(text)}
          ></TextInput>
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.iconHolder}><Foundation name="dollar" size={55} color="black" /></Text>
          <TextInput
            placeholder="Enter Total w/ Tax"
            style={styles.input2}
            //value={total}
            maxLength={6}
            onChangeText={(text) => setTotal(text)}
          ></TextInput>
        </View>

        <View style={styles.inputRow}>
        <Text style={styles.iconHolder}><FontAwesome name="gratipay" size={35} color="black" /></Text>
        <TextInput
          placeholder="Tip (optional)"
          style={styles.input2}
          value={tip}
          maxLength={6}
          onChangeText={(text) => setTip(text)}
        ></TextInput>
        </View>

        <TouchableHighlight
          style={styles.loginButton}
          onPress={() => clickSubmit()}
        >
          <Text style={styles.loginButtonText}>View Summary</Text>
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
)(SoloSplitCreation);

const styles = StyleSheet.create({
  iconHolder: {
    textAlign: "center",
    width: 39,
    margin: 0,
    padding: 0,

  },
  inputRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    height: 50,
    margin: 12,
    padding: 10,
    marginLeft: 10,
    borderBottomWidth: 3,
    borderColor: "#313359",
    fontWeight: "bold",
    width: "55%",
    paddingLeft: 20,
    fontSize: 20,
  },
  input2: {
    height: 50,
    margin: 12,
    padding: 10,
    marginLeft: 10,
    borderBottomWidth: 3,
    borderColor: "#313359",
    width: "55%",
    paddingLeft: 20,
    fontSize: 23,
    fontWeight: "bold"
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
    fontSize: 30,
    color: "#ED3B5B",
    textAlign: "left",
    marginBottom: 20,
    width: "80%",
    fontWeight: "bold"
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
