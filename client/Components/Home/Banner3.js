import React from "react";

import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Banner3(props) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableHighlight
        underlayColor={"transparent"}
        style={styles.leftArrow}
      >
        <Text></Text>
      </TouchableHighlight>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: -30,
          justifyContent: "center",
        }}
      >
        <Text numberOfLines={1} style={{ color: "white", fontSize: 24 }}>
          {props.name}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  spacer: {
    flex: 0,
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "100%",
    height: "13%",
    backgroundColor: "#ED3B5B",
  },
  leftArrow: {
    marginTop: 45,
    marginLeft: -5,
    padding: 10,
    width: "25%",
    zIndex: 99,
  },
});
