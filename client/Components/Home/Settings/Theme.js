import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Banner2 from "../Banner2";
import { updateUserThunk } from "../../../store";
import colorObj from "../../../colors";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Alert,
  ScrollView,
} from "react-native";
import {
  setBerry,
  setClassic,
  setBlue,
  setPinky,
  berry,
  classic,
  blue,
  pinky,
  baby,
  greens,
  setBaby,
  setGreens,
} from "../../../colors";

const Theme = () => {
  const userId = useSelector((state) => state.user.id);
  const [selected, setSelected] = React.useState(colorObj);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 0, backgroundColor: "white", height: "100%" }}>
      <Banner2 name={"Change Username"} />
      <View style={styles.container}>
        <Text style={styles.header}>Change Your Theme</Text>
        <Text style={{ color: colorObj.main }}>
          Current Theme: {selected[4] || colorObj.name}
        </Text>

        <View style={{ marginTop: 10, padding: 15 }}>
          <TouchableHighlight
            onPress={() => {
              setBerry();
              setSelected(berry);
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "50%",
                  padding: 10,
                }}
              >
                <View
                  style={{ width: 50, height: 50, backgroundColor: "#8202ad" }}
                />
                <View
                  style={{ width: 50, height: 50, backgroundColor: "#ad0282" }}
                />
              </View>

              <Text style={{ color: colorObj.main, fontSize: 16 }}>
                Purple Berry
              </Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => {
              setClassic();
              setSelected(classic);
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "50%",
                  padding: 10,
                }}
              >
                <View
                  style={{ width: 50, height: 50, backgroundColor: "#ED3B5B" }}
                />
                <View
                  style={{ width: 50, height: 50, backgroundColor: "#3bedac" }}
                />
              </View>

              <Text style={{ color: colorObj.main, fontSize: 16 }}>
                Classic
              </Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => {
              setBlue();
              setSelected(blue);
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "50%",
                  padding: 10,
                }}
              >
                <View
                  style={{ width: 50, height: 50, backgroundColor: "#3131cc" }}
                />
                <View
                  style={{ width: 50, height: 50, backgroundColor: "#7b3cba" }}
                />
              </View>

              <Text style={{ color: colorObj.main, fontSize: 16 }}>Blue</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => {
              setPinky();
              setSelected(pinky);
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "50%",
                  padding: 10,
                }}
              >
                <View
                  style={{ width: 50, height: 50, backgroundColor: "#ffa1ff" }}
                />
                <View
                  style={{ width: 50, height: 50, backgroundColor: "#d0ffa1" }}
                />
              </View>

              <Text style={{ color: colorObj.main, fontSize: 16 }}>Pinky</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => {
              setBaby();
              setSelected(baby);
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "50%",
                  padding: 10,
                }}
              >
                <View
                  style={{ width: 50, height: 50, backgroundColor: "#ffb2d1"}}
                />
                <View
                  style={{ width: 50, height: 50, backgroundColor: "#b2f0ff" }}
                />
              </View>

              <Text style={{ color: colorObj.main, fontSize: 16 }}>Baby</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => {
              setGreens();
              setSelected(greens);
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "50%",
                  padding: 10,
                }}
              >
                <View
                  style={{ width: 50, height: 50, backgroundColor: '#188556' }}
                />
                <View
                  style={{ width: 50, height: 50, backgroundColor: "#184785" }}
                />
              </View>

              <Text style={{ color: colorObj.main, fontSize: 16 }}>Greens</Text>
            </View>
          </TouchableHighlight>

        
        </View>
      </View>
    </View>
  );
};

export default Theme;

const styles = StyleSheet.create({
  input: {
    height: 45,
    margin: 10,
    borderBottomWidth: 2,
    borderColor: "#313359",
    padding: 5,
    width: "55%",
    paddingLeft: 20,
  },
  container: {
    alignItems: "center",
  },
  header: {
    color: colorObj.main,
    fontSize: 26,
    fontWeight: "bold",
    padding: 10,
    marginTop: 10,
  },
  button: {
    marginTop: 15,
    backgroundColor: colorObj.main,
    padding: 15,
    paddingLeft: 35,
    paddingRight: 35,
    borderRadius: 9999999,
  },
  bText: {
    color: "white",
    fontWeight: "bold",
  },
});
