import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableHighlight,
} from "react-native";

const Item = (props) => {

  if (props.selected === props.data.item.name) {
    return (
      <TouchableHighlight
        underlayColor={"transparent"}
        style={styles.optionButton2}
        onPress={() => console.log("pressed")}
      >
        <Text style={{ color: "white" }}>{props.data.item.title}</Text>
      </TouchableHighlight>
    );
  } else {
    return (
      <TouchableHighlight
        underlayColor={"transparent"}
        style={styles.optionButton}
        onPress={() => props.setSelected(props.data.item.name)}
      >
        <Text style={{ color: "white" }}>{props.data.item.title}</Text>
      </TouchableHighlight>
    );
  }
};

const styles = StyleSheet.create({
  optionButton: {
    backgroundColor: "#ED3B5B",
    height: 30,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
    margin: 8,
    marginBottom: 10,
    marginTop: 2,
    borderRadius: 9999,
  },
  optionButton2: {
    backgroundColor: "#3bedac",
    height: 30,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
    margin: 8,
    marginBottom: 10,
    marginTop: 2,
    borderRadius: 9999,
  },
});

export default Item;
