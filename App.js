import React, { useEffect, useState, useCallback } from "react";
import { View } from "react-native";
import { useCameraPermission } from "react-native-vision-camera";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, PoiretOne_400Regular } from "@expo-google-fonts/poiret-one";
import * as Brightness from "expo-brightness";
import Driver from "./src/Driver";
import LightBooth from "./src/LightBooth";
import Home from "./src/Home";
import SavedTemps from "./src/SavedTemps";
import PaintScan from "./src/PaintScan";
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [kelvin, setKelvin] = useState(5500);
  const [newRoom, setNewRoom] = useState(false);
  const [page, setPage] = React.useState("home");
  const { hasPermission, requestPermission } = useCameraPermission();
  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);
  useEffect(() => {
    (async () => {
      const { status } = await Brightness.requestPermissionsAsync();
    })();
  }, []);

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

  let [fontsLoaded] = useFonts({
    PoiretOne_400Regular,
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    console.log(page);
  }, [page]);
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {pages[page]}
    </View>
  );
}
