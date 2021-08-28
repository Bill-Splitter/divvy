import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
//import { setGroup } from "../../../store/split";
import { useDispatch, useSelector } from "react-redux";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  TextInput,
  ScrollView,
  FlatList,
  Image,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import Banner2 from "../Banner2";

const CreateGroups = () => {
  const friends = useSelector((state) => state.user.friend);

  const [selectedArray, setSelected] = React.useState([]);

  const addToSelectedArray = (id) => {
    let list = selectedArray;
    list.push(id);
    setSelected(list);
  };
  const removeFromSelectedArray = (id) => {
    let list = selectedArray;
    list = list.filter((element) => {
      if (element !== id) return element;
    });
    setSelected(list);
  };

  console.log("the list selected is", selectedArray);
  const items = friends;
  return (
    <View style={{ flex: 0, backgroundColor: "white", height: "100%" }}>
      <Banner2 name={"Create Group"} />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={items}
        renderItem={(item) => {
          return (
            <ListItem
              data={item}
              removeList={() => removeFromSelectedArray(item.item.id)}
              addToList={() => addToSelectedArray(item.item.id)}
            />
          );
        }}
        ItemSeparatorComponent={() => {
          return <View style={styles.seperatorLine}></View>;
        }}
      />
    </View>
  );
};

const ListItem = (props) => {
  let [selected, setSelected] = React.useState(false);

  const onPressed = () => {
    if (selected === false) setSelected(true);
    else setSelected(false);
    if (selected) props.removeList();
    else props.addToList();
  };

  return (
    <>
      {selected ? (
        <TouchableHighlight
          underlayColor={"transparent"}
          style={{
            backgroundColor: "#3bedac",
            color: "purple",
            justifyContent: "center",
          }}
          onPress={() => onPressed()}
        >
          <View style={styles.holder}>
            <Image
              style={styles.selectedImage}
              source={{
                uri: props.data.item.imageUrl,
              }}
            />
            <Text style={styles.selectedElement}>
              {props.data.item.fName} {props.data.item.lName}
            </Text>
          </View>
        </TouchableHighlight>
      ) : (
        <TouchableHighlight onPress={() => onPressed()}>
          <View style={styles.holder}>
            <Image
              style={styles.image}
              source={{
                uri: props.data.item.imageUrl,
              }}
            />
            <Text style={styles.regularElement}>
              {props.data.item.fName} {props.data.item.lName}
            </Text>
          </View>
        </TouchableHighlight>
      )}
    </>
  );
};

export default CreateGroups;

const styles = StyleSheet.create({
  selectedElement: {
    fontSize: 30,
    color: "white",
    padding: 10,
    marginLeft: 20,
    textAlign: "left",
  },
  regularElement: {
    fontSize: 30,
    color: "#ED3B5B",
    padding: 10,
    marginLeft: 20,
    textAlign: "left",
  },
  seperatorLine: {
    height: 2,
    backgroundColor: "white",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 999,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
    marginLeft: 10,
  },
  holder: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  selectedImage: {
    width: 50,
    height: 50,
    borderRadius: 999,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
    marginLeft: 10,
  },
});
