import { useEffect, useState } from "react";
import * as Brightness from "expo-brightness";
import CountDown from "./CountDown";
import Cam from "./Cam";
import { View, TouchableOpacity } from "react-native";
import { kelvin_table } from "./Kelvin_Table";
import RGB2LUV from "./RGB2LUV";

export default function FindUV() {
  const [luv, setLuv] = useState([0, 0, 0]);
  const [rgb, setRgb] = useState([0, 0, 0]);
  const [screenRGB, setScreenRGB] = useState([0, 0, 0]);
  const [flicker, setFlicker] = useState(false);
  const [startCountdown, setStartCountdown] = useState(false);
  const [round, setRound] = useState(0);
  const [control, setControl] = useState(null);
  const [recheck, setRecheck] = useState(false);
  const kel = kelvin_table[5500];
  useEffect(() => {
    (async () => {
      const { status } = await Brightness.requestPermissionsAsync();
      if (status === "granted") {
        Brightness.setSystemBrightnessAsync(1);
      }
    })();
  }, []);
  function rgbstring(rgb) {
    return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
  }
  function getRGBBalance(rgb) {
    while (rgb[0] < 0 || rgb[1] < 0 || rgb[2] < 0) {
      if (rgb[0] < 0) {
        rgb[1] += rgb[0];
        rgb[2] += rgb[0];
      }
      if (rgb[1] < 0) {
        rgb[0] += rgb[1];
        rgb[2] += rgb[1];
      }
      if (rgb[2] < 0) {
        rgb[0] += rgb[2];
        rgb[1] += rgb[2];
      }
    }
    const sum = rgb[0] + rgb[1] + rgb[2];
    return [rgb[0] / sum, rgb[1] / sum, rgb[2] / sum];
  }
  function maximizeRGB(rgb) {
    const max = Math.max(...rgb);
    return [rgb[0] / max, rgb[1] / max, rgb[2] / max];
  }
  useEffect(() => {
    if (flicker) {
      setTimeout(() => {
        if (round === 0) {
          setScreenRGB([0, 0, 0]);
          const b = getRGBBalance(rgb);
          setControl(b);
          console.log(
            round,
            Math.round(b[0] * 255),
            Math.round(b[1] * 255),
            Math.round(b[2] * 255)
          );
          setRound(1);
        } else if (round === 1) {
          setScreenRGB([255, 255, 255]);
          setRound(2);
        } else {
          setRound((prev) => prev + 1);
          const reading = getRGBBalance(rgb);
          console.log(
            round,
            Math.round(reading[0] * 255),
            Math.round(reading[1] * 255),
            Math.round(reading[2] * 255)
          );
          let rDiff = control[0] - reading[0];
          let gDiff = control[1] - reading[1];
          let bDiff = control[2] - reading[2];
          console.log(
            round,
            Math.round(rDiff * 255),
            Math.round(gDiff * 255),
            Math.round(bDiff * 255)
          );
          let rgbDiff = Math.sqrt(
            rDiff * rDiff + gDiff * gDiff + bDiff * bDiff
          );
          let currentBalance = getRGBBalance(screenRGB);
          let newBalance = [
            rDiff + currentBalance[0],
            gDiff + currentBalance[1],
            bDiff + currentBalance[2],
          ];
          newBalance = getRGBBalance(newBalance);
          console.log(
            round,
            Math.round(newBalance[0] * 255),
            Math.round(newBalance[1] * 255),
            Math.round(newBalance[2] * 255)
          );
          let maxBalance = maximizeRGB(newBalance);
          setScreenRGB([
            Math.round(maxBalance[0] * 255),
            Math.round(maxBalance[1] * 255),
            Math.round(maxBalance[2] * 255),
          ]);
          if (rgbDiff < 0.005) {
            let [r, g, b] = maximizeRGB(newBalance);
            setFlicker(false);
            console.log(
              Math.round(r * 255),
              Math.round(g * 255),
              Math.round(b * 255)
            );
          }
        }
      }, 100);
    }
  }, [screenRGB, flicker]);
  function maximizeRGB(rgb) {
    const max = Math.max(...rgb);
    return [rgb[0] / max, rgb[1] / max, rgb[2] / max];
  }

  function closestKelvin(rgb) {
    let diff = 100;
    let diffTemp = 0;
    for (let i = 2000; i < 9000; i += 100) {
      let newDiff = Math.abs(
        kelvin_table[i][0] -
          rgb[0] +
          kelvin_table[i][1] -
          rgb[1] +
          kelvin_table[i][2] -
          rgb[2]
      );
      if (newDiff < diff) {
        diff = newDiff;
        diffTemp = i;
      }
    }
    return diffTemp;
  }

  useEffect(() => {
    startFlicker();
  }, [flicker, startCountdown]);
  function startFlicker() {
    if (startCountdown) {
      return (
        <CountDown
          setFlicker={setFlicker}
          setStartCountdown={setStartCountdown}
        />
      );
    }
  }
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setStartCountdown(true);
          setScreenRGB([0, 0, 0]);
          setRound(0);
          setControl(null);
        }}
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            backgroundColor: rgbstring(screenRGB),
            height: "100%",
            width: "100%",
          }}
        ></View>
      </TouchableOpacity>
      {startFlicker()}
      <Cam setLuv={setLuv} setRgb={setRgb} />
    </>
  );
}
