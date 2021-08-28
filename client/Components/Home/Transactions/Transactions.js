import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import TransactionItem from "./TransactionItem";

import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import Banner2 from "../Banner2";
import { fetchBillsThunk } from "../../../store/bill";
import { FontAwesome5 } from '@expo/vector-icons';

export default Transactions = () => {
  const dispatch = useDispatch();
  const bills = useSelector((state) => state.bill.bills || []);
  const user = useSelector((state) => state.user.id);
  const [mounted, setMounted] = useState(false);

  if (!mounted) dispatch(fetchBillsThunk(user));

  useEffect(() => {
    setMounted(true);
  }, []);

  const items = bills.reverse();

  return (
    <View style={{ flex: 0, backgroundColor: "white", height: "100%" }}>
      <Banner2 name={"Transactions"} />
      {items.length > 0 ? (
        <FlatList
          keyExtractor={(item, index) => item.id.toString()}
          data={items}
          renderItem={(item) => {
            return <TransactionItem data={item} />;
          }}
          ItemSeparatorComponent={() => {
            return <View style={styles.seperatorLine}></View>;
          }}
        />
      ) : (
        <View style={{alignItems: "center", padding: 10}}>
        <FontAwesome5 name="shopping-bag" size={50} color="#ED3B5B" />
          <Text style={styles.text}>No Transactions Yet</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  seperatorLine: {
    height: 2,
    backgroundColor: "pink",
  },

  text: {
    padding: 10,
    textAlign: "center",
    color: "#ED3B5B",
    fontSize: 20,
  },
});
