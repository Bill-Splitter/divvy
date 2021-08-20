import React from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
  TouchableHighlight,
  Button,
  Alert,
  Platform,
  StatusBar,
  Dimensions,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Banner from "./Banner";


export default function Login() {
  return (
    <SafeAreaView style={{flex: 0}}>
    <Banner></Banner>
    <View style={{width: "100%", flex: 0, alignContent: 'center', textAlign: "left", justifyContent: 'center', alignItems: "center" }}>
    <Text style={{fontSize: 40, color: '#ED3B5B', textAlign: "left", marginBottom: 20, width: "80%"}}>
        Login
    </Text>
    <TextInput placeholder="username" style={styles.input}>

    </TextInput>
    <TextInput placeholder="password" style={styles.input}>

    </TextInput>

    </View>
 

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    input: {
      height: 50,
      margin: 12,
      borderWidth: 1,
      borderColor: '#313359',
      padding: 10,
      width: "90%",
      borderRadius: 999,
      paddingLeft: 20
    },
  });
