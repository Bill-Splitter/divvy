import React from "react";

import Swipeable from "react-native-gesture-handler/Swipeable";

import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity,
} from "react-native";


const ItemBox = (props) => {
  const rightSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 100],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={props.handleDelete}
        style={{ transform: [{ scale: scale }] }}
      >
        <View style={styles.deleteBox}>
          <Animated.Text
            style={{ color: "white", transform: [{ scale: scale }] }}
          >
            Delete
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={rightSwipe}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri: props.data.item.imageUrl,
          }}
          style={styles.image}
        />
        <View style={styles.textHolder}>
        <Text numberOfLines={1} style={styles.listText}>
          {props.data.item.fName} {props.data.item.lName}
        </Text>
        <Text  numberOfLines={1} style={styles.smallText}>
        Username: {props.data.item.username}, Phone: {props.data.item.phoneNumber}

        </Text>

        </View>

      </View>
    </Swipeable>
  );
};

export default ItemBox

const styles = StyleSheet.create({
  listText: {
    fontSize: 32,
    color: "#ED3B5B",
    padding: 15,
    paddingBottom: 10,
    textAlign: "left",
  },
  smallText: {
    paddingLeft: 15,
    paddingBottom: 15,

    textAlign: "left",
    color: "#ED3B5B",

  },
  textHolder: {

    
  },

  deleteBox: {
    backgroundColor: "#ED3B5B",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: "100%",
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 999,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#ED3B5B",
    marginRight: 10,
    marginLeft: 10,
  },
});
