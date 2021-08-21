

import Homescreen from "./Components/Homescreen.js";
import Signup from "./Components/login/Signup.js";
import Login from "./Components/login/Login.js";
import Banner from "./Components/login/Banner.js";

import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const AuthStack = createNativeStackNavigator();

export default function NavigationCon() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <AuthStack.Screen name="Homescreen" component={Homescreen} />
        <AuthStack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }}
        />
        <AuthStack.Screen
          name="Signup"
          component={Signup}
          options={{ title: "Sign Up" }}
        />
        <AuthStack.Screen name="Banner" component={Banner} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
