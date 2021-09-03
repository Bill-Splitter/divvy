import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { setGroup } from "../../../store/split";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  TextInput,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Banner2 from "../Banner2";

const GroupList = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const allGroups = props.groups || [];

  const selectGroup = (groupname, users) => {
    props.setGroup(groupname, users);

    if (route.params) {
      navigation.navigate("SendItemizedBills", {image: route.params.image});
    } else {
      navigation.navigate("Summary");
    }
  };

  return (
    <View style={{ flex: 0, backgroundColor: "white", height: "100%" }}>
      <Banner2 name={"Select Group"} />
      <View
        style={{
          display: "flex",
          backgroundColor: "white",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <View>
          <ScrollView style={{ minHeight: "85%" }}>
            {allGroups.length > 0 ? (
              <TouchableHighlight
                style={styles.listElementContainer}
                underlayColor={"white"}
              >
                <View style={styles.listElement}>
                  {allGroups.map((element, index) => {
                    return (
                      <Text
                        style={styles.listText}
                        key={index}
                        onPress={() =>
                          selectGroup(element.groupname, element.users)
                        }
                      >
                        {element.groupname}
                      </Text>
                    );
                  })}
                </View>
              </TouchableHighlight>
            ) : (
              <View style={styles.no}>
                <Text style={styles.noGroups}>You have no groups</Text>
                <TouchableHighlight
                  style={styles.loginButton}
                  onPress={() => navigation.navigate("AllGroups")}
                >
                  <Text style={styles.loginButtonText}>Create a Group</Text>
                </TouchableHighlight>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  groups: state.user.groups,
});
const mapDispatchToProps = (dispatch) => ({
  setGroup: (group, users) => dispatch(setGroup(group, users)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);

const styles = StyleSheet.create({
  listElementContainer: {
    backgroundColor: "#fff",
    alignItems: "flex-start",
    marginLeft: 20,
  },
  no: {
    alignItems: "center",
    padding: 15,
  },
  noGroups: {
    fontSize: 30,
    color: "#ED3B5B",
    marginBottom: 10,
    fontWeight: "700",
  },
  loginButton: {
    width: "70%",
    backgroundColor: "#ED3B5B",
    borderRadius: 45,
    marginTop: 20,
    alignContent: "center",
  },

  listText: {
    fontSize: 32,
    color: "#ED3B5B",
    padding: 15,
    textAlign: "left",
  },
  groupText: {
    fontSize: 40,
    color: "#ED3B5B",
    textAlign: "left",
    marginBottom: 20,
    width: "80%",
  },
  loginButton: {
    width: "70%",
    backgroundColor: "#ED3B5B",
    borderRadius: 45,
    marginTop: 20,
    alignContent: "center",
  },
  view: {
    width: "100%",
    backgroundColor: "blue",
    alignContent: "center",
    textAlign: "left",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 0,
  },

  loginButtonText: {
    fontSize: 25,
    color: "white",
    padding: 16,
    textAlign: "center",
  },

  borderBar: {
    width: "100%",
    borderBottomWidth: 1,
    backgroundColor: "#D7CBCB",
    borderColor: "#D7CBCB",
    marginTop: 10,
    height: 1,
  },
  headerText: {
    fontSize: 40,
    color: "#ED3B5B",
    textAlign: "left",
    fontWeight: "bold",
    paddingLeft: 20,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: "white",
    width: "100%",
  },
  header: {
    width: "100%",
  },
  centerButton: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
});
