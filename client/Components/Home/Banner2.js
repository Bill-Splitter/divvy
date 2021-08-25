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
          size={35}
          color="#fff"
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
    // alignContent: "center",
    // textAlign: "center",
    marginTop: 30,
    marginLeft: 10,
    padding: 12,
  },
});
