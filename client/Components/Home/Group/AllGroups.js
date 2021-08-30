import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setGroup } from "../../../store/split";
import GroupItemBox from "./GroupItemBox";
import { deleteGroupThunk } from "../../../store";

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Banner3 from "../Banner3";

const AllGroups = () => {
  const navigation = useNavigation();
  const groups = useSelector((state) => state.user.groups);
  const myId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();

  const allGroups = groups || [];

  // const selectGroup = (groupname, users) => {
  //   props.setGroup(groupname, users);
  // };

  const deleteItem = (index) => {
    dispatch(deleteGroupThunk(myId, index));
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
            Your Groups
          </Text>

          <TouchableHighlight
            onPress={() => navigation.navigate("CreateGroupName")}
            style={{
              display: "flex",
            }}
          >
            <Text style={styles.plusText}>+</Text>
          </TouchableHighlight>
        </View>
      </View>
      {allGroups.length > 0 ? (
        <View style={styles.listElementContainer} underlayColor={"white"}>
          <FlatList
            keyExtractor={(item, index) => item[index]}
            data={allGroups}
            renderItem={(item) => {
              return (
                <GroupItemBox
                  data={item}
                  handleDelete={() => deleteItem(item.index)}
                />
              );
            }}
            ItemSeparatorComponent={() => {
              return <View style={styles.seperatorLine}></View>;
            }}
          />
        </View>
      ) : (
        <View style={styles.no}>
          <Text style={styles.noGroups}>No Groups Made</Text>
          <TouchableHighlight
            style={styles.loginButton}
            onPress={() => navigation.navigate("CreateGroupName")}
          >
            <Text style={styles.loginButtonText}>Create A Group</Text>
          </TouchableHighlight>
        </View>
      )}
    </View>
  );
};

export default AllGroups;

const styles = StyleSheet.create({
  listElementContainer: {
    backgroundColor: "#fff",
    marginLeft: 0,
    display: "flex",
    height: "100%",
  },
  no: {
    alignItems: "center",
    padding: 15,
  },
  noGroups: {
    fontSize: 30,
    color: "#ED3B5B",
    marginBottom: 10,
    fontWeight: "700",
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
    backgroundColor: "blue",
    alignContent: "center",
    textAlign: "left",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 0,
  },
  loginButtonText: {
    fontSize: 25,
    color: "white",
    padding: 16,
    textAlign: "center",
  },
  seperatorLine: {
    height: 1,
    backgroundColor: "pink",
  },
  borderBar: {
    width: "100%",
    borderBottomWidth: 1,
    backgroundColor: "#D7CBCB",
    borderColor: "#D7CBCB",
    marginTop: 10,
    height: 1,
  },
  headerText: {
    fontSize: 40,
    color: "#ED3B5B",
    textAlign: "left",
    fontWeight: "bold",
    paddingLeft: 20,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: "white",
    width: "100%",
  },
  header: {
    width: "100%",
  },
  holder: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 40,
  },
  container: {
    width: "100%",
    height: "13%",
    backgroundColor: "#ED3B5B",
  },
  plusText: {
    color: "white",
    fontSize: 56,
    paddingRight: 10,
  },
});
