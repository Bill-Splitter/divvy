import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

export default function profilePage() {
  const navigation = useNavigation();

  const logout = () => {
    //logic logic needed here
    navigation.navigate("Homescreen")
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ textAlign: "center" }}>
        <Text style={styles.bigText}>Username</Text>
        <Text style={styles.littleText}>Username@email.com</Text>
      </View>
      <View style={styles.borderBar}></View>

      <View style={styles.listContainer}>
        <TouchableHighlight
          style={styles.listElementContainer}
          onPress={() => navigation.navigate("Transactions")}
          underlayColor={"white"}
        >
          <View>
            <View style={styles.listElement}>
              <Entypo name="scissors" size={24} color="#ED3B5B" />
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
              <MaterialIcons name="attach-money" size={24} color="#ED3B5B" />
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
              <Ionicons name="person-outline" size={24} color="#ED3B5B" />
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
              <Feather name="message-square" size={24} color="#ED3B5B" />
              <Text style={styles.listText}>Messages</Text>
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
              <Feather name="settings" size={24} color="#ED3B5B" />
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
        <TouchableHighlight style={styles.submitButton}
        onPress={() => logout()}>
          <Text style={styles.submitText}>Logout</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
}

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
    color: "#ED3B5B",
    padding: 10,
    paddingLeft: 100,
    fontWeight: "bold",
  },
  littleText: {
    fontSize: 15,
    color: "#ED3B5B",
    paddingLeft: 100,
    padding: 2,
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
});
