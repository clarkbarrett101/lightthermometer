import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import * as Brightness from "expo-brightness";
import Cam from "./Cam";

export default function PaintReader() {
  const [screenColor, setScreenColor] = useState("black");
  const [luv, setLuv] = useState([0, 0, 0]);
  const [rgb, setRgb] = useState([0, 0, 0]);
  const [readings, setReadings] = useState([]);
  const [round, setRound] = useState(5);
  Brightness.setBrightnessAsync(1);
  function flashScreen(color = "white", intensity = 1) {
    let [r, g, b] =
      color === "white"
        ? [255, 255, 255]
        : color === "red"
        ? [255, 0, 0]
        : color === "green"
        ? [0, 255, 0]
        : color === "blue"
        ? [0, 0, 255]
        : [0, 0, 0];
    r *= intensity;
    g *= intensity;
    b *= intensity;
    setScreenColor(`rgb(${r},${g},${b})`);
  }
  useEffect(() => {
    if (round < 4) {
      takeReading();
    } else {
      flashScreen("black", 1);
      console.log(readings);
    }
  }, [round]);
  const colors = ["white", "red", "green", "blue"];
  function takeReading() {
    flashScreen(colors[round], 1);
    setTimeout(
      () => {
        const reading = [round, rgb[0], rgb[1], rgb[2]];
        for (let i = 0; i < 3; i++) {
          reading[i + 1] = Math.round(reading[i + 1] * 100) / 100;
        }
        setReadings([...readings, reading]);
        setRound(round + 1);
      },
      round == 0 ? 700 : 300
    );
  }
  return (
    <>
      <TouchableOpacity onPressIn={() => setRound(0)} style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: screenColor,
            flex: 1,
          }}
        />
      </TouchableOpacity>
      <Cam luv={luv} setLuv={setLuv} setRgb={setRgb} />
    </>
  );
}
