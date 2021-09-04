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
import colorObj from "../../colors";

export default DivvyView = (props) => {
  const navigation = useNavigation();
  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <Banner2 name={"Select a split"} />
      <View style={styles.listContainer}>
        <TouchableHighlight
          style={styles.listElementContainer}
          onPress={() => navigation.navigate("Camera")}
          underlayColor={"white"}
        >
          <View>
            <View style={styles.listElement}>
              <Entypo name="scissors" size={35} color={colorObj.main}/>
              <Text style={styles.listText}>Itemized Split</Text>
            </View>
          </View>
        </TouchableHighlight>
        <View style={styles.borderBar}></View>

        <TouchableHighlight
          style={styles.listElementContainer}
          onPress={() => navigation.navigate("SimpleSplitCreation")}
          underlayColor={"white"}
        >
          <View>
            <View style={styles.listElement}>
              <MaterialIcons name="attach-money" size={35} color={colorObj.main}/>
              <Text style={styles.listText}>Simple Split</Text>
            </View>
          </View>
        </TouchableHighlight>
        <View style={styles.borderBar}></View>

        <TouchableHighlight
          style={styles.listElementContainer}
          onPress={() => navigation.navigate("SoloSplitCreation")}
          underlayColor={"white"}
        >
          <View>
            <View style={styles.listElement}>
              <MaterialIcons name="person" size={35} color={colorObj.main}/>
              <Text style={styles.listText}>Solo Split</Text>
            </View>
          </View>
        </TouchableHighlight>
        <View style={styles.borderBar}></View>
      </View>
      </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorObj.background,
    justifyContent: "space-between",
    height: "100%",
  },
  listElement: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  listElementContainer: {
    width: "90%",
  },
  listText: {
    fontSize: 30,
    color: colorObj.main,
    padding: 20,
    textAlign: "center",
  },
  borderBar: {
    width: "90%",
    borderBottomWidth: 1,
    backgroundColor: colorObj.bar,
    borderColor: colorObj.bar,

    height: 1,
  },
  listContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  bigText: {
    fontSize: 25,
    color: colorObj.main,
    padding: 10,
    paddingLeft: 100,
    fontWeight: "bold",
  },
  littleText: {
    fontSize: 25,
    color: colorObj.main,
    paddingLeft: 100,
    padding: 2,
  },


});
