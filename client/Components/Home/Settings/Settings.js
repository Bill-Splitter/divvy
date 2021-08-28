import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import items from "./menuItems";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableHighlight,
} from "react-native";
import Banner2 from "../Banner2";

const Settings = (props) => {
  const user = useSelector((state) => state.user);

  return (
    <View style={{ flex: 0, backgroundColor: "white", height: "100%" }}>
      <Banner2 name={"Account Settings"} />
      <View style={styles.topCard}>
        <Image
          source={{
            uri: user.imageUrl,
          }}
          style={styles.image}
        />
        <View>
          <Text numberOfLines={1} style={styles.name}>
            {user.fName} {user.lName}
          </Text>
          <Text numberOfLines={1} style={styles.smallText}>
            Username: {user.username}
          </Text>
          <Text numberOfLines={1} style={styles.smallText}>
            Phone Number: {user.phoneNumber}
          </Text>
          <Text numberOfLines={1} style={styles.smallText}>
            Email: {user.email}
          </Text>
        </View>
      </View>
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(item) => {
          return <MenuItem data={item} />;
        }}
        ItemSeparatorComponent={() => {
          return <View style={styles.seperatorLine}></View>;
        }}
      />
    </View>
  );
};

const MenuItem = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableHighlight
      underlayColor={"transparent"}
      onPress={() => navigation.navigate(props.data.item.name)}
    >
      <Text style={styles.text}>{props.data.item.title}</Text>
    </TouchableHighlight>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: "white",
    height: "100%",
    paddingTop: 25,
  },
  seperatorLine: {
    height: 2,
    backgroundColor: "pink",
  },
  text: {
    color: "#ED3B5B",
    fontSize: 26,
    padding: 18,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 999,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#ED3B5B",
    marginRight: 20,
    marginLeft: 10,
  },
  topCard: {
    display: "flex",
    flexDirection: "row",
    // borderBottomWidth: 2,
    // borderColor: "lightgray",
    padding: 10,
  },
  name: {
    fontSize: 24,
    color: "#ED3B5B",
    fontWeight: "bold",
  },
  smallText: {
    color: "#ED3B5B",
    marginLeft: 5,
  },
});
