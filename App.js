import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Homescreen from "./client/Components/Homescreen.js";
import Signup from "./client/Components/login/Signup.js";
import Login from "./client/Components/login/Login.js";
import Banner from "./client/Components/login/Banner.js";

import ProfilePage from "./client/Components/ProfilePage.js";

const AuthStack = createNativeStackNavigator();
//const HomeStack = createNativeStackNavigator()

export default function App() {
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
             <AuthStack.Screen
          name="Banner"
          component={Banner}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
