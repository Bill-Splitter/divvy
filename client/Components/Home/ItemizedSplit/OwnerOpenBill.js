/*
see figma for visual reference:
    1) get bill picture, done
     
    2) poll bill at set interval to see if payees sent updates to the parsed bill
    
    3) when all payees added to bill have submitted their payment, show Next button
    
    4) next button sends you to ItemizedSummary view
*/
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { fetchBillThunk, fetchParsedBillThunk, completeBillThunk } from "../../../store/bill";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import Banner2 from "../Banner2";

const adder = (total, num) => {
  return total + num;
};

const OwnerOpenBill = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const bill = useSelector((state) => state.bill.bill || []);
  const parsedBill = useSelector((state) => state.bill.parsedBill || []);
  const user = useSelector((state) => state.user);
  const { allFriendsPaid, setAllFriendsPaid } = useState(false);
  const [mounted, setMounted] = useState(false);
  const userAmounts = parsedBill.userAmounts;
  
  //add logic to use route.params info when it exists, otherwise state data
  // let billInfo, groupFriends, name, total, image;
  // if(route.params.billInfo){
  //   console.log();
  // }
  
  //loads bill into state on load
  //... wait, cant we just use the bill findByPk??
  console.log('props.data: ', props.data);
  console.log('route.params.data: ', route.params);
  if (!mounted){
    console.log('(mounted) props.data: ', props.data);
    console.log('(mounted) route.params.data: ', route.params);
    //dispatch(fetchBillThunk(route.params.data)); 
    //dispatch(fetchParsedBillThunk(route.params.data));
  }

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const checkAllFriendsPaid = () => {
    //checks if all friends paid
    if(bill){
      let allFriendsPaidTemp = true;
      
      bill.owes.forEach((payee) => {
        if(!userAmounts.hasOwnProperty(payee.id)){
          allFriendsPaidTemp = false;
        }
      });
      
      if(allFriendsPaidTemp){
        setAllFriendsPaid(true);
      }  
    }
  }
  
  //only clickable if allFriendsPaid == true
  const clickSubmit = () => {
    //props.submit(event, parsedBill);
    navigation.navigate("ProfilePage");
  };
  
  //console.log('route: ', route);
  //console.log('navigation: ', navigation);
  
  if(false){
    return (
      <View style={{ backgroundColor: "white", height: "95%" }}>
        <Banner2 name='Awaiting Payment' home={true}/>
        <View style={styles.view}>
          <Image source={route.params.image ? (route.params.bill.image) : ({uri: bill.image})} style={{
            flex: 20, 
            width: "100%", 
            height: "100%", 
            resizeMode : 'contain',
            }} 
          />
          <View style={styles.textFields}>
            <ScrollView style={{ display: "flex", flex: 6, width: "100%", height: "100%", minHeight: 38}}>
            {Object.values(bill.owes).length ? 
              (Object.values(bill.owes).map((friend) => {
                return (
                  <View style={styles.textRow}>
                    <Text
                      style={styles.listText}
                      key={friend.username}
                      onPress={() =>
                        console.log("change friend's total to show each line item")
                      }
                    >
                      {userAmounts.hasOwnProperty(friend.id) ? 
                        (`${friend.fName} ${friend.lName}: $${userAmounts[friend.id].reduce(adder)}`
                        ) : ( 
                        `${friend.fName} ${friend.lName}: none yet`)
                      }
                    </Text>
                  </View>
                );
              })) : (
                <View style={styles.textRow}>
                  <Text style={styles.listText}>
                    No Friend Data Recieved
                  </Text>
                </View>
              )
            }
            </ScrollView>
            <View style={styles.statusField}>
              <Text 
                style={styles.paymentStatus} 
                AccessibilityRole={'summary'}
                numberOfLines={1}
                suppressHighlighting={true}
                onPress={() => console.log('resendTextPromptToAll()')}
              >
                Awaiting Group Payments...
              </Text>
            </View>
          </View>
          {/*
          uncomment when logic for hiding until all payments recieved is done
          <TouchableHighlight
            style={styles.loginButton}
            onPress={() => clickSubmit()}
          >
            <Text style={styles.loginButtonText}>Select Group</Text>
          </TouchableHighlight>
          */}
        </View>
      </View>
    );
  } else {
    return (
      <View style={{ backgroundColor: "white", height: "95%" }}>
        <Banner2 name='Awaiting Payment' home={true}/>
      </View> 
    );
  }
};

export default OwnerOpenBill;

const styles = StyleSheet.create({
  view: {
    height: "100%",
    display: 'flex',
    backgroundColor: "#6e6e6e",
    justifyContent: 'flex-start',
    alignContent: "center",
    textAlign: "left",
    alignItems: "center",
    top: 0,
    bottom: 55,
  },
  textFields: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flex: 9,
    paddingTop: 5,
  },
  textRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
    height: "100%",
    flex: 8,
    bottom: 8
  },
  listText: {
    fontSize: 26,
    color: "black",
    padding: 5,
    textAlign: "left",
  },
  statusField: {
    backgroundColor: "black",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  paymentStatus: {
    textAlign: "center",
    fontSize: 16,
    color: "#ababab",
    width: '100%',
    top: 7,
  },
  loginButton: {
    width: "50%",
    // backgroundColor: "#3bedac",
    backgroundColor: "#ED3B5B",
    // backgroundColor: "#32d197",
    borderRadius: 45,
    marginTop: 10,
  },
  loginButtonText: {
    fontSize: 20,
    color: "white",
    padding: 10,
    textAlign: "center",
  },
});