import React from "react";

import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Banner2(props) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableHighlight
        underlayColor={"transparent"}
        style={styles.leftArrow}
        onPress={() => {
          if(props.home) navigation.navigate("ProfilePage");
          else navigation.goBack();
        }}
      >
        <AntDesign name="left" size={35} color="#fff" />
      </TouchableHighlight>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: -40,
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
    minHeight: 90,
    backgroundColor: "#ED3B5B",
  },
  leftArrow: {
    marginTop: 39,
    marginLeft: -5,
    padding: 10,
    width: "25%",
    zIndex: 99,
  },
});
