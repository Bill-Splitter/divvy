import { StatusBar } from "expo-status-bar";
import React from "react";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
} from "react-native";

import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native";
//import ImagePicker from "./ImagePicker";
import Banner2 from "../Banner2";

let camera: Camera;
const Cameras = (props) => {
  // add to 'newsplit function at profile component
  const [startCamera, setStartCamera] = React.useState(false);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [capturedImage, setCapturedImage] = React.useState(null);
  const [cameraType, setCameraType] = React.useState(
    Camera.Constants.Type.back
  );
  const [flashMode, setFlashMode] = React.useState("off");
  const navigation = useNavigation();

  const __startCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    console.log(status);
    if (status === "granted") {
      setStartCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  };

  const __takePicture = async () => {
    const photo: any = await camera.takePictureAsync({quality: 0.1, base64: true});
    setPreviewVisible(true);
    setCapturedImage(photo);
  };

  const __savePhoto = () => {
    console.log('image size: ', capturedImage.base64.length);
    const Image_Http_URL = {uri: 'data:image/jpg;base64,' + capturedImage.base64};
    //then send that string/text to ItemizedSplitCreation as props
    navigation.navigate("ItemizedSplitCreation", {image: Image_Http_URL});
  };

  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    __startCamera();
  };

  const __handleFlashMode = () => {
    if (flashMode === "on") {
      setFlashMode("off");
    } else if (flashMode === "off") {
      setFlashMode("on");
    } else {
      setFlashMode("auto");
    }
  };
  
  const openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.1,
      base64: true,
    });
    
    console.log(pickerResult)
    
    if (!pickerResult.cancelled) {
      setPreviewVisible(true);
      setCapturedImage(pickerResult);
    }
  };

  __startCamera();

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#fff",
        height: "100%",
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Banner2 />
      {startCamera ? (
        <View
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            padding: 0,
            marginTop: -100,
            justifyContent: "space-between",
            backgroundColor: "#fff",
          }}
        >
          {previewVisible && capturedImage ? (
            <CameraPreview
              photo={capturedImage}
              savePhoto={__savePhoto}
              retakePicture={__retakePicture}
              style={{ flex: 1 }}
            />
          ) : (
            <Camera
              type={"back"}
              flashMode={flashMode}
              style={{ flex: 1 }}
              ref={(r) => {
                camera = r;
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "transparent",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    left: "5%",
                    top: "10%",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    onPress={__handleFlashMode}
                    style={{
                      backgroundColor: flashMode === "off" ? "#000" : "#fff",
                      borderRadius: "50%",
                      height: 25,
                      width: 25,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                      }}
                    >
                      {/* ⚡️ */}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    flexDirection: "row",
                    flex: 1,
                    width: "100%",
                    padding: 20,
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      alignSelf: "center",
                      flex: 1,
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={__takePicture}
                      style={{
                        width: 70,
                        height: 70,
                        bottom: 0,
                        borderRadius: 50,
                        backgroundColor: "#fff",
                      }}
                    />
                  </View>
                </View>
              </View>
            </Camera>
          )}
          <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
              <Text style={styles.buttonText}>Upload Photo</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      ) : (
        <View>
          <Text> Camera Perms failed </Text>
        </View>
      )}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  bill: state.bill,
});

export default connect(mapStateToProps)(Cameras);

const CameraPreview = ({ photo, retakePicture, savePhoto }: any) => {
  return (
    <View
      style={{
        backgroundColor: "transparent",
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            padding: 15,
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={retakePicture}
              style={{
                width: 130,
                height: 40,

                alignItems: "center",
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                }}
              >
                Re-take
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={savePhoto}
              style={{
                width: 130,
                height: 40,

                alignItems: "center",
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                }}
              >
                save photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

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
