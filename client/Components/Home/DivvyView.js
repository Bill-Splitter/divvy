import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Banner2 from "./Banner2";
import BottomNav from "./BottomNav";

export default DivvyView = (props) => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 0, backgroundColor: "white", height: "100%" }}>
      <Banner2 />

      <View style={styles.borderBar}></View>

      <View style={styles.listContainer}>
        <TouchableHighlight
          style={styles.listElementContainer}
          onPress={() => navigation.navigate("DivvyView")}
          underlayColor={"white"}
        >
          <View>
            <View style={styles.listElement}>
              <Entypo name="scissors" size={35} color="#ED3B5B" />
              <Text style={styles.listText}>Itemized Split</Text>
            </View>
            <View style={styles.borderBar}></View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.listElementContainer}
          onPress={() => navigation.navigate("SimpleSplitCreation")}
          underlayColor={"white"}
        >
          <View>
            <View style={styles.listElement}>
              <MaterialIcons name="attach-money" size={35} color="#ED3B5B" />
              <Text style={styles.listText}>Simple Split</Text>
            </View>
            <View style={styles.borderBar}></View>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    height: "100%",
  },
  listElement: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  listElementContainer: {
    width: "100%",
  },
  listText: {
    fontSize: 35,
    color: "#ED3B5B",
    padding: 15,
    textAlign: "center",
  },
  borderBar: {
    width: "100%",
    borderBottomWidth: 1,
    backgroundColor: "#D7CBCB",
    borderColor: "#D7CBCB",
    marginTop: 10,
    height: 1,
  },
  listContainer: {
    width: "90%",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  bigText: {
    fontSize: 25,
    color: "#ED3B5B",
    padding: 10,
    paddingLeft: 100,
    fontWeight: "bold",
  },
  littleText: {
    fontSize: 25,
    color: "#ED3B5B",
    paddingLeft: 100,
    padding: 2,
  },
  submitButton: {
    width: "50%",
    backgroundColor: "#ED3B5B",
    borderRadius: 45,
    marginTop: 20,
  },
  submitText: {
    fontSize: 25,
    color: "white",
    padding: 16,
    textAlign: "center",
  },
});
