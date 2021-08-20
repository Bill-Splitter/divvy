import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,

} from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function Homescreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ top: 100 }}>
        <Entypo name="scissors" size={200} color="#ED3B5B" />
        <Text
          style={{
            fontSize: 45,
            color: "#ED3B5B",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          divvy
        </Text>
      </View>

      <View
        style={{
          width: "100%",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          top: 100,
        }}
      >
        <TouchableHighlight
          style={{ width: "90%", backgroundColor: "#ED3B5B", borderRadius: 45 }}
        >
          <Text
            style={{
              fontSize: 25,
              color: "white",
              padding: 16,
              textAlign: "center",
            }}
          >
            Login
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={{
            width: "90%",
            borderRadius: 45,
            borderColor: "#ED3B5B",
            borderWidth: 1,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 25,
              color: "#ED3B5B",
              padding: 15,
              textAlign: "center",
            }}
          >
            Sign Up
          </Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
  },
});
