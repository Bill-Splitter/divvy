import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { updateUser } from "../../../store";

const SplitCustom = (props) => {
  const length = new Array(props.groupFriends.length + 1).fill(0);
  const billTotal = props.info.total;

  let [values, setValues] = React.useState(length);
  let [total, setTotal] = React.useState(props.info.total);
  const user = useSelector((state) => state.user);

  let data = [];

  const prepUserData = () => {
    data = [
      { name: user.fName + " " + user.lName, id: user.id, value: values[0] },
    ];
    props.groupFriends.forEach((element, index) => {
      const name = element.fName + " " + element.lName;
      data.push({ name: name, id: element.id, value: values[index + 1] });
    });
  };

  const update = (text, index) => {
    if (isNaN(text)) {
      Alert.alert("NOT A VALID INPUT");
    } else {
      let temp = values;
      const oldValue = temp[index];
      temp[index] = Number(text);
      setValues(temp);

      let assigined = values.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      );

      if (billTotal - assigined >= 0) {
        setTotal(billTotal - assigined);

        if (billTotal === assigined) {
          props.toggle(true);
          prepUserData();
          props.setUserData(data);
        } else props.toggle(false);
      } else {
        temp[index] = oldValue;
        setValues(temp);

        alert("That puts you over bill amount");
      }
    }
  };
  return (
    <ScrollView style={styles.info}>
      <View style={styles.borderBar}></View>
      <View style={styles.listRow}>
        <Text style={styles.listName}>Unassigned</Text>
        <Text style={styles.listPercent}></Text>

        <Text style={styles.listText}>
          {"$ "}
          {total.toFixed(2)}
        </Text>
      </View>
      <View style={styles.listRow}>
        <Text style={styles.listName}>You</Text>
        <Text style={styles.listPercent}>
          {/* {Math.floor(100 / (props.groupFriends.length + 1))}% */}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          keyboardType={"phone-pad"}
          textContentType={"telephoneNumber"}
          onChangeText={(text) => update(text, 0)}
        ></TextInput>
      </View>

      {props.groupFriends.map((element, index) => {
        return (
          <View key={element.id} style={styles.listRow}>
            <Text numberOfLines={1} style={styles.listName}>
              {element.fName} {element.lName}
            </Text>
            <Text style={styles.listPercent}></Text>
            <View></View>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              maxLength={8}
              keyboardType={"phone-pad"}
              textContentType={"telephoneNumber"}
              onChangeText={(text) => update(text, index + 1)}
            ></TextInput>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default SplitCustom;

const styles = StyleSheet.create({
  listRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    textAlign: "left",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
  },
  listText: {
    textAlign: "right",
    width: "33.33%",
    fontSize: 25,
    fontWeight: "bold",
  },
  listName: {
    textAlign: "left",
    width: "45%",
    fontSize: 20,
    paddingLeft: 15,
    fontWeight: "bold",
  },
  listPercent: {
    width: "20%",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },

  input: {
    width: "30%",
    fontSize: 25,
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderColor: "#706567",
    textAlign: "right",
  },

  borderBar: {
    width: "100%",
    borderBottomWidth: 1,
    backgroundColor: "#D7CBCB",
    borderColor: "#D7CBCB",
    marginTop: 10,
    height: 1,
  },
});
