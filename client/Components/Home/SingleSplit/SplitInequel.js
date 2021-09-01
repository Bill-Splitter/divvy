import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Alert,
  TouchableHighlight,
} from "react-native";

const SplitInequel = (props) => {
  const length = new Array(props.groupFriends.length + 1).fill(0);
  const billTotal = props.info.total;

  let [values, setValues] = React.useState(length);
  let [total, setTotal] = React.useState(props.info.total);
  let [selected, setSelected] = React.useState(false);
  let [selectedValue, setSelectedValue] = React.useState("");
  let [inValue, setInValue] = React.useState();
  let [selectable, setSelectable] = React.useState(true);

  let data = [];

  const prepUserData = () => {
    data = [{ name: "you", value: values[0] }];
    props.groupFriends.forEach((element, index) => {
      const name = element.fName + " " + element.lName;
      data.push({ name: name, value: values[index + 1] });
    });
  };

  const click = (data, index) => {
    setSelectedValue(data);
    setSelected(index);
  };

  const distro = () => {
    setSelectedValue("");
    setSelectable(false);
  };

  const update = (text, index) => {
    if (isNaN(text)) {
      Alert.alert("NOT A VALID INPUT");
    } else {
      if (Number(text) >= 0 && Number(text) <= props.info.total) {
        setInValue(text);
      } else {
        Alert.alert("Entry Out Of Bounds");
      }
    }
  };

  return (
    <ScrollView style={styles.info}>
      <View style={styles.borderBar}></View>
      <View style={styles.listRow}>
        <Text style={styles.title}>Select User</Text>
        <Text style={styles.listPercent}></Text>

        <Text style={styles.listText}></Text>
      </View>
      <View style={styles.listRow}>
        {selectedValue === "you" ? (
          <Text
            numberOfLines={1}
            style={styles.listNameSelected}
            onPress={() => click("you", 0)}
          >
            You
          </Text>
        ) : (
          <>
            {selectable ? (
              <Text
                numberOfLines={1}
                style={styles.listName}
                onPress={() => click("you", 0)}
              >
                You
              </Text>
            ) : (
              <Text numberOfLines={1} style={styles.listName}>
                You
              </Text>
            )}
          </>
        )}

        <Text style={styles.listPercent}></Text>
        {selectedValue === "you" ? (
          <TextInput
            style={styles.input}
            placeholder="0.00"
            keyboardType={"phone-pad"}
            textContentType={"telephoneNumber"}
            onChangeText={(text) => update(text, 0)}
          ></TextInput>
        ) : (
          <Text></Text>
        )}
      </View>

      {props.groupFriends.map((element, index) => {
        return (
          <View key={element.id} style={styles.listRow}>
            {element.id === selectedValue ? (
              <Text
                numberOfLines={1}
                style={styles.listNameSelected}
                onPress={() => click(element.id, index + 1)}
              >
                {element.fName} {element.lName}
              </Text>
            ) : (
              <>
                {selectable ? (
                  <Text
                    numberOfLines={1}
                    style={styles.listName}
                    onPress={() => click(element.id, index + 1)}
                  >
                    {element.fName} {element.lName}
                  </Text>
                ) : (
                  <Text numberOfLines={1} style={styles.listName}>
                    {element.fName} {element.lName}
                  </Text>
                )}
              </>
            )}

            <Text style={styles.listPercent}></Text>
            <View></View>
            {selectedValue === element.id ? (
              <TextInput
                style={styles.input}
                placeholder="0.00"
                maxLength={8}
                keyboardType={"phone-pad"}
                textContentType={"telephoneNumber"}
                onChangeText={(text) => update(text, index + 1)}
              ></TextInput>
            ) : (
              <Text></Text>
            )}
          </View>
        );
      })}
      {selectedValue ? (
        <View style={styles.holder}>
          <TouchableHighlight style={styles.submit} onPress={() => distro()}>
            <Text style={{ color: "white", fontWeight: "900" }}>Submit</Text>
          </TouchableHighlight>
        </View>
      ) : (
        <></>
      )}
    </ScrollView>
  );
};

export default SplitInequel;

const styles = StyleSheet.create({
  listRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    textAlign: "left",
    justifyContent: "space-between",
    padding: 0,
    alignItems: "center",
  },
  holder: {
    marginTop: 20,
    alignItems: "center",
  },

  submit: {
    backgroundColor: "#3bedac",
    borderRadius: 999,
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
  },
  title: {
    width: "100%",
    fontSize: 25,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  listText: {
    textAlign: "right",
    width: "33.33%",
    fontSize: 25,
    fontWeight: "bold",
    padding: 10,
  },
  listName: {
    textAlign: "left",
    width: "45%",
    fontSize: 20,
    paddingLeft: 15,
    fontWeight: "bold",
    padding: 10,
  },
  listNameSelected: {
    textAlign: "left",
    width: "45%",
    fontSize: 20,
    paddingLeft: 15,
    fontWeight: "bold",
    backgroundColor: "#3bedac",
    padding: 10,
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