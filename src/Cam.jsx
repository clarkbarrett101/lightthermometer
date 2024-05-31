import { useEffect, useState, useRef } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  PermissionsPage,
  NoCameraDeviceError,
} from "react-native-vision-camera";

function Cam({ photo, setPhoto, camera }) {
  const device = useCameraDevice("front");
  const [hideCamera, setHideCamera] = useState(false);
  const { hasPermission } = useCameraPermission();

  // if (!hasPermission) return <PermissionsPage />;
  //  if (device == null) return <NoCameraDeviceError />;

  return (
    <>
      <Camera
        style={{
          height: "50%",
          position: "absolute",
          width: "100%",
          top: 0,
          zIndex: -1,
        }}
        video={true}
        device={device}
        isActive={true}
        ref={camera}
      />
    </>
  );
}
export default Cam;
