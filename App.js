import { useCameraPermission } from "react-native-vision-camera";
import { useState } from "react";
import Driver from "./src/Driver";
import * as Brightness from "expo-brightness";
import React, { useEffect } from "react";
import LightBooth from "./src/LightBooth";
import { useFonts, PoiretOne_400Regular } from "@expo-google-fonts/poiret-one";
import Home from "./src/Home";
import SavedTemps from "./src/SavedTemps";

export default function App() {
  const [kelvin, setKelvin] = useState(5500);
  const [newRoom, setNewRoom] = useState(false);
  const [page, setPage] = React.useState("home");
  const pages = {
    home: <Home setPage={setPage} />,
    driver: <Driver setPage={setPage} kelvin={kelvin} setKelvin={setKelvin} />,
    lightBooth: (
      <LightBooth
        setPage={setPage}
        kelvin={kelvin}
        setKelvin={setKelvin}
        setNewRoom={setNewRoom}
      />
    ),
    savedTemps: (
      <SavedTemps
        setPage={setPage}
        kelvin={kelvin}
        setKelvin={setKelvin}
        newRoom={newRoom}
        setNewRoom={setNewRoom}
      />
    ),
  };
  const { hasPermission, requestPermission } = useCameraPermission();
  let [fontsLoaded] = useFonts({
    PoiretOne_400Regular,
  });
  useEffect(() => {
    if (!fontsLoaded) {
      return;
    }
  }, [fontsLoaded]);

  useEffect(() => {
    (async () => {
      const { status } = await Brightness.requestPermissionsAsync();
      if (status === "granted") {
        Brightness.setSystemBrightnessAsync(0.5);
      }
    })();
  }, []);
  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);
  useEffect(() => {
    console.log(page);
  }, [page]);

  return pages[page];
}
