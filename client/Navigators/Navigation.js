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
import SoloSplitCreation from "../Components/Home/SingleSplit/SoloSplitCreation.js";
import ItemizedSplitCreation from "../Components/Home/ItemizedSplit/ItemizedSplitCreation.js";
import SendItemizedBills from "../Components/Home/ItemizedSplit/SendItemizedBills.js";
import OwnerOpenBill from "../Components/Home/ItemizedSplit/OwnerOpenBill.js";
import PayeeOpenBill from "../Components/Home/ItemizedSplit/PayeeOpenBill.js";
import Cameras from "../Components/Home/Camera/Camera.js";
import GroupList from "../Components/Home/Group/GroupList.js";
import AllGroups from "../Components/Home/Group/AllGroups";
import CreateGroup from "../Components/Home/Group/CreateGroup.js";
import CreateGroupName from "../Components/Home/Group/CreateGroupName.js";
import GroupMembers from "../Components/Home/Group/GroupMembers.js";
import GroupMembersItemBox from "../Components/Home/Group/GroupMembersItemBox.js";
import FriendsList from "../Components/Home/Friends/FriendsList.js";
import Summary from "../Components/Home/SingleSplit/Summary.js";
import AddFriend from "../Components/Home/Friends/AddFriend.js";
import FriendRequests from "../Components/Home/Friends/FriendRequests.js";
import TotalField from "../Components/Home/ItemizedSplit/ItemizedSplitCreation.js";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import IndividualTrans from "../Components/Home/Transactions/IndividualTrans.js";
import ChangePassword from "../Components/Home/Settings/ChangePassword.js";
import ChangeUsername from "../Components/Home/Settings/ChangeUsername.js";
import ChangePhoneNumber from "../Components/Home/Settings/ChangePhoneNumber.js";
import ChangeIcon from "../Components/Home/Settings/ChangeIcon.js";
import ChangeEmail from "../Components/Home/Settings/ChangeEmail.js";
import DeleteAccount from "../Components/Home/Settings/DeleteAccount.js";
import Theme from "../Components/Home/Settings/Theme.js";

import colorObj from "../colors.js";

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
      <HomeStack.Screen
        name="ItemizedSplitCreation"
        component={ItemizedSplitCreation}
      />
      <HomeStack.Screen
        name="SoloSplitCreation"
        component={SoloSplitCreation}
      />
      <HomeStack.Screen
        name="SendItemizedBills"
        component={SendItemizedBills}
      />
      <HomeStack.Screen name="OwnerOpenBill" component={OwnerOpenBill} />
      <HomeStack.Screen name="PayeeOpenBill" component={PayeeOpenBill} />
      <HomeStack.Screen name="Camera" component={Cameras} />
      <HomeStack.Screen name="GroupList" component={GroupList} />
      <HomeStack.Screen name="AllGroups" component={AllGroups} />
      <HomeStack.Screen name="CreateGroup" component={CreateGroup} />
      <HomeStack.Screen name="CreateGroupName" component={CreateGroupName} />
      <HomeStack.Screen name="GroupMembers" component={GroupMembers} />
      <HomeStack.Screen
        name="GroupMembersItemBox"
        component={GroupMembersItemBox}
      />
      <HomeStack.Screen name="FriendsList" component={FriendsList} />
      <HomeStack.Screen name="Settings" component={Settings} />
      <HomeStack.Screen name="Friends" component={Friends} />
      <HomeStack.Screen name="Summary" component={Summary} />
      <HomeStack.Screen name="AddFriend" component={AddFriend} />
      <HomeStack.Screen name="Transactions" component={Transactions} />
      <HomeStack.Screen name="Messages" component={Messages} />
      <HomeStack.Screen name="FriendRequests" component={FriendRequests} />
      <HomeStack.Screen name="IndividualTrans" component={IndividualTrans} />
      <HomeStack.Screen name="TotalField" component={TotalField} />

      <HomeStack.Screen name="ChangeIcon" component={ChangeIcon} />
      <HomeStack.Screen name="ChangePassword" component={ChangePassword} />
      <HomeStack.Screen
        name="ChangePhoneNumber"
        component={ChangePhoneNumber}
      />
      <HomeStack.Screen name="ChangeUsername" component={ChangeUsername} />
      <HomeStack.Screen name="ChangeEmail" component={ChangeEmail} />
      <HomeStack.Screen name="DeleteAccount" component={DeleteAccount} />
      <HomeStack.Screen name="Theme" component={Theme} />
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
              return <FontAwesome name="home" size={28} color={color} />;
            case "New Divvy":
              return <Entypo name="scissors" size={size + 15} color={color} />;
            case "Groups":
              return (
                <MaterialCommunityIcons
                  name="account-group"
                  size={28}
                  color={color}
                />
              );
          }
        },
        tabBarActiveTintColor: colorObj.main,
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarBadge: requests.length > 0 ? requests.length : null,
        }}
      />
      <Tab.Screen name="New Divvy" component={DivvyView} />
      <Tab.Screen name="Groups" component={AllGroups} />
    </Tab.Navigator>
  );
};

export default function NavigationCon() {
  const myId = useSelector((state) => state.user.id);

  if (!myId) {
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
        </AuthStack.Navigator>
      </NavigationContainer>
    );
  } else {
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
}
