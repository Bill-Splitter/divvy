// import React, { useState } from "react";
// import { connect } from "react-redux";
// import { useNavigation } from "@react-navigation/native";
// import { setGroup } from "../../../store/split";
// import CreateGroup from "./CreateGroup";
// import { Connect } from "react-redux";
// import MultiSelect from "react-native-multiple-select";

// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   TouchableHighlight,
//   TextInput,
//   ScrollView,
// } from "react-native";
// import { AntDesign } from "@expo/vector-icons";
// import Banner2 from "../Banner2";

// class CreateGroups extends React.Component {
//   //   constructor(props) {
//   //     super(props);
//   //     this.state = {
//   //       selectedItems: [],
//   //     };

//   state = {
//     selectedItems: [],
//   };
//   //   }

//   onSelectedItemsChange = (selectedItems) => {
//     this.setState({ selectedItems });
//   };

//   render() {
//     //const items = this.props.friends || [];
//     const { selectedItems } = this.state;
// const items = [
//   {
//     id: "92iijs7yta",
//     name: "Ondo",
//   },
//   {
//     id: "a0s0a8ssbsd",
//     name: "Ogun",
//   },
//   {
//     id: "16hbajsabsd",
//     name: "Calabar",
//   },
//   {
//     id: "nahs75a5sg",
//     name: "Lagos",
//   },
//       {
//         id: "667atsas",
//         name: "Maiduguri",
//       },
//       {
//         id: "hsyasajs",
//         name: "Anambra",
//       },
//       {
//         id: "djsjudksjd",
//         name: "Benue",
//       },
//       {
//         id: "sdhyaysdj",
//         name: "Kaduna",
//       },
//       {
//         id: "suudydjsjd",
//         name: "Abuja",
//       },
//       {
//         id: "hsyajiiksajs",
//         name: "Anjkambra",
//       },
//       {
//         id: "djsjjkjiiudksjd",
//         name: "Bejknue",
//       },
//       {
//         id: "sdhyjiikjaysdj",
//         name: "Kadjkjuna",
//       },
//       {
//         id: "suudjkjydjsjd",
//         name: "Ajkbuja",
//       },
//     ];

//     return (
//       <View style={{ flex: 0, backgroundColor: "white", height: "100%" }}>
//         <Banner2 name={"Create Group"} />
//         <MultiSelect
//           // hideTags
//           items={items}
//           uniqueKey="id"
//           ref={(component) => {
//             this.multiSelect = component;
//           }}
//           onSelectedItemsChange={this.onSelectedItemsChange}
//           selectedItems={selectedItems}
//           selectText="Add friends to a group"
//           searchInputPlaceholderText="Search Items..."
//           onChangeInput={(text) => console.log(text)}
//           tagRemoveIconColor="#CCC"
//           searchInputStyle={{ height: 60, fontSize: 30 }}
//           styleInputGroup={{ height: 60, fontSize: 30 }} //this is the box with the input
//           tagBorderColor="#CCC"
//           tagTextColor="#CCC"
//           selectedItemTextColor="#CCC"
//           selectedItemIconColor="#CCC"
//           fontSize={24}
//           itemTextColor="#ED3B5B"
//           styleTextDropdown={{
//             height: 60,
//             fontSize: 30,
//           }}
//           itemFontSize={28}
//           styleDropdownMenu={{ backgroundColor: "yellow" }}
//           styleListContainer={{ backgroundColor: "white" }}
//           styleMainWrapper={{ height: "90%", backgroundColor: "white" }}
//           displayKey="name"
//           fixedHeight="80%"
//           searchInputStyle={{ color: "#OOO" }}
//           submitButtonColor="#3bedac"
//           submitButtonText="Submit"
//           styleSelectorContainer={{ height: "100%" }}
//         />
//       </View>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   friends: state.user.friend;
// };

// const mapDispatchToProps = (dispatch) => {};

// export default CreateGroups;
