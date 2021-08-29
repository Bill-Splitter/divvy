import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Animated,
} from "react-native";

const TransactionItem = (props) => {
  console.log(props.data.item.id)
  const rightSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={props.handleDelete}
        style={{ transform: [{ scale: scale }] }}
      >
        <Animated.View style={styles.deleteBox}>
          <Animated.Text
            style={{ color: "white", transform: [{ scale: scale }] }}
          >
            Delete
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const navigation = useNavigation();

  let dateObj = new Date(props.data.item.date);
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  dateObj = dateObj
    .toISOString()
    .replace("-", "/")
    .split("T")[0]
    .replace("-", "/");

  return (
    <Swipeable renderRightActions={rightSwipe}>
      <TouchableHighlight underlayColor={"transparent"}>
        <View style={styles.container}>
          <Text
            style={styles.dateText}
            onPress={() =>
              navigation.navigate("IndividualTrans", { data: props.data.item })
            }
          >
            {month}/{day}
          </Text>

          <TouchableHighlight
            style={styles.info}
            underlayColor={"transparent"}
            onPress={() =>
              navigation.navigate("IndividualTrans", { data: props.data.item })
            }
          >
            <View>
              <Text numberOfLines={1} style={styles.text2}>
                {props.data.item.name}
              </Text>
              <Text numberOfLines={1} style={styles.text}>
                Total: ${Number(props.data.item.total).toFixed(2)}
              </Text>
              <Text numberOfLines={1} style={styles.text}>
                Your Share: $
                {Number(props.data.item.parsedBill.userAmounts).toFixed(2)}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  dateText: {
    fontSize: 38,
    marginLeft: 10,
    color: "#ED3B5B",
    marginRight: 10,
  },
  info: {
    marginLeft: 15,
    color: "#ED3B5B",
  },
  text: {
    color: "#ED3B5B",
  },
  text2: {
    color: "#ED3B5B",
    fontSize: 18,
    fontWeight: "bold",
  },
  deleteBox: {
    backgroundColor: "#ED3B5B",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: "100%",
  },
});

export default TransactionItem;
