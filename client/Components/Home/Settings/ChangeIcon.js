import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { updateUserThunk } from "../../../store";
import Banner2 from "../Banner2";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableHighlight,
} from "react-native";

const ChangeIcon = () => {
  const [icon, setIcon] = React.useState();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);

  const updateIcon = async () => {
    if (!icon) {
      Alert.alert("Icon Url Cannot be blank");
    } else {
      const update = {
        imageUrl: icon.trim(),
      };
      const status = await dispatch(updateUserThunk(userId, update));
      if (status) {
        Alert.alert("Error", "Something Went Wrong");
        setIcon("");
      } else {
        Alert.alert("Icon was updated");
        navigation.goBack();
      }
    }
  };

  return (
    <View style={{ flex: 0, backgroundColor: "white", height: "100%" }}>
      <Banner2 name={"Change Icon"} />
      <View style={styles.container}>
        <Text style={styles.header}>Enter An Image URL</Text>
        <TextInput
          placeholder="Image URL"
          style={styles.input}
          value={icon}
          onChangeText={(text) => setIcon(text)}
        ></TextInput>

        <TouchableHighlight style={styles.button} onPress={() => updateIcon()}>
          <Text style={styles.bText}>Update</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default ChangeIcon;

const styles = StyleSheet.create({
  input: {
    height: 45,
    margin: 10,
    borderBottomWidth: 2,
    borderColor: "#313359",
    padding: 5,
    width: "90%",
    paddingLeft: 20,
  },
  container: {
    alignItems: "center",
  },
  header: {
    color: "#ED3B5B",
    fontSize: 26,
    fontWeight: "bold",
    padding: 10,
    marginTop: 10,
  },
  button: {
    marginTop: 15,
    backgroundColor: "#ED3B5B",
    padding: 15,
    paddingLeft: 35,
    paddingRight: 35,
    borderRadius: 9999999,
  },
  bText: {
    color: "white",
    fontWeight: "bold",
  },
});
