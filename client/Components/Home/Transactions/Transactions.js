import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import Banner2 from "../Banner2";
import { fetchBillsThunk } from "../../../store/bill";

export default Transactions = () => {
  const dispatch = useDispatch()

  const bills = useSelector((state) => state.bill.bills || [])
  const user = useSelector((state) => state.user.id)
  dispatch(fetchBillsThunk(user))


  console.log("the bills", bills)


  return (
    <View style={{ flex: 0, backgroundColor: "white", height: "100%" }}>
      <Banner2 name={'Transactions'}/>
      <Text>Transactions</Text>
    </View>
  );
};
