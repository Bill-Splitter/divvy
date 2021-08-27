import React, { useState, useEffect } from "react";

import Banner2 from "./Banner2";
import { FontAwesome5 } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { denyFriendRequest } from "../../store";
import { approveFriendRequest, getUpdatedUserInfo } from "../../store";
import { useDispatch, useSelector } from "react-redux";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
} from "react-native";

const FriendRequests = (props) => {
  let requests = useSelector((state) => state.user.requestee);
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();

  const approve = (id, user) => {
    dispatch(approveFriendRequest(id, user));
    console.log(id, user);
    // setRequests(props.requestArray || [])
    // update()
  };
  const deny = (id, user) => {
    console.log(id, user);
    dispatch(denyFriendRequest(id, user));
  };

  return (
    <View style={{ flex: 0, backgroundColor: "white", height: "100%" }}>
      <Banner2 name="Pending Friend Requests" />

      {requests.length === 0 ? (
        <View style={styles.listRow}>
          <Text style={styles.listText}>No Requests</Text>
        </View>
      ) : (
        <ScrollView>
          {requests.map((element, index) => (
            <View style={styles.listRow} key={index}>
              <Text style={styles.listText}>{element.username}</Text>
              <Text style={styles.listTextSmall}>
                {element.email}, {element.phoneNumber}
              </Text>
              <View style={styles.buttonGroup}>
                <TouchableHighlight
                  style={styles.delete}
                  onPress={() => deny(element.id, userId)}
                >
                  <Foundation name="x" size={24} color="white" />
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.approve}
                  onPress={() => approve(element.id, userId)}
                >
                  <Text>
                    <FontAwesome5 name="check" size={24} color="white" />
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default FriendRequests;



const styles = StyleSheet.create({
  listRow: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#D7CBCB",
  },
  delete: {
    width: "20%",
    backgroundColor: "#ED3B5B",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 15,
  },
  approve: {
    backgroundColor: "#3bedac",
    width: "20%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 15,
  },
  listText: {
    fontSize: 28,
    color: "#ED3B5B",
    padding: 5,
    fontWeight: "bold",
  },
  listTextSmall: {
    fontSize: 16,
    color: "#ED3B5B",
  },

  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
    marginBottom: 10,
  },
});
