import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import GroupItemBox from "./GroupItemBox";
import { updateUserThunk } from "../../../store";
import colorObj from "../../../colors";

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

  let allGroups = groups || [];

  const deleteItem = (index) => {
    allGroups = allGroups.filter((element, groupIndex) => {
      if (groupIndex !== index) {
        return element;
      }
    });
    let update = { groups: allGroups };
    dispatch(updateUserThunk(myId, update));
  };

  return (
    <View style={{ flex: 0, backgroundColor: "white", height: "100%" }}>
      <View style={styles.container}>
        <View style={styles.holder}>
          <TouchableHighlight
            underlayColor={colorObj.main}
            style={styles.leftArrow}
          >
            <AntDesign name="left" size={35} color={colorObj.main} />
          </TouchableHighlight>

          <Text style={{ color: "white", fontSize: 24, textAlign: "center" }}>
            Your Groups
          </Text>

          <TouchableHighlight
            onPress={() => navigation.navigate("CreateGroupName")}
            style={{
              display: "flex",
            }}
            underlayColor={"transparent"}
          >
            <Text style={styles.plusText}>+</Text>
          </TouchableHighlight>
        </View>
      </View>
      {allGroups.length > 0 ? (
        <View style={styles.listElementContainer} underlayColor={"white"}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={allGroups}
            renderItem={(item) => {
              return (
                <TouchableHighlight
                  onPress={() =>
                    navigation.navigate("GroupMembers", {
                      itemIndex: item.index,
                      groupName: item.item.groupname,
                    })
                  }
                  underlayColor={"transparent"}
                >
                  <GroupItemBox
                    data={item}
                    handleDelete={() => deleteItem(item.index)}
                  />
                </TouchableHighlight>
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
    color: colorObj.main,
    marginBottom: 10,
    fontWeight: "700",
  },

  listText: {
    fontSize: 32,
    color: colorObj.main,
    padding: 15,
    textAlign: "left",
  },
  groupText: {
    fontSize: 40,
    color: colorObj.main,
    textAlign: "left",
    marginBottom: 20,
    width: "80%",
  },
  loginButton: {
    width: "70%",
    backgroundColor: colorObj.main,
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
    backgroundColor: colorObj.bar,
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
    color: colorObj.main,
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
    backgroundColor: colorObj.main,
  },
  plusText: {
    color: "white",
    fontSize: 56,
    paddingRight: 10,
  },
});
