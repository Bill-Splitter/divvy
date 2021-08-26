import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Banner2 from "./Banner2";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  TextInput,
  ScrollView,
  Image,
} from "react-native";

const FriendRequests = (props) => {
  const requests = props.requestArray || [];
  return (
    <View style={{ flex: 0, backgroundColor: "white", height: "100%" }}>
      <Banner2 name="Friend Requests" />

      {requests.length === 0 ? (
        <Text>No Requests</Text>
      ) : (
        <View>
          {requests.map((element, index) => (
            <Text key={index}>{element.username}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    requestArray: state.user.requestee,
  };
};

export default connect(mapStateToProps)(FriendRequests);
