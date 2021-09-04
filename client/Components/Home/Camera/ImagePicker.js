import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function App() {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage(pickerResult.uri);
  };

  if (selectedImage !== null) {
    //navigation.navigate("ItemizedSplitCreation", {image: selectedImage});
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage }}
          style={styles.thumbnail}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: "https://i.imgur.com/TkIrScD.png" }}
        style={styles.logo}
      />

      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Upload Photo</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.08,
    color: "#ED3B5B",
    backgroundColor: "#ED3B5B",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    height: 50,
    margin: 12,
    borderWidth: 2,
    borderColor: "#ED3B5B",
    padding: 10,
    width: "95%",
    borderRadius: 999,
    paddingLeft: 20,
  },
  buttonText: {
    fontSize: 25,
    color: "white",
    textAlign: "center",
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  button: {
    width: "60%",
  },
});
