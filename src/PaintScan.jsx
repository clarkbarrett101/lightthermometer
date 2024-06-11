import Cam from "./Cam";
import { RGB2LUV } from "./RGB2LUV";
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
  const [stage, setStage] = useState(0);
  const [scanning, setScanning] = useState(false);
  Brightness.setBrightnessAsync(1);

  function flashScreen() {
    const colorValue = 255 * intensity;
    switch (color) {
      case "red":
        setScreenColor("rgb(${colorValue}, 0, 0)");
        break;
      case "green":
        setScreenColor("rgb(0, ${colorValue}, 0)");
        break;
      case "blue":
        setScreenColor("rgb(0, 0, ${colorValue})");
        break;
      case "white":
        setScreenColor("rgb(${colorValue}, ${colorValue}, ${colorValue})");
        break;
      default:
        setScreenColor("black");
        break;
    }
  }
  function takeLowReading() {
    setLowReading(luv[0]);
  }
  function takeHighReading() {
    const reading = {
      color: screenColor,
      low: lowReading,
      high: luv[0],
    };
    return reading;
  }

  function calculateRedLux(reading) {
    const deltaLux = reading.high - reading.low;
    let redLux = deltaLux / fullLux;
    redLux /= 0.299;
    setRedLux(redLux);
  }
  function calculateGreenLux(reading) {
    const deltaLux = reading.high - reading.low;
    let greenLux = deltaLux / fullLux;
    greenLux /= 0.587;
    setGreenLux(greenLux);
  }
  function calculateBlueLux(reading) {
    const deltaLux = reading.high - reading.low;
    let blueLux = deltaLux / fullLux;
    blueLux /= 0.114;
    setBlueLux(blueLux);
  }
  function calculateFullLux(reading) {
    const deltaLux = reading.high - reading.low;
    setFullLux(deltaLux);
  }
  function calculateUV() {
    const sum = redLux + greenLux + blueLux;
    const [r, g, b] = [redLux / sum, greenLux / sum, blueLux / sum];
    const [l, u, v] = RGB2LUV([r, g, b]);
    setUvResult([u, v]);
  }
  useEffect(() => {
    if (scanning) {
      setInterval(() => {
        switch (stage) {
          case 0:
            setScreenColor("yellow");
            setStage(1);
            break;
          case 1:
            setStage(2);
            break;
          case 2:
            setStage(3);
            break;
          case 3:
            setStage(4);
            break;
          case 4:
            setStage(5);
            break;
          case 5:
            setStage(6);
            break;
          case 6:
            setStage(7);
            break;
          case 7:
            flashScreen(0.5);
            setStage(1);
            break;
          case 8:
            takeLowReading();
            flashScreen();
            setStage(2);
            break;
          case 9:
            calculateFullLux(takeHighReading());
            flashScreen("red", 0.5);
            setStage(3);
            break;
          case 10:
            takeLowReading();
            flashScreen("red", 1);
            setStage(4);
            break;
          case 11:
            calculateRedLux(takeHighReading());
            flashScreen("green", 0.5);
            setStage(5);
            break;
          case 12:
            takeLowReading();
            flashScreen("green", 1);
            setStage(6);
            break;
          case 13:
            takeHighReading(takeHighReading());
            flashScreen("blue", 0.5);
            setStage(7);
            break;
          case 14:
            takeLowReading();
            flashScreen("blue", 1);
            setStage(8);
            break;
          case 15:
            calculateBlueLux(takeHighReading());
            calculateUV();
            setScanning(false);
            break;
          default:
            setScanning(false);
            break;
        }
      }, 200);
    } else {
      setScreenColor("black");
      setStage(0);
    }
  }, [scanning]);
  useEffect(() => {
    console.log(uvResult);
  }, [uvResult]);
  useEffect(() => {
    console.log(stage);
  }, [stage]);
  function startScan() {
    console.log("start scan");
    setScanning(true);
  }
  return (
    <>
      <TouchableOpacity onPressIn={() => startScan}>
        <View
          style={{
            backgroundColor: screenColor,
            zIndex: 10,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      </TouchableOpacity>
      <Cam luv={luv} setLuv={setLuv} setRgb={setRgb} />
    </>
  );
}
