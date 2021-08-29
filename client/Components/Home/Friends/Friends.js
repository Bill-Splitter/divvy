import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { deleteFriendThunk } from "../../../store";
import ItemBox from "./ItemBox";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const Friends = () => {
  const navigation = useNavigation();
  const friends = useSelector((state) => state.user.friend);
  const myId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();

  const allFriends = friends || [];

  const deleteItem = (id) => {
    console.log(id);
    dispatch(deleteFriendThunk(myId, id));
  };

  return (
    <View style={{ flex: 0, backgroundColor: "white", height: "100%" }}>
      <View style={styles.container}>
        <View style={styles.holder}>
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
            <Text style={styles.plusText}>+</Text>
          </TouchableHighlight>
        </View>
      </View>
      {allFriends.length > 0 ? (
        <View style={styles.listElementContainer} underlayColor={"white"}>
          <View style={{ flex: 1, width: "100%",}}>
            <FlatList
              keyExtractor={(item, index) => item.id.toString()}
              data={allFriends}
              renderItem={(item) => {
                return (
                  <ItemBox
                    data={item}
                    handleDelete={() => deleteItem(item.item.id)}
                  />
                );
              }}
              ItemSeparatorComponent={() => {
                return <View style={styles.seperatorLine}></View>;
              }}
            />
          </View>
        </View>
      ) : (
        <View style={styles.no}>
          <Text style={styles.noFriends}>No Friends Yet</Text>

          <TouchableHighlight
            onPress={() => navigation.navigate("AddFriend")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Add A Friend</Text>
          </TouchableHighlight>
        </View>
      )}
    </View>
  );
};

export default Friends;

const styles = StyleSheet.create({
  listElementContainer: {
    backgroundColor: "#fff",
    marginLeft: 0,
    display: "flex",
    height: "87%",
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
  noFriends: {
    fontSize: 30,
    color: "#ED3B5B",
    marginBottom: 10,
    fontWeight: "700",
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
    // width: "100%",
    // alignContent: "center",
    // textAlign: "left",
    // justifyContent: "center",
    // alignItems: "center",
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
  no: {
    alignItems: "center",
    padding: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
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

  holder: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 40,
  },
  plusText: {
    color: "white",
    fontSize: 56,
    paddingRight: 10,
  },
  button: {
    marginTop: 15,
    backgroundColor: "#ED3B5B",
    padding: 15,
    paddingLeft: 35,
    paddingRight: 35,
    borderRadius: 9999999,
  },
});
