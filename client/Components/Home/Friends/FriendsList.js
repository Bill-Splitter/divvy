import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import colorObj from "../../../colors";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Banner2 from "../Banner2";

export default FriendsList = () => {
  const navigation = useNavigation();
  const [friend, setFriend] = React.useState();

  return (
    <View style={{ flex: 0, backgroundColor: "white", height: "100%" }}>
      <Banner2 name="Select Friends" />
      <View style={styles.view}>
        <ScrollView style={{ width: "100%" }}>
          <TextInput
            placeholder="Search Friends"
            style={styles.input}
            value={friend}
            maxLength={30}
            onChangeText={(text) => setEvent(text)}
          ></TextInput>
          <TouchableHighlight
            style={styles.listElementContainer}
            onPress={() => navigation.navigate("DivvyView")}
            underlayColor={"white"}
          >
            <View style={styles.listElement}>
              {allFriends.map((element, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={{
                        uri: "https://i.guim.co.uk/img/media/8a13052d4db7dcd508af948e5db7b04598e03190/0_294_5616_3370/master/5616.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=bcaa4eed2c1e6dab61c41a61e41433d9",
                      }}
                      style={styles.friendImage}
                    />
                    <Text style={styles.listText}>{element.username}</Text>
                  </View>
                );
              })}
            </View>
          </TouchableHighlight>
        </ScrollView>
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
    marginLeft: 20,
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
    flex: 1,
    alignContent: "center",
    textAlign: "left",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
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
  friendImage: {
    width: 45,
    height: 45,
    borderRadius: 999,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: colorObj.main,
    marginRight: 10,
  },
});
