import { StatusBar } from "expo-status-bar";
import React from "react";
import { connect } from "react-redux";
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
import { SafeAreaView } from "react-native";
import ImagePicker from "./ImagePicker";
import Banner2 from "./Banner2";
import { sendPhotoThunk } from "../../store/bill";

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
    const photo: any = await camera.takePictureAsync();
    console.log(photo);
    setPreviewVisible(true);
    setCapturedImage(photo);
  };

  const __savePhoto = () => {
    console.log(capturedImage, "this is the image!");
    let image = capturedImage.uri;
    props.sendPhoto(image);

    //thunkcreater (image)
    //axios. get ////api key image
    //navigate - bill view
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
            height: "200%",
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
          <ImagePicker />
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

const mapDispatchToProps = (dispatch) => ({
  sendPhoto: (photo) => dispatch(sendPhotoThunk(photo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cameras);

const CameraPreview = ({ photo, retakePicture, savePhoto }: any) => {
  console.log("sdsfds", photo);
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
