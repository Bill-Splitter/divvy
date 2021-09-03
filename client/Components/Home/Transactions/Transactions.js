import React, { useEffect, useState } from "react";
import TransactionItem from "./TransactionItem";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Banner2 from "../Banner2";
import { fetchBillsThunk } from "../../../store/bill";
import { FontAwesome5 } from "@expo/vector-icons";
import { deleteTransactionThunk } from "../../../store/bill";

export default Transactions = () => {
  const dispatch = useDispatch();
  const bills = useSelector((state) => state.bill.bills || []);
  const user = useSelector((state) => state.user.id);

  const [selected, setSelected] = React.useState("complete");
  const [mounted, setMounted] = useState(false);

  if (!mounted) dispatch(fetchBillsThunk(user));

  useEffect(() => {
    setMounted(true);
  }, []);

  const deleteItem = (id) => {
    dispatch(deleteTransactionThunk(id));
  };

  const items = bills.reverse();
  let complete = bills
    .filter((element) => {
      if (element.completed) return element;
    })
    .slice()
    .sort((a, b) => b.date - a.date);
  let open = bills
    .filter((element) => {
      if (!element.completed) return element;
    })
    .slice()
    .sort((a, b) => b.date - a.date);

  return (
    <View style={{ flex: 0, backgroundColor: "white", height: "100%" }}>
      <Banner2 name={"Transactions"} />

      {selected === "complete" ? (
        <View style={styles.selection}>
          <TouchableHighlight style={styles.option}>
            <Text style={styles.text}>Completed</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.option2}
            onPress={() => setSelected("open")}
            underlayColor={"#e8647c"}
          >
            <Text style={styles.text}>Open</Text>
          </TouchableHighlight>
        </View>
      ) : (
        <View style={styles.selection}>
          <TouchableHighlight
            style={styles.option2}
            onPress={() => setSelected("complete")}
            underlayColor={"#e8647c"}
          >
            <Text style={styles.text}>Completed</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.option}>
            <Text style={styles.text}>Open</Text>
          </TouchableHighlight>
        </View>
      )}
      {selected === "complete" ? (
        <Text style={{width: "200%"}}>
          {items.length > 0 ? (
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={complete}
       
              renderItem={(item) => {
                return (
                  <TransactionItem
                    data={item}
                    handleDelete={() => deleteItem(item.item.id)}
                  />
                );
              }}
              // ItemSeparatorComponent={() => {
              //   return <View style={styles.seperatorLine}></View>;
              // }}
            />
          ) : (
            <View style={{ alignItems: "center", padding: 10 }}>
              <FontAwesome5 name="shopping-bag" size={50} color="#ED3B5B" />
              <Text style={styles.text}>No Transactions Yet</Text>
            </View>
          )}
        </Text>
      ) : (
        <Text>
        
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={open}
            renderItem={(item) => {
              return (
                <TransactionItem
                  data={item}
                  handleDelete={() => deleteItem(item.item.id)}
                />
              );
            }}
            // ItemSeparatorComponent={() => {
            //   return <View style={styles.seperatorLine}></View>;
            // }}
          />
          ) : (
          <View style={{ alignItems: "center", padding: 10 }}>
            <FontAwesome5 name="shopping-bag" size={50} color="#ED3B5B" />
            <Text style={styles.text}>No Open Bills</Text>
          </View>
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  seperatorLine: {
    height: 2,
    backgroundColor: "pink",
    width: "200%"
  },

  text: {
    padding: 10,
    textAlign: "center",
    color: "#ED3B5B",
    fontSize: 20,
  },
  option: {
    width: "50%",
    alignItems: "center",
    backgroundColor: "#e64c67",
  },
  option2: {
    width: "50%",
    alignItems: "center",
    backgroundColor: "#e8647c",
  },
  selection: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  text: {
    color: "white",
    padding: 15,
  },
});
