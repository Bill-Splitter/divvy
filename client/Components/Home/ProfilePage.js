import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { getUpdatedUserInfo } from "../../store";

const ProfilePage = (props) => {
  const navigation = useNavigation();
  let user = useSelector((state) => state.user);
  const [notis, setNotis] = React.useState(user.requestee);
  const dispatch = useDispatch();

  const logout = () => {
    navigation.navigate("Homescreen");
  };

  React.useEffect(() => {
    if (user.requestee) setNotis(user.requestee.length);
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(getUpdatedUserInfo());
      if (user.requestee) setNotis(user.requestee.length);
    });
  });

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "#ED3B5B", height: "13%" }}>
        <View
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={{
              uri: user.imageUrl,
            }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 999,
              overflow: "hidden",
              marginTop: 40,
              marginLeft: 10,
              borderWidth: 2,
              borderColor: "white",
              marginRight: 10,
            }}
          />
          <View>
            <Text numberOfLines={1} style={styles.bigText}>
              {user.fName} {user.lName}
            </Text>
            <Text numberOfLines={1} style={styles.littleText}>
              {user.email}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.listContainer}>
        <TouchableHighlight
          style={styles.listElementContainer}
          onPress={() => navigation.navigate("DivvyView")}
          underlayColor={"white"}
        >
          <View>
            <View style={styles.listElement}>
              <View style={styles.icon}>
                <Entypo name="scissors" size={39} color="#ED3B5B" />
              </View>
              <Text style={styles.listText}>New Divvy</Text>
            </View>
            <View style={styles.borderBar}></View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.listElementContainer}
          onPress={() => navigation.navigate("Transactions")}
          underlayColor={"white"}
        >
          <View>
            <View style={styles.listElement}>
              <View style={styles.icon}>
                <FontAwesome5 name="money-check" size={30} color="#ED3B5B" />
              </View>
              <Text style={styles.listText}>Transactions</Text>
            </View>
            <View style={styles.borderBar}></View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.listElementContainer}
          onPress={() => navigation.navigate("Friends")}
          underlayColor={"white"}
        >
          <View>
            <View style={styles.listElement}>
              <View style={styles.icon}>
                <FontAwesome5 name="user-friends" size={30} color="#ED3B5B" />
              </View>
              <Text style={styles.listText}>Friends</Text>
            </View>
            <View style={styles.borderBar}></View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.listElementContainer}
          onPress={() => navigation.navigate("Messages")}
          underlayColor={"white"}
        >
          <View>
            <View style={styles.listElement}>
              <View style={styles.icon}>
                <Feather name="message-square" size={30} color="#ED3B5B" />
              </View>
              <Text style={styles.listText}>Messages</Text>
            </View>
            <View style={styles.borderBar}></View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.listElementContainer}
          onPress={() => navigation.navigate("FriendRequests")}
          underlayColor={"white"}
        >
          <View>
            <View style={styles.listElement}>
              <View style={styles.icon}>
                <FontAwesome name="user-plus" size={30} color="#ED3B5B" />
              </View>
              <Text style={styles.listText}>
                Friend Requests
                {notis > 0 ? (
                  <Text style={styles.listText}> ( {notis} )</Text>
                ) : (
                  <></>
                )}
              </Text>
            </View>
            <View style={styles.borderBar}></View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.listElementContainer}
          onPress={() => navigation.navigate("Settings")}
          underlayColor={"white"}
        >
          <View>
            <View style={styles.listElement}>
              <View style={styles.icon}>
                <FontAwesome name="gear" size={35} color="#ED3B5B" />
              </View>
              <Text style={styles.listText}>Settings</Text>
            </View>
            <View style={styles.borderBar}></View>
          </View>
        </TouchableHighlight>
      </View>
      <View
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          paddingBottom: 20,
        }}
      >
        <TouchableHighlight
          style={styles.submitButton}
          onPress={() => logout()}
        >
          <Text style={styles.submitText}>Logout</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    fontSize: 28,
    color: "#ED3B5B",
    padding: 15,
    textAlign: "center",
  },
  borderBar: {
    width: "100%",
    borderBottomWidth: 1,
    backgroundColor: "#D7CBCB",
    borderColor: "#D7CBCB",
    marginTop: 10,
    height: 1,
  },
  listContainer: {
    width: "90%",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  bigText: {
    fontSize: 25,
    color: "white",
    padding: 2,
    marginLeft: 5,

    fontWeight: "bold",
    marginTop: 35,
  },
  littleText: {
    fontSize: 15,
    color: "white",
    marginLeft: 10,
    padding: 0,
  },
  submitButton: {
    width: "50%",
    backgroundColor: "#ED3B5B",
    borderRadius: 45,
    marginTop: 20,
  },
  submitText: {
    fontSize: 25,
    color: "white",
    padding: 16,
    textAlign: "center",
  },
  icon: {
    width: 35,
    alignItems: "center",
  },
});
