import React from "react";

import { StyleSheet, View, TouchableHighlight, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default BottomNav = () => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.borderBar}></View>
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.listElementContainer}
          onPress={() => navigation.navigate("ProfilePage")}
          underlayColor={"white"}
        >
          <View>
            <View style={styles.listElement}>
              <Entypo name="scissors" size={35} color="#ED3B5B" />
              <Text style={styles.listText}>Home</Text>
            </View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.listElementContainer}
          onPress={() => navigation.navigate("SimpleSplitCreation")}
          underlayColor={"white"}
        >
          <View>
            <View style={styles.listElement}>
              <Entypo name="scissors" size={35} color="#ED3B5B" />
              <Text style={styles.listText}>New Divvy</Text>
            </View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.listElementContainer}
          onPress={() => navigation.navigate("Friends")}
          underlayColor={"white"}
        >
          <View>
            <View style={styles.listElement}>
              <Ionicons name="person-outline" size={34} color="#ED3B5B" />
              <Text style={styles.listText}>Friends</Text>
            </View>
          </View>
        </TouchableHighlight>

        <View style={styles.spacer}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  spacer: {
    flex: 0,
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    position: "relative",
    marginBottom: -30,
    width: "100%",
    height: "10%",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  borderBar: {
    width: "100%",
    borderBottomWidth: 1,
    backgroundColor: "#D7CBCB",
    borderColor: "#D7CBCB",
    marginTop: 30,
    height: 1,
  },
  listElement: {
    alignItems: "center",
  },
});
