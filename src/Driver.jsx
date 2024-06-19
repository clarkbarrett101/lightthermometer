import Cam from "./Cam";
import Flicker from "./Flicker";
import React, { useEffect, useState, useRef } from "react";
import { Button, View, TouchableOpacity, Text, Image } from "react-native";
import CountDown from "./CountDown";
import * as Brightness from "expo-brightness";
import LinkButton from "./LinkButton";

function Driver({ setPage, kelvin, setKelvin }) {
  const min = 1600;
  const max = 9000;
  const [flicker, setFlicker] = useState(false);
  const [luv, setLuv] = useState([0, 0, 0]);
  const [readings, setReadings] = useState([]);
  const [startCountdown, setStartCountdown] = useState(false);
  const [brightness, setBrightness] = useState(1);
  const [countUp, setCountUp] = useState(true);
  const [rgb, setRgb] = useState([0, 0, 0]);

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
    const reading = [rgb[0], rgb[2], kelvin];
    setReadings((prev) => [...prev, reading]);
  }

  function checkIfSwitch(kelvin) {
    if (readings.length < 2) {
      return;
    }
    const control = readings[1];
    const controlBalance = control[0] / control[1];
    const rbBalance = rgb[0] / rgb[2];
    console.log(
      kelvin,
      Math.round(control[0]),
      Math.round(control[1]),
      Math.round(rgb[1]),
      Math.round(rgb[2]),
      Math.round(controlBalance * 100) / 100,
      Math.round(rbBalance * 100) / 100
    );
    if (kelvin < 2000) {
      setCountUp(true);
      return true;
    }
    if (countUp) {
      if (rbBalance < controlBalance && kelvin >= 3000) {
        console.log("switch");
        setCountUp(false);
        return false;
      }
    } else {
      if (rbBalance > controlBalance) {
        handleReset();
        setPage("endscreen");
      }
    }
    return countUp;
  }
  function handleReset() {
    setReadings([]);
    setFlicker(false);
    setStartCountdown(false);
  }
  useEffect(() => {
    startFlicker();
    if (flicker) {
      setKelvin(min);
    }
  }, [flicker, startCountdown]);
  useEffect(() => {
    if (flicker) {
      handleTakeReading();
      if (kelvin >= max) {
        handleReset();
        setPage("endscreen");
      }
      setTimeout(() => {
        setKelvin((prev) => {
          if (prev < min) {
            return min;
          } else if (prev < 2000) {
            return prev + 200;
          } else if (prev < max) {
            const modifier = checkIfSwitch(prev) ? 400 : -100;
            return prev + modifier;
          }
        });
      }, 100);
    }
  }, [flicker, kelvin]);
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
      <Cam luv={luv} setLuv={setLuv} setRgb={setRgb} />
      {startFlicker()}
    </>
  );
}
export default Driver;
