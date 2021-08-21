import Homescreen from "./Components/Homescreen.js";
import Signup from "./Components/login/Signup.js";
import Login from "./Components/login/Login.js";
import Banner from "./Components/login/Banner.js";
import ProfilePage from "./Components/ProfilePage.js";
import Settings from "./Components/Home/Settings.js";
import Friends from "./Components/Home/Friends.js";
import Messages from "./Components/Home/Messages.js";
import Transactions from "./Components/Home/Transactions.js";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AuthStack = createNativeStackNavigator();

const HomeStack = createNativeStackNavigator();

const Home = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="ProfilePage" component={ProfilePage} />
      <HomeStack.Screen name="Settings" component={Settings} />
      <HomeStack.Screen name="Friends" component={Friends} />
      <HomeStack.Screen name="Transactions" component={Transactions} />
      <HomeStack.Screen name="Messages" component={Messages} />
    </HomeStack.Navigator>
  );
};

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
        <AuthStack.Screen name="Home" component={Home} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
