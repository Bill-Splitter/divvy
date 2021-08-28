import Homescreen from "../Components/login/Homescreen.js";
import Signup from "../Components/login/Signup.js";
import Login from "../Components/login/Login.js";
import ProfilePage from "../Components/Home/ProfilePage.js";
import Settings from "../Components/Home/Settings/Settings.js";
import Friends from "../Components/Home/Friends/Friends.js";
import Messages from "../Components/Home/Messages.js";
import Transactions from "../Components/Home/Transactions/Transactions.js";
import DivvyView from "../Components/Home/DivvyView.js";
import SimpleSplitCreation from "../Components/Home/SingleSplit/SimpleSplitCreation.js";
import GroupList from "../Components/Home/Group/GroupList.js";
import AllGroups from "../Components/Home/Group/AllGroups";
import CreateGroup from "../Components/Home/Group/CreateGroup.js";
import CreateGroupName from "../Components/Home/Group/CreateGroupName.js";
import FriendsList from "../Components/Home/Friends/FriendsList.js";
import Summary from "../Components/Home/SingleSplit/Summary.js";
import AddFriend from "../Components/Home/Friends/AddFriend.js";
import FriendRequests from "../Components/Home/Friends/FriendRequests.js";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

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
      <HomeStack.Screen name="AllGroups" component={AllGroups} />
      <HomeStack.Screen name="CreateGroup" component={CreateGroup} />
      {/* <HomeStack.Screen name="CreateGroupName" component={CreateGroupName} /> */}
      <HomeStack.Screen name="FriendsList" component={FriendsList} />
      <HomeStack.Screen name="Settings" component={Settings} />
      <HomeStack.Screen name="Friends" component={Friends} />
      <HomeStack.Screen name="Summary" component={Summary} />
      <HomeStack.Screen name="AddFriend" component={AddFriend} />
      <HomeStack.Screen name="Transactions" component={Transactions} />
      <HomeStack.Screen name="Messages" component={Messages} />
      <HomeStack.Screen name="FriendRequests" component={FriendRequests} />
    </HomeStack.Navigator>
  );
};

const BottomTabNav = () => {
  let requests = useSelector((state) => state.user.requestee || []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case "Home":
              return <AntDesign name="home" size={size} color={color} />;
            case "New Divvy":
              return <Entypo name="scissors" size={size + 15} color={color} />;
            case "Groups":
              return (
                <Ionicons
                  name="ios-person-circle-outline"
                  size={size}
                  color={color}
                />
              );
          }
        },
        tabBarActiveTintColor: "#ED3B5B",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ tabBarBadge: requests.length > 0 ? requests.length : null }}
      />
      <Tab.Screen name="New Divvy" component={DivvyView} />
      <Tab.Screen name="Groups" component={AllGroups} />
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
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
