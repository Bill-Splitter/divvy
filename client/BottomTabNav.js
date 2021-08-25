// import ProfilePage from "./Components/ProfilePage.js";
// import Settings from "./Components/Home/Settings.js";
// import Friends from "./Components/Home/Friends.js";
// import Messages from "./Components/Home/Messages.js";
// import Transactions from "./Components/Home/Transactions.js";
// // import Cameras from "./Components/Home/Camera";
// import DivvyView from "./Components/Home/DivvyView.js";
// import SimpleSplitCreation from "./Components/Home/SimpleSplitCreation.js";
// import GroupList from "./Components/Home/GroupList.js";

// import FriendsList from "./Components/Home/FriendsList.js";

// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// const HomeStack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// const Home = () => {
//   return (
//     <HomeStack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <HomeStack.Screen name="ProfilePage" component={ProfilePage} />
//       <HomeStack.Screen name="DivvyView" component={DivvyView} />
//       <HomeStack.Screen
//         name="SimpleSplitCreation"
//         component={SimpleSplitCreation}
//       />
//       <HomeStack.Screen name="GroupList" component={GroupList} />
//       <HomeStack.Screen name="FriendsList" component={FriendsList} />
//       <HomeStack.Screen name="Settings" component={Settings} />
//       <HomeStack.Screen name="Friends" component={Friends} />
//       <HomeStack.Screen name="Transactions" component={Transactions} />
//       <HomeStack.Screen name="Messages" component={Messages} />
//     </HomeStack.Navigator>
//   );
// };

// export default function BottomTabNavigator() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={{
//           headerShown: false,
//         }}
//       >
//         <Tab.Screen name="Home" component={Home} />
//         <Tab.Screen name="New Divvy" component={DivvyView} />
//         <Tab.Screen name="Friends" component={FriendsList} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }
