import React from "react";

import { StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Banner2() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.leftArrow}>
        <AntDesign
          name="left"
          size={24}
          color="#ED3B5B"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.spacer}>
        <View style={styles.bottomBar}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    width: "90%",
    borderBottomWidth: 1,
    backgroundColor: "#D7CBCB",
    borderColor: "#D7CBCB",
    marginTop: 10,
    height: 1,
  },
  spacer: {
    flex: 0,
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "100%",
    height: "20%",
  },
  leftArrow: {
    marginLeft: 10,
    padding: 5,
  },
});
