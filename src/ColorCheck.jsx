import React, { useEffect, useState } from "react";
import {
  Touchable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import * as Brightness from "expo-brightness";
import Cam from "./Cam";
import RGB2LUV from "./RGB2LUV";

export default function ColorCheck() {
  const [screenRGB, setScreenRGB] = useState([255, 225, 180]);
  const [round, setRound] = useState(0);
  const colors = [
    [255, 0, 0],
    [0, 255, 0],
    [0, 0, 255],
    [0, 0, 0],
  ];
  const [luv, setLuv] = useState([0, 0, 0]);
  const [rgb, setRgb] = useState([0, 0, 0]);
  const [readings, setReadings] = useState([]);
  Brightness.setBrightnessAsync(1);
  function rgbstring(rgb) {
    return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
  }
  function normalizeRGB(rgb) {
    const max = Math.max(...rgb);
    return [rgb[0] / max, rgb[1] / max, rgb[2] / max];
  }
  /*
  useEffect(() => {
    setTimeout(() => {
      if (round > 0 && round < 4) {
        setReadings([...readings, Math.round(rgb[round - 1])]);
      }
      if (round < 4) {
        setScreenRGB(colors[round]);
        setRound((round) => round + 1);
      } else {
        let read = [rgb[0], rgb[1], rgb[2]];
        let diffR = readings[0] - read[0];
        let diffG = readings[1] - read[1];
        let diffB = readings[2] - read[2];
        let max = Math.max(diffR, diffG, diffB);
        let percent = [
          Math.round((diffR / max) * 100),
          Math.round((diffG / max) * 100),
          Math.round((diffB / max) * 100),
        ];
        console.log(percent);
      }
    }, 200);
    }, [screenRGB]);
*/
  function handleOnPress() {
    setTimeout(() => {
      const reading = [
        Math.round(rgb[0]),
        Math.round(rgb[1]),
        Math.round(rgb[2]),
      ];
      setReadings([...readings, reading]);
      console.log(readings);
    }, 1000);
  }
  function percentArray(arr) {
    const sum = arr.reduce((a, b) => a + b, 0);
    return arr.map((x) => (x / sum) * 100);
  }

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => handleOnPress()}
    >
      <View style={{ backgroundColor: rgbstring(screenRGB), flex: 1 }}>
        <Cam setLuv={setLuv} setRgb={setRgb} />
      </View>
    </TouchableWithoutFeedback>
  );
}
