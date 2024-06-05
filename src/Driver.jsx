import Cam from "./Cam";
import Flicker from "./Flicker";
import React, { useEffect, useState, useRef } from "react";
import { Button, View, TouchableOpacity, Text, Image } from "react-native";
import CountDown from "./CountDown";
import * as Brightness from "expo-brightness";
import LinkButton from "./LinkButton";

function Driver({ setPage, kelvin, setKelvin }) {
  const min = 1600;
  const [flicker, setFlicker] = useState(false);
  const [luv, setLuv] = useState([0, 0, 0]);
  const [readings, setReadings] = useState([]);
  const [result, setResult] = useState(0);
  const [startCountdown, setStartCountdown] = useState(false);
  const [brightness, setBrightness] = useState(0.5);

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
  function handleTakeReading() {
    const reading = [luv[0], luv[1]];
    console.log(reading);
    setReadings((prev) => [...prev, reading]);
  }
  function handleCalculateCam(data) {
    let diff = 100;
    let diffIndex = 0;
    let diffArray = [];
    for (let i = 0; i < data.length - 1; i += 2) {
      let uDiff = Math.abs(data[i][0] - data[i + 1][0]);
      let vDiff = Math.abs(data[i][1] - data[i + 1][1]);
      let uvDiff = Math.sqrt(uDiff ** 2 + vDiff ** 2);
      uvDiff = Math.round(uvDiff * 100) / 100;
      diffArray.push(uvDiff);
    }
    let diffArrayNormal = [];
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
    diffIndex++;
    console.log(diffIndex);
    setKelvin(diffIndex * 400 + min);
    setPage("lightBooth");
  }
  useEffect(() => {
    console.log(result);
  }, [result]);

  useEffect(() => {
    startFlicker();
    if (flicker) {
      setBrightness(1);
    } else {
      setBrightness(0.5);
    }
  }, [flicker, startCountdown]);

  useEffect(() => {
    if (flicker) {
      handleTakeReading();
      if (kelvin >= 9000) {
        setFlicker(false);
        setKelvin(1000);
        handleCalculateCam(readings);
        setReadings([]);
      }
    }
  }, [kelvin, flicker]);

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
            source={require("../assets/Thermometer.png")}
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
            When the countdown begins, hold your device about 3 inches or about
            8 cm from a stationary surface. Make sure you can see light from the
            screen on the surface.
          </Text>
        </View>

        <View
          style={{
            alignSelf: "center",
            padding: 16,
            backgroundColor: "#FFE86E",
            borderRadius: 22,
            justifyContent: "center",
            alignItems: "center",
            display: "inline-flex",
          }}
        >
          <Image
            source={require("../assets/warning.png")}
            style={{ width: 64, height: 64, resizeMode: "contain" }}
          />
          <Text
            style={{
              color: "black",
              fontSize: 22,
              letterSpacing: -0.2,
              fontWeight: "400",
              wordWrap: "break-word",

              fontFamily: "Poiret One",
            }}
          >
            Warning: the measurement process involves the screen flashing
            rapidly for a few seconds. You should avoid looking at the screen
            directly, especially if you are photosensitive.
          </Text>
        </View>
        <TouchableOpacity
          onPressIn={() => {
            setStartCountdown(true);
            console.log("cd");
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
              fontSize: 24,
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
          icon={require("../assets/arrow.png")}
          target="home"
          setPage={setPage}
          width={60}
          height={60}
        />
      </View>
      <Cam luv={luv} setLuv={setLuv} />
      {startFlicker()}
    </>
  );
}
export default Driver;
