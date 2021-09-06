import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { setData } from "../../../store/split";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Banner2 from "../Banner2";

const ItemizedSplitCreation = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [total, setTotal] = React.useState();
  const [tip, setTip] = React.useState();
  const [event, setEvent] = React.useState();
  const { image } = route.params;

  const clickSubmit = () => {
    if (!tip) setTip(0);

    if (!total || !event) {
      alert("Must enter total");
    } else {
      const totalDollars = Number(total) + Number(tip);
      props.submit(event, totalDollars);
      navigation.navigate("GroupList", { image: image });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ backgroundColor: "white", height: "100%" }}
    >
      <Banner2 name="Create Divvy Event" />
      <View style={styles.view}>
        <Image
          source={image}
          style={{
            flex: 10,
            width: "100%",
            height: "100%",
            resizeMode: "contain",
          }}
        />
        <View style={styles.inputFields}>
          <View style={styles.inputRow}>
            <Text style={styles.iconHolder}>
              <MaterialIcons name="event" size={32} color="black" />
            </Text>
            <TextInput
              placeholder="Event Name Here"
              style={styles.input}
              value={event}
              maxLength={28}
              onChangeText={(text) => setEvent(text)}
            ></TextInput>
          </View>
          {/* <EventField /> */}

          {/* below is the total with tax field */}

          <View style={styles.inputRow}>
            <Text style={styles.iconHolder}>
              <Foundation name="dollar" size={44} color="black" />
            </Text>
            <TextInput
              placeholder="Enter Total w/ Tax"
              style={styles.input2}
              value={total}
              maxLength={6}
              onChangeText={(text) => setTotal(text)}
              keyboardType="numeric"
            ></TextInput>
          </View>

          {/* // below is the tip field */}

          <View style={styles.inputRow}>
            <Text style={styles.iconHolder}>
              <FontAwesome name="gratipay" size={28} color="black" />
            </Text>
            <TextInput
              placeholder="Tip (optional)"
              style={styles.input3}
              value={tip}
              maxLength={6}
              onChangeText={(text) => setTip(text)}
              keyboardType="numeric"
            ></TextInput>
          </View>
        </View>

        {/* below is the submit button to select a group (should render after tip field is entered) */}

        <TouchableHighlight
          style={styles.loginButton}
          onPress={() => clickSubmit()}
        >
          <Text style={styles.loginButtonText}>Select Group</Text>
        </TouchableHighlight>
      </View>
    </KeyboardAvoidingView>
  );
};
const mapStateToProps = (state) => ({
  name: state.split.name,
  total: state.split.total,
});

const mapDispatchToProps = (dispatch) => ({
  submit: (name, total) => dispatch(setData(name, total)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemizedSplitCreation);

export const EventField = () => {
  // const navigation = useNavigation();
  // const onToNext = () => {
  //   navigation.navigate("TotalField");
  // };
  return (
    <View style={styles.inputRow}>
      <Text style={styles.iconHolder}>
        <MaterialIcons name="event" size={32} color="black" />
      </Text>
      <TextInput
        placeholder="Event Name Here"
        style={styles.input}
        // value={event}
        maxLength={28}
        onChangeText={(text) => setEvent(text)}
      ></TextInput>

      <TouchableHighlight style={styles.nextButton}>
        <Text style={styles.nextButtonText} onPress={console.log("next")}>
          Next
        </Text>
      </TouchableHighlight>
    </View>
  );
};

// export const TotalField = () => {
//   return (
//     <View style={styles.inputRow}>
//       <Text style={styles.iconHolder}>
//         <Foundation name="dollar" size={44} color="black" />
//       </Text>
//       <TextInput
//         placeholder="Enter Total w/ Tax"
//         style={styles.input2}
//         value={total}
//         maxLength={6}
//         onChangeText={(text) => setTotal(text)}
//       ></TextInput>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  view: {
    width: "100%",
    display: "flex",
    flex: 1,
    justifyContent: "flex-start",
    alignContent: "center",
    textAlign: "left",
    alignItems: "center",
    marginTop: 0,
  },
  iconHolder: {
    textAlign: "center",
    width: 39,
    margin: 0,
    padding: 0,
  },
  inputField: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
  },
  inputRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    height: 35,
    margin: 6,
    padding: -5,
    marginLeft: 10,
    borderBottomWidth: 3,
    borderColor: "#313359",
    fontWeight: "bold",
    width: "65%",
    paddingLeft: 20,
    fontSize: 20,
  },
  input2: {
    height: 35,
    margin: 6,
    padding: -5,
    marginLeft: 10,
    borderBottomWidth: 3,
    borderColor: "#313359",
    width: "65%",
    paddingLeft: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  input3: {
    height: 35,
    margin: 6,
    padding: -5,
    marginLeft: 10,
    borderBottomWidth: 3,
    borderColor: "#313359",
    width: "65%",
    paddingLeft: 20,
    fontSize: 23,
    fontWeight: "bold",
  },
  loginButton: {
    width: "50%",
    backgroundColor: "#ED3B5B",
    borderRadius: 45,
    marginTop: 10,
  },

  loginButtonText: {
    fontSize: 20,
    color: "white",
    padding: 10,
    textAlign: "center",
  },
  nextButton: {
    width: "50%",
    backgroundColor: "#ED3B5B",
    borderRadius: 45,
    marginTop: 10,
  },
  nextButtonText: {
    fontSize: 20,
    color: "white",
    padding: 10,
    textAlign: "center",
  },
});
