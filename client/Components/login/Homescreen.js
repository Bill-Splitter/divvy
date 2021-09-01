import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  Button,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from 'react-native';
import { Linking } from 'react-native';

export default function Homescreen({ navigation }) {
  if (Platform.OS === 'ios') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ top: 100 }}>
          <Entypo name="scissors" size={200} color="#ED3B5B" />
          <Text style={styles.logoText}>divvy</Text>
        </View>

        <View style={styles.buttonHolder}>
          <TouchableHighlight
            style={styles.loginButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => navigation.navigate("Signup")}
            style={styles.signupButton}
          >
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    );
  } else if (Platform.OS === 'android') {
    return (
      <SafeAreaView style={styles.container}>
      <View style={{ top: 100 }}>
        <Text style={styles.logoText}>Get An iPhone</Text>
        <Text style={styles.androidMessage}
          onPress={() => Linking.openURL('https://www.apple.com/store')}>
        Available at: https://www.apple.com/store
        </Text>
      </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
  },
  logoText: {
    fontSize: 45,
    color: "#ED3B5B",
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonHolder: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    top: 100,
  },
  loginButton: {
    width: "90%",
    backgroundColor: "#ED3B5B",
    borderRadius: 45,
  },
  loginText: {
    fontSize: 25,
    color: "white",
    padding: 16,
    textAlign: "center",
  },
  signupButton: {
    width: "90%",
    borderRadius: 45,
    borderColor: "#ED3B5B",
    borderWidth: 1,
    marginTop: 20,
  },
  signupButtonText: {
    fontSize: 25,
    color: "#ED3B5B",
    padding: 15,
    textAlign: "center",
  },
  androidMessage: {
    fontSize: 15,
    color: 'blue',
    textAlign: "center",
  },
});
