import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [text, setText] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const textFalse = 'its false';
  const textTrue = 'its true';
  
  return (
    <View style={styles.container}>
      <Text onPress={()=> {
        setText(!text);
        setCount(count + 1);
      }}>{text ? 
        <Text style={styles.textTrue}>{textTrue}</Text> 
        : 
        <Text style={styles.textFalse}>{textFalse}</Text>
      } + times pressed: {count}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTrue: {
    fontSize: 20,
    backgroundColor: 'purple',
  },
  textFalse: {
    fontSize: 30,
    backgroundColor: 'orange',
  }
});
