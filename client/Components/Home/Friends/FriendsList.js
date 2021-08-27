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
  ScrollView,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Banner2 from "../Banner2";

const allFriends = [
  {
    id: 1,
    username: "Scott",
    image: "https://timesofindia.indiatimes.com/photo/67586673.cms",
  },
  {
    id: 2,
    username: "Jake Paul",
    image: "https://timesofindia.indiatimes.com/photo/67586673.cms",
  },
  {
    id: 3,
    username: "John Thomas",
    image: "https://timesofindia.indiatimes.com/photo/67586673.cms",
  },
  {
    id: 4,
    username: "Von Haas",
    image: "https://timesofindia.indiatimes.com/photo/67586673.cms",
  },
  {
    id: 5,
    username: "Ash ",
    image: "https://timesofindia.indiatimes.com/photo/67586673.cms",
  },
  {
    id: 6,
    username: "Jake Paul",
    image: "https://timesofindia.indiatimes.com/photo/67586673.cms",
  },
  {
    id: 7,
    username: "John Thomas",
    image: "https://timesofindia.indiatimes.com/photo/67586673.cms",
  },
  {
    id: 8,
    username: "Von Haas",
    image: "https://timesofindia.indiatimes.com/photo/67586673.cms",
  },
  {
    id: 9,
    username: "Ash ",
    image: "https://timesofindia.indiatimes.com/photo/67586673.cms",
  },
  {
    id: 10,
    username: "Von Haas",
    image: "https://timesofindia.indiatimes.com/photo/67586673.cms",
  },
  {
    id: 11,
    username: "Ash ",
    image: "https://timesofindia.indiatimes.com/photo/67586673.cms",
  },
];

export default FriendsList = () => {
  const navigation = useNavigation();
  const [friend, setFriend] = React.useState();

  return (
    <View style={{ flex: 0, backgroundColor: "white", height: "100%" }}>
      <Banner2 name="Select Friends" />
      <View style={styles.view}>
        {/* <Text style={styles.groupText}>Select Friends</Text> */}

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
                    style={{ display: "flex", flexDirection: "row",alignItems: "center" }}
                  >
                    <Image
                      source={{
                        uri: "https://i.guim.co.uk/img/media/8a13052d4db7dcd508af948e5db7b04598e03190/0_294_5616_3370/master/5616.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=bcaa4eed2c1e6dab61c41a61e41433d9",
                      }}
                      style={{
                        width: 45,
                        height: 45,
                        borderRadius: 999,
                        overflow: "hidden",
                        borderWidth: 2,
                        borderColor: "#ED3B5B",
                        marginRight: 10
                      }}
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
