import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import * as Brightness from "expo-brightness";
import Cam from "./Cam";

export default function PaintReader() {
  const list = [
    6788, 6800, 6817, 6818, 6820, 6883, 6897, 6896, 6903, 6908, 6909, 6912,
    6967, 6971, 7034, 7053, 7109, 7110, 7112, 7113, 7114, 7534, 7577, 7602,
    7622, 7748, 7749, 9063, 9150,
  ];
  const [screenColor, setScreenColor] = useState("black");
  const [luv, setLuv] = useState([0, 0, 0]);
  const [rgb, setRgb] = useState([0, 0, 0]);
  const [readings, setReadings] = useState([]);
  const [round, setRound] = useState(10);
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
      takeReading(1);
    } else if (round < 8) {
      takeReading(0.5);
    } else if (round < 9) {
      takeReading(0);
    } else {
      setScreenColor("black");
      console.log(readings, list[readings.length / 9]);
    }
  }, [round]);
  const colors = ["white", "red", "green", "blue"];
  function takeReading(intensity) {
    flashScreen(colors[round % 4], intensity);
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
