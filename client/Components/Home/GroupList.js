import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Banner2 from "./Banner2";

const allGroups = [
  {
    id: 1,
    name: "Mushrooms",
  },
  {
    id: 2,
    name: "Broccoli",
  },
  {
    id: 3,
    name: "Lettuce",
  },
  {
    id: 4,
    name: "Carrots",
  },
  {
    id: 5,
    name: "Onions",
  },
  {
    id: 6,
    name: "Lettuce",
  },
];

export default GroupList = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 0, backgroundColor: "white", height: "100%" }}>
      <Banner2 />
      <View style={styles.view}>
        <Text style={styles.groupText}>Your Groups</Text>
        <View>
          <TouchableHighlight
            style={styles.listElementContainer}
            onPress={() => navigation.navigate("DivvyView")}
            underlayColor={"white"}
          >
            <View style={styles.listElement}>
              {allGroups.map((element) => {
                return (
                  <Text style={styles.listText} key={element.id}>
                    {element.name}
                  </Text>
                );
              })}
            </View>
          </TouchableHighlight>
        </View>
        <TouchableHighlight
          style={styles.loginButton}
          onPress={() => navigation.navigate("FriendsList")}
        >
          <Text style={styles.loginButtonText}>Create New Group</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  listElementContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
  },

  listText: {
    fontSize: 32,
    color: "#ED3B5B",
    padding: 15,
    textAlign: "left",
  },
  groupText: {
    fontSize: 40,
    color: "#ED3B5B",
    textAlign: "left",
    marginBottom: 20,
    width: "80%",
  },
  loginButton: {
    width: "70%",
    backgroundColor: "#ED3B5B",
    borderRadius: 45,
    marginTop: 20,
    alignContent: "center",
  },
  view: {
    width: "100%",
    flex: 1,
    alignContent: "center",
    textAlign: "left",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    // marginTop: 200
  },

  loginButtonText: {
    fontSize: 25,
    color: "white",
    padding: 16,
    textAlign: "center",
  },
});
