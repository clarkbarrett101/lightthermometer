import Cam from "./Cam";
import Flicker from "./Flicker";
import React, { useEffect, useState, useRef } from "react";
import { Button, View, TouchableOpacity, Text, Image } from "react-native";
import CountDown from "./CountDown";
import * as Brightness from "expo-brightness";
import LinkButton from "./LinkButton";

function Driver({ setPage, kelvin, setKelvin }) {
  const min = 1800;
  const [max, setMax] = useState(9000);
  const [flicker, setFlicker] = useState(false);
  const [luv, setLuv] = useState([0, 0, 0]);
  const [readings, setReadings] = useState([]);
  const [result, setResult] = useState(0);
  const [startCountdown, setStartCountdown] = useState(false);
  const [brightness, setBrightness] = useState(1);
  const [kelvinModifier, setKelvinModifier] = useState(1000);

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
    const reading = [luv[0], luv[1], kelvin];
    setReadings((prev) => [...prev, reading]);
    console.log(reading);
  }
  function kelvinSequence() {
    const diffIndexs = handleFindIndex();
    const data = readings;
    if (kelvinModifier > 100) {
      setKelvinModifier(100);
      console.log(data[diffIndexs[0]], data[diffIndexs[1]]);
      if (diffIndexs[0] > diffIndexs[1]) {
        setMax(data[diffIndexs[0]][2]);
        return data[diffIndexs[1]][2];
      } else {
        setMax(data[diffIndexs[1]][2]);
        return data[diffIndexs[0]][2];
      }
    } else {
      handleCalculateCam();
      ejectLoop();
    }
  }
  function handleFindIndex() {
    const data = readings;
    let diff = 100;
    let diffIndex1 = 0;
    let diffIndex2 = 1;
    let diffArray = [];
    const control = data[0];
    console.log(control);
    for (let i = 1; i < data.length - 1; i += 1) {
      let uDiff = Math.abs(data[i][0] - control[0]);
      let vDiff = Math.abs(data[i][1] - control[1]);
      let uvDiff = Math.sqrt(uDiff ** 2 + vDiff ** 2);
      uvDiff = Math.round(uvDiff * 100) / 100;
      console.log(data[i][2], uvDiff);
      diffArray.push(uvDiff);
    }
    diff = diffArray[0];

    for (let i = 1; i < diffArray.length; i++) {
      if (diffArray[i] < diff) {
        diff = diffArray[i];
        diffIndex2 = diffIndex1;
        diffIndex1 = i;
      }
    }
    return [diffIndex1, diffIndex2];
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
    /* let diffArrayNormal = [];
    diffArrayNormal.push(diffArray[0]);
    for (let i = 1; i < diffArray.length - 1; i++) {
      diffArrayNormal.push((diffArray[i] + diffArray[i + 1]) / 2);
    }
    diffArrayNormal.push(diffArray[diffArray.length - 1]);
    console.log(diffArrayNormal);*/
    diffIndex = diffArray.length - 1;
    diff = diffArray[diffArray.length - 1];
    for (let i = diffArray.length - 2; i > 0; i--) {
      console.log(diffArray[i], diff);
      if (diffArray[i] < diff) {
        diff = diffArray[i];
        diffIndex = i;
      }
    }
    diffIndex += 2;
    console.log(diffIndex);
    setKelvin(diffIndex * 200 + min);
    setPage("lightBooth");
  }
  useEffect(() => {
    console.log(result);
  }, [result]);

  useEffect(() => {
    startFlicker();
    if (flicker) {
      setKelvin(min);
    }
  }, [flicker, startCountdown]);
  useEffect(() => {
    if (flicker) {
      const interval = setInterval(() => {
        setKelvin((prev) => {
          if (prev < max) {
            if (prev === min) {
              return prev + 200;
            } else {
              return prev + kelvinModifier;
            }
          } else {
            return kelvinSequence();
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
    }
  }, [kelvin, flicker]);
  function ejectLoop() {
    setFlicker(false);
    setKelvin(min);
    setReadings([]);
  }

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
            setKelvin(min);
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
      <Cam luv={luv} setLuv={setLuv} />
      {startFlicker()}
    </>
  );
}
export default Driver;
