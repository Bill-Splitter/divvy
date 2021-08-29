import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { deleteSelfThunk } from "../../../store";
import Banner2 from "../Banner2";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableHighlight,
} from "react-native";

const DeleteAccount = () => {
  const navigation = useNavigation();
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();

  const press = () => {
    Alert.alert(
      "Deleting Accoount",
      "This cannot be undone, all of your associated account data will not be preserved",
      [
        {
          text: "Cancel",
          onPress: () => navigation.goBack(),
          style: "cancel",
        },
        { text: "Delete", onPress: () => terminateAccount() },
      ]
    );
  };

  const terminateAccount = () => {
    dispatch(deleteSelfThunk(userId));
    navigation.navigate("Homescreen");
  };

  return (
    <View style={{ flex: 0, backgroundColor: "white", height: "100%" }}>
      <Banner2 name={"Delete Account"} />
      <View style={styles.container}>
        <FontAwesome name="warning" size={120} color="#fcc328" />
        <Text style={styles.largeText}>Delete Account</Text>
        <Text style={styles.smallText}>This Cannot Be Undone</Text>
        <TouchableHighlight style={styles.button} onPress={() => press()}>
          <Text style={styles.text}>Delete</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default DeleteAccount;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 40,
  },
  largeText: {
    color: "#2e2225",
    fontWeight: "900",
    fontSize: 40,
  },
  smallText: {
    color: "#2e2225",
    fontSize: 20,
  },
  button: {
    marginTop: 20,
    padding: 15,
    paddingRight: 40,
    paddingLeft: 40,
    backgroundColor: "#ED3B5B",
    borderRadius: 999,
  },
  text: {
    color: "white",
    fontSize: 20,
  },
});
