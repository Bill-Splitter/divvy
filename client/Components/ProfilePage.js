import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
} from "react-native";
import Camera from "./Camera";

export default function profilePage() {
  // const [startCamera, setStartCamera] = React.useState(false);

  // const __startCamera = async () => {
  //   const { status } = await Camera.requestPermissionsAsync();
  //   console.log(status);
  //   if (status === "granted") {
  //     setStartCamera(true);
  //   } else {
  //     Alert.alert("Access denied");
  //   }
  // };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text
          style={{
            fontSize: 25,
            color: "#ED3B5B",
            padding: 16,
            textAlign: "left",
          }}
        >
          Username
        </Text>
        <Text
          style={{
            fontSize: 25,
            color: "#ED3B5B",
            padding: 16,
            textAlign: "left",
          }}
        >
          Username@email.com
        </Text>
      </View>
      <View
        style={{
          width: "90%",
          borderBottomWidth: "1",
          backgroundColor: "#D7CBCB",
          borderColor: "#D7CBCB",
          marginTop: 10,
          height: 1,
        }}
      ></View>
      <View
        style={{
          width: "100%",
          flex: 2,
          alignItems: "left",
          justifyContent: "center",
        }}
      >
        <TouchableHighlight
          // style={{ width: "90%", backgroundColor: "#ED3B5B", borderRadius: 45 }}
          onPress={() => <Camera />}
        >
          <Text
            style={{
              fontSize: 25,
              color: "#ED3B5B",
              padding: 16,
              textAlign: "left",
            }}
          >
            New divvy
          </Text>
        </TouchableHighlight>
        <View
          style={{
            width: "90%",
            borderBottomWidth: "1",
            backgroundColor: "#D7CBCB",
            borderColor: "#D7CBCB",
            marginTop: 10,
            height: 1,
          }}
        ></View>
        <TouchableHighlight>
          <Text
            style={{
              fontSize: 25,
              color: "#ED3B5B",
              padding: 15,
              textAlign: "center",
            }}
          >
            Transactions
          </Text>
        </TouchableHighlight>
        <View
          style={{
            width: "90%",
            borderBottomWidth: "1",
            backgroundColor: "#D7CBCB",
            borderColor: "#D7CBCB",
            marginTop: 10,
            height: 1,
          }}
        ></View>
        <TouchableHighlight>
          <Text
            style={{
              fontSize: 25,
              color: "#ED3B5B",
              padding: 15,
              textAlign: "center",
            }}
          >
            Friends
          </Text>
        </TouchableHighlight>
        <View
          style={{
            width: "90%",
            borderBottomWidth: "1",
            backgroundColor: "#D7CBCB",
            borderColor: "#D7CBCB",
            marginTop: 10,
            height: 1,
          }}
        ></View>
        <TouchableHighlight>
          <Text
            style={{
              fontSize: 25,
              color: "#ED3B5B",
              padding: 15,
              textAlign: "center",
            }}
          >
            Messages
          </Text>
        </TouchableHighlight>
        <View
          style={{
            width: "90%",
            borderBottomWidth: "1",
            backgroundColor: "#D7CBCB",
            borderColor: "#D7CBCB",
            marginTop: 10,
            height: 1,
          }}
        ></View>
        <TouchableHighlight>
          <Text
            style={{
              fontSize: 25,
              color: "#ED3B5B",
              padding: 15,
              textAlign: "center",
            }}
          >
            Settings
          </Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    height: "100%",
  },
});
