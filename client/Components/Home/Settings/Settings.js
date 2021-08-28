import React from "react";
import { useNavigation } from "@react-navigation/native";


import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
} from "react-native";
import Banner2 from "../Banner2";

const Settings = (props) => {
  

  const items = [
    {
      name: "ChangeUsername",
      title: "Change Username",
    },
    {
      name: "ChangeIcon",
      title: "Change Icon",
    },
    {
      name: "ChangePassword",
      title: "Change Password",
    },
    {
      name: "ChangePhoneNumber",
      title: "Change Phone Number",
    },
  ];

  return (
    <View style={{ flex: 0, backgroundColor: "white", height: "100%" }}>
      <Banner2 name={"Account Settings"} />
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
});
