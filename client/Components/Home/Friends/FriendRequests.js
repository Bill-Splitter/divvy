import React, { useState, useEffect } from "react";
import formatPhoneNumber from "../../Helpers/formatPhone";

import Banner2 from "../Banner2";
import { FontAwesome5 } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { denyFriendRequest } from "../../../store";
import { approveFriendRequest, getUpdatedUserInfo } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import colorObj from "../../../colors";


import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Image,
} from "react-native";

const FriendRequests = (props) => {
  let requests = useSelector((state) => state.user.requestee);
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();

  const approve = (id, user) => {
    dispatch(approveFriendRequest(id, user));
  };
  const deny = (id, user) => {
    dispatch(denyFriendRequest(id, user));
  };

  return (
    <View style={{ flex: 0, backgroundColor: "white", height: "100%" }}>
      <Banner2 name="Pending Friend Requests" />

      {requests.length === 0 ? (
        <View style={styles.no}>
      
          <Text style={styles.listText}>No Pending Requests</Text>
          <FontAwesome5 name="inbox" size={50} color={colorObj.main} />
        </View>
      ) : (
        <ScrollView>
          {requests.map((element, index) => (
            <View style={styles.listRow} key={index}>
              <View style={styles.top}>
                <Image
                  source={{
                    uri: element.imageUrl,
                  }}
                  style={styles.image}
                />
                <View>
                  <Text numberOfLines={1} style={styles.listText}>
                    {element.fName} {element.lName}{" "}
                  </Text>
                  <Text style={styles.listTextSmall}>
                    Email: {element.email}
                  </Text>
                  <Text numberOfLines={1} style={styles.listTextSmall}>
                    Username: {element.username}, {formatPhoneNumber(element.phoneNumber)}
                  </Text>
                </View>
              </View>

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
    width: "25%",
    backgroundColor: "#ED3B5B",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 15,
  },
  approve: {
    backgroundColor: "#3bedac",
    width: "25%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 15,
  },
  listText: {
    fontSize: 28,
    color: colorObj.main,
    padding: 2,
    fontWeight: "bold",
  },
  listTextSmall: {
    fontSize: 16,
    color: colorObj.main,
    marginLeft: 5,
  },
  top: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    width: "90%",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 999,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: colorObj.main,
    marginRight: 10,
  },

  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
    marginBottom: 10,
  },
  no: {
    alignItems: "center",
    padding: 15
  }
});
