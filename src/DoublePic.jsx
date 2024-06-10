import React, { useEffect, useState, useRef, useCallback } from "react";
import { View, TouchableWithoutFeedback, Image } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function DoublePic() {
  const cameraRef = useRef();
  const [countdown, setCountdown] = useState(5);
  const [screenColor, setScreenColor] = useState("black");
  const [startCountdown, setStartCountdown] = useState(false);
  const [photo1, setPhoto1] = useState(null);
  const [photo2, setPhoto2] = useState(null);
  const [permission, requestPermission] = useCameraPermissions();
  function pictures() {
    if (photo1 && photo2) {
      return (
        <View>
          <Image source={{ uri: photo1 }} style={{ width: 100, height: 100 }} />
          <Image source={{ uri: photo2 }} style={{ width: 100, height: 100 }} />
        </View>
      );
    } else {
      return (
        <View
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 10,
            backgroundColor: photo1 ? "white" : "black",
          }}
        />
      );
    }
  }
  const takePhoto = useCallback(async () => {
    console.log("taking photo");
    const photo = await cameraRef.current.takePictureAsync();
    console.log(photo.path);
    if (!photo1) {
      setPhoto1(photo.uri);
    } else {
      setPhoto2(photo.uri);
    }
  }, [photo1, photo2, cameraRef]);

  return (
    <>
      <TouchableWithoutFeedback
        onPressIn={() => {
          console.log("taking photo");
          takePhoto();
        }}
      >
        {pictures()}
      </TouchableWithoutFeedback>
      <CameraView
        ref={cameraRef}
        facing="front"
        style={{ width: 100, height: 100 }}
      />
    </>
  );
}
