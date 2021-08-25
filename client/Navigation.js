import Homescreen from "./Components/Homescreen.js";
import Signup from "./Components/login/Signup.js";
import Login from "./Components/login/Login.js";
import Banner from "./Components/login/Banner.js";
import ProfilePage from "./Components/ProfilePage.js";
import Settings from "./Components/Home/Settings.js";
import Friends from "./Components/Home/Friends.js";
import Messages from "./Components/Home/Messages.js";
import Transactions from "./Components/Home/Transactions.js";
// import Cameras from "./Components/Home/Camera";
import DivvyView from "./Components/Home/DivvyView.js";
import SimpleSplitCreation from "./Components/Home/SimpleSplitCreation.js";
import GroupList from "./Components/Home/GroupList.js";
import FriendsList from "./Components/Home/FriendsList.js";
import Summary from "./Components/Home/Summary.js";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const AuthStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="ProfilePage" component={ProfilePage} />
      <HomeStack.Screen name="DivvyView" component={DivvyView} />
      <HomeStack.Screen
        name="SimpleSplitCreation"
        component={SimpleSplitCreation}
      />
      <HomeStack.Screen name="GroupList" component={GroupList} />
      <HomeStack.Screen name="FriendsList" component={FriendsList} />
      <HomeStack.Screen name="Settings" component={Settings} />
      <HomeStack.Screen name="Friends" component={Friends} />
      <HomeStack.Screen name="Summary" component={Summary} />
      <HomeStack.Screen name="Transactions" component={Transactions} />
      <HomeStack.Screen name="Messages" component={Messages} />
    </HomeStack.Navigator>
  );
};

const BottomTabNav = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="New Divvy" component={DivvyView} />
      <Tab.Screen name="Friends" component={FriendsList} />
    </Tab.Navigator>
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
        <AuthStack.Screen name="BottomTabNav" component={BottomTabNav} />

        {/* issue arose here when the components were comented out */}
        {/* <AuthStack.Screen name="Banner" component={Banner} /> */}
        <AuthStack.Screen name="Home" component={Home} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
