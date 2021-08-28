import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setGroup } from "../../../store/split";
import CreateGroup from "./CreateGroup";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Banner2 from "../Banner2";

const AllGroups = (props) => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 0, backgroundColor: "white", height: "100%" }}>
      <Banner2 name={"Your Groups"} />
      <View>
        <Text>All GROUPS </Text>
        <Button
          title="Click here to make new group" //this is going to become a plus sign in the top rightcorner
          onPress={() => {
            navigation.navigate("CreateGroup");
          }}
        />
      </View>
    </View>
  );
};

export default AllGroups;
