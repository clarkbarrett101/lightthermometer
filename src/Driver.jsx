import Cam from "./Cam";
import Flicker from "./Flicker";
import React, { useEffect, useState, useRef } from "react";
import { Button, View, TouchableOpacity, Text, Image } from "react-native";
import CountDown from "./CountDown";
import * as Brightness from "expo-brightness";
import LinkButton from "./LinkButton";
import { kelvin_table } from "./Kelvin_Table";
import luvTable from "./LUVTable";

export default function Driver({ setPage, kelvin, setKelvin }) {
  const min = 1800;
  const max = 9000;
  const mid = 5500;
  const [flicker, setFlicker] = useState(false);
  const [luv, setLuv] = useState([0, 0, 0]);
  const [control, setControl] = useState(null);
  const [startCountdown, setStartCountdown] = useState(false);
  const [brightness, setBrightness] = useState(1);
  const [rgb, setRgb] = useState([255, 255, 255]);
  const kLUVtable = luvTable;

  useEffect(() => {
    (async () => {
      const { status } = await Brightness.requestPermissionsAsync();
      if (status === "granted") {
        Brightness.setSystemBrightnessAsync(brightness);
      }
    })();
  }, [brightness]);

  function startFlicker() {
    if (startCountdown) {
      return (
        <CountDown
          setFlicker={setFlicker}
          setStartCountdown={setStartCountdown}
        />
      );
    } else if (flicker) {
      return (
        <Flicker
          kelvin={kelvin}
          setKelvin={setKelvin}
          setFlicker={setFlicker}
        />
      );
    } else {
      return explainer();
    }
  }
  function feedbackLoop() {
    if (control === null) {
      setControl(luv);
      return mid;
    }
    let uDiff = control[1] - luv[1] + kLUVtable[kelvin][0];
    let vDiff = control[2] - luv[2] + kLUVtable[kelvin][1];
    const k = uvToKelvin(uDiff, vDiff);
    console.log(k, luv[0], luv[1], luv[2], control[0], control[1], control[2]);
    return k;
  }
  function uvToKelvin(u, v) {
    let diff = 255;
    let diffTemp = min;
    for (let i = min; i < max; i += 100) {
      let uDiff = u - kLUVtable[i][0];
      let vDiff = v - kLUVtable[i][1];
      let uvDiff = Math.sqrt(uDiff ** 2 + vDiff ** 2);
      if (uvDiff < diff) {
        diff = uDiff;
        diffTemp = i;
      }
    }
    console.log(diff);
    return diffTemp;
  }
  function handleCalculateCam() {
    const data = readings;
    let diff = 100;
    let diffIndex = 0;
    let diffArray = [];
    const control = data[0];
    console.log(control);
    for (let i = 2; i < data.length - 1; i += 1) {
      let uDiff = Math.abs(data[i][0] - control[0]);
      let vDiff = Math.abs(data[i][1] - control[1]);
      let uvDiff = Math.sqrt(uDiff ** 2 + vDiff ** 2);
      uvDiff = Math.round(uvDiff * 100) / 100;
      console.log(data[i][2], uvDiff);
      diffArray.push(uvDiff);
    }
    let diffArrayNormal = [];
    diffArrayNormal.push(diffArray[0]);
    for (let i = 1; i < diffArray.length - 1; i++) {
      diffArrayNormal.push((diffArray[i] + diffArray[i + 1]) / 2);
    }
    diffArrayNormal.push(diffArray[diffArray.length - 1]);
    console.log(diffArrayNormal);
    diffIndex = diffArrayNormal.length - 1;
    diff = diffArrayNormal[diffArrayNormal.length - 1];
    for (let i = diffArrayNormal.length - 2; i > 0; i--) {
      console.log(diffArrayNormal[i], diff);
      if (diffArrayNormal[i] < diff) {
        diff = diffArrayNormal[i];
        diffIndex = i;
      }
    }
    diffIndex += 2;
    console.log(diffIndex);
    setKelvin(diffIndex * 200 + min);
    setPage("lightBooth");
  }

  useEffect(() => {
    startFlicker();
  }, [flicker, startCountdown]);

  useEffect(() => {
    if (flicker) {
      setTimeout(() => {
        const k = feedbackLoop();
        if (k === kelvin) {
          console.log("done");
          setFlicker(false);
          setControl(null);
        } else {
          setKelvin(k);
        }
      }, 300);
    }
  }, [kelvin, flicker]);
  /*
  useEffect(() => {
    if (flicker) {
      const interval = setInterval(() => {
        setKelvin((prev) => {
          if (prev < 9000) {
            return prev + 200;
          } else {
            clearInterval(interval);
            return 9000;
          }
        });
      }, 100);

      return () => {
        clearInterval(interval);
      };
    }
  }, [flicker]);
  useEffect(() => {
    if (flicker) {
      handleTakeReading();
      if (kelvin >= 9000) {
        setFlicker(false);
        setKelvin(min);
        handleCalculateCam();
        setReadings([]);
      }
    }
  }, [kelvin, flicker]);
*/
  function explainer() {
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          padding: 24,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          display: "inline-flex",
          backgroundColor: "#cfffff",
          gap: 16,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Image
            source={require("../assets/lighttherm.png")}
            style={{
              width: 96,
              height: 96,
              resizeMode: "contain",
            }}
          />
          <Text
            style={{
              alignSelf: "center",
              textAlign: "center",
              color: "black",
              fontSize: 32,
              fontWeight: "400",
              wordWrap: "break-word",
              padding: 16,

              fontFamily: "Poiret One",
            }}
          >
            Ambient Light Measurement
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#FFE86E",
            borderRadius: 22,
            padding: 16,
            justifyContent: "center",
            alignItems: "center",
            gap: 24,
            display: "inline-flex",
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 22,
              fontWeight: "400",
              padding: 8,
              fontFamily: "Poiret One",
              letterSpacing: -0.2,
            }}
          >
            When the countdown begins, hold your device about 3 inches from a
            stationary surface. Make sure you can see light from the screen on
            that surface. Hold the device still for another 5 seconds as the
            screen changes color.
          </Text>
        </View>

        <TouchableOpacity
          onPressIn={() => {
            setStartCountdown(true);
            setKelvin(mid);
          }}
          style={{
            backgroundColor: "cyan",
            borderEndWidth: 4,
            borderBottomWidth: 4,
            borderColor: "rgba(0,0,0,0.2)",
            borderRadius: 16,
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
          }}
        >
          <Text
            style={{
              fontSize: 32,
              fontFamily: "Poiret One",
            }}
          >
            Begin
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <>
      <View style={{ position: "absolute", left: 10, top: 60, zIndex: 2 }}>
        <LinkButton
          icon={require("../assets/back.png")}
          target="home"
          setPage={setPage}
          width={60}
          height={60}
        />
      </View>
      <Cam luv={luv} setLuv={setLuv} setRgb={setRgb} />
      {startFlicker()}
    </>
  );
}
