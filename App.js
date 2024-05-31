import { Canvas } from "@shopify/react-native-skia";
import Cam from "./src/Cam";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  PermissionsPage,
  NoCameraDeviceError,
  requestPermission,
} from "react-native-vision-camera";
import { StyleSheet, View, Text } from "react-native";
import Temp from "./src/Temp";
import Driver from "./src/Driver";

export default function App() {
  return <Driver />;
}
