import Cam from "./Cam";
import RGB2LUV from "./RGB2LUV";
import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import * as Brightness from "expo-brightness";

export default function PaintScan() {
  const [screenColor, setScreenColor] = useState("black");
  const [luv, setLuv] = useState([0, 0, 0]);
  const [rgb, setRgb] = useState([0, 0, 0]);
  const [lowReading, setLowReading] = useState(0);
  const [fullLux, setFullLux] = useState(0);
  const [redLux, setRedLux] = useState(0);
  const [greenLux, setGreenLux] = useState(0);
  const [blueLux, setBlueLux] = useState(0);
  const [uvResult, setUvResult] = useState([0, 0]);
  const [readings, setReadings] = useState([]);
  const [stage, setStage] = useState(0);
  const [scanning, setScanning] = useState(false);
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
  function takeLowReading() {
    setLowReading(luv[0]);
  }
  function takeHighReading() {
    let lux = luv[0] - lowReading;
    const reading = [screenColor, lux];
    return reading;
  }

  function calculateRedLux(reading) {
    const deltaLux = reading[1];
    let redLux = deltaLux / fullLux;
    redLux /= 0.299;
    setRedLux(redLux);
  }
  function calculateGreenLux(reading) {
    const deltaLux = reading[1];
    let greenLux = deltaLux / fullLux;
    greenLux /= 0.587;
    setGreenLux(greenLux);
  }
  function calculateBlueLux(reading) {
    const deltaLux = reading[1];
    let blueLux = deltaLux / fullLux;
    blueLux /= 0.114;
    setBlueLux(blueLux);
  }
  function calculateFullLux(reading) {
    const deltaLux = reading[1];
    setFullLux(deltaLux);
  }
  function calculateUV() {
    const sum = redLux + greenLux + blueLux;
    let [r, g, b] = [redLux / sum, greenLux / sum, blueLux / sum];
    let [l, u, v] = RGB2LUV([r, g, b]);
    console.log(redLux, greenLux, blueLux);
    u++;
    v++;
    u /= 2;
    v /= 2;
    u *= 255;
    v *= 255;
    u = Math.round(u);
    v = Math.round(v);
    setUvResult([u, v]);
  }
  useEffect(() => {
    const interval = setInterval(() => {
      if (scanning) {
        setStage((prev) => prev + 1);
      }
    }, 200);
    return () => {
      clearInterval(interval);
    };
  }, [scanning]);
  useEffect(() => {
    console.log(uvResult);
  }, [uvResult]);
  useEffect(() => {
    if (stage < 7) {
      setScreenColor("yellow");
    } else if (stage < 8) {
      flashScreen(0.5);
    } else if (stage < 9) {
      takeLowReading();
      flashScreen();
    } else if (stage < 10) {
      calculateFullLux(takeHighReading());
      flashScreen("red", 0.5);
    } else if (stage < 11) {
      takeLowReading();
      flashScreen("red", 1);
    } else if (stage < 12) {
      calculateRedLux(takeHighReading());
      flashScreen("green", 0.5);
    } else if (stage < 13) {
      takeLowReading();
      flashScreen("green", 1);
    } else if (stage < 14) {
      calculateGreenLux(takeHighReading());
      flashScreen("blue", 0.5);
    } else if (stage < 15) {
      takeLowReading();
      flashScreen("blue", 1);
    } else {
      calculateBlueLux(takeHighReading());
      calculateUV();
      setStage(0);
      setReadings([]);
      setBlueLux(0);
      setGreenLux(0);
      setRedLux(0);
      setFullLux(0);
      setLowReading(0);
      setScanning(false);
    }
  }, [stage]);
  function startScan() {
    console.log("start scan");

    setScanning(true);
  }
  return (
    <>
      <TouchableOpacity onPressIn={() => startScan()} style={{ flex: 1 }}>
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
