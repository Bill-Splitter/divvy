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

const allFriends = [
  {
    id: 1,
    username: "Scott",
  },
  {
    id: 2,
    username: "Jake Paul",
  },
  {
    id: 3,
    username: "John Thomas",
  },
  {
    id: 4,
    username: "Von Haas",
  },
  {
    id: 5,
    username: "Ash ",
  },
];

export default FriendsList = () => {
  const navigation = useNavigation();
  const [friend, setFriend] = React.useState();

  return (
    <View style={{ flex: 0, backgroundColor: "white", height: "100%" }}>
      <Banner2 />
      <View style={styles.view}>
        <Text style={styles.groupText}>Select Friends</Text>
        <TextInput
          placeholder="Search Friends"
          style={styles.input}
          value={friend}
          maxLength={30}
          onChangeText={(text) => setEvent(text)}
        ></TextInput>
        <View>
          <TouchableHighlight
            style={styles.listElementContainer}
            onPress={() => navigation.navigate("DivvyView")}
            underlayColor={"white"}
          >
            <View style={styles.listElement}>
              {allFriends.map((element) => {
                return (
                  <Text key={element.id} style={styles.listText}>
                    {" "}
                    {element.username}
                  </Text>
                );
              })}
            </View>
          </TouchableHighlight>
        </View>
        <TouchableHighlight
          style={styles.loginButton}
          onPress={() => navigation.navigate("GroupList")}
        >
          <Text style={styles.loginButtonText}>Next</Text>
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
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderColor: "#313359",
    padding: 10,
    width: "90%",
    borderRadius: 999,
    paddingLeft: 20,
  },

  loginButtonText: {
    fontSize: 25,
    color: "white",
    padding: 16,
    textAlign: "center",
  },
});
