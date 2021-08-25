import React from "react";
import { Provider } from "react-redux";
import store from "./client/store/index.js";

import NavigationCon from "./client/Navigation";
import BottomTabNavigator from "./client/BottomTabNav";

export default function App() {
  return (
    <Provider store={store}>
      {/* <NavigationCon /> */}
      <BottomTabNavigator />
    </Provider>
  );
}
