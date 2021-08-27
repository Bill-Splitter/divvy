import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useDispatch, useSelector } from "react-redux";
import ItemBox from "./ItemBox";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  FlatList,

} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Banner2 from "../Banner2";

const Friends = () => {
  const navigation = useNavigation();
  const friends = useSelector((state) => state.user.friend)


  const allFriends = friends || [];

  const deleteItem = (id) => {
    console.log(id, "User ID to be deleted")
  }

  return (
    <View style={{ flex: 0, backgroundColor: "white", height: "100%" }}>
      <View style={styles.container}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 40,
          }}
        >
          <TouchableHighlight
            underlayColor={"#ED3B5B"}
            style={styles.leftArrow}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="left" size={35} color="#fff" />
          </TouchableHighlight>

          <Text style={{ color: "white", fontSize: 24, textAlign: "center" }}>
            Friends
          </Text>

          <TouchableHighlight
            onPress={() => navigation.navigate("AddFriend")}
            style={{
              display: "flex",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 56,
                paddingRight: 10,
              }}
            >
              +
            </Text>
          </TouchableHighlight>
        </View>
      </View>
      <View style={styles.view}>
        <View style={{ width: "100%" }}>
          <TouchableHighlight
            style={styles.listElementContainer}
            underlayColor={"white"}
          >
            <FlatList
              data={allFriends}
              renderItem={(item) => {
                return <ItemBox data={item} handleDelete={() => deleteItem(item.item.id)}/>;
              }}
              ItemSeparatorComponent={() => {
                return <View style={styles.seperatorLine}></View>;
              }}
            />
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};



export default Friends;

const styles = StyleSheet.create({
  listElementContainer: {
    backgroundColor: "#fff",
    marginLeft: 0,
    display: "flex",
    height: "100%",
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
  deleteBox: {
    backgroundColor: "#ED3B5B",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: "100%",
  },
  view: {
    width: "100%",
    flex: 1,
    alignContent: "center",
    textAlign: "left",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },
  seperatorLine: {
    height: 1,
    backgroundColor: "pink",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 999,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#ED3B5B",
    marginRight: 10,
    marginLeft: 10,
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
    zIndex: 99,
    padding: 10,
  },
});
