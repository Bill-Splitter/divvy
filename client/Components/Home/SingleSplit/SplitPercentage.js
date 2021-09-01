import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";

const SplitPercentage = (props) => {
  const length = new Array(props.groupFriends.length + 1).fill(0);
  const billTotal = props.info.total;

  let [values, setValues] = React.useState(length);
  const [perc, setPerc] = React.useState(100);

  let data = [];

  const prepUserData = () => {
    data = [{ name: "you", value: values[0] }];
    props.groupFriends.forEach((element, index) => {
      const name = element.fName + " " + element.lName;
      data.push({ name: name, value: values[index + 1] });
    });
  };

  const update = (text, index) => {
    console.log(text, index);
    if (isNaN(text)) {
      Alert.alert("NOT A VALID INPUT");
    } else {
      let temp = values;
      const oldNumber = values[index];
      temp[index] = Number(text);
      setValues(temp);

      let assigned = values.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      );

      if (assigned <= 100) {
        setPerc(100 - assigned);
        if (assigned === 100) {
          props.toggle(true);
          prepUserData();
          props.setUserData(data);
        } else props.toggle(false);
      } else {
        temp[index] = oldNumber;
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
        <Text style={styles.listPercent}>
          {perc.toFixed(2)}
          {" %"}
        </Text>

        <Text style={styles.listText}></Text>
      </View>
      <View style={styles.listRow}>
        <Text style={styles.listName}>You</Text>
        <TextInput
          style={styles.input}
          placeholder="0%"
          keyboardType={"phone-pad"}
          textContentType={"telephoneNumber"}
          onChangeText={(text) => update(text, 0)}
        ></TextInput>
        <Text>%</Text>

        {values[0] === 0 ? (
          <Text style={styles.listText}>$0.00</Text>
        ) : (
          <Text style={styles.listText}>
            ${(props.info.total / values[0]).toFixed(2)}
          </Text>
        )}
      </View>

      {props.groupFriends.map((element, index) => {
        return (
          <View key={element.id} style={styles.listRow}>
            <Text numberOfLines={1} style={styles.listName}>
              {element.fName} {element.lName}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="0%"
              keyboardType={"phone-pad"}
              textContentType={"telephoneNumber"}
              onChangeText={(text) => update(text, index + 1)}
            ></TextInput>
            <Text>%</Text>

            {values[index + 1] === 0 ? (
              <Text style={styles.listText}>$0.00</Text>
            ) : (
              <Text style={styles.listText}>
                ${(props.info.total / values[index + 1]).toFixed(2)}
              </Text>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default SplitPercentage;

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
    width: "30%",
    fontSize: 20,
    fontWeight: "bold",
  },
  listName: {
    textAlign: "left",
    width: "40%",
    fontSize: 20,
    paddingLeft: 15,
    fontWeight: "bold",
  },
  listPercent: {
    width: "25%",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },

  input: {
    width: "15%",
    fontSize: 20,
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
