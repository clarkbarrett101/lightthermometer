import Cam from "./Cam";
import Flicker from "./Flicker";
import React, { useEffect, useState, useRef } from "react";
import { Button, View, TouchableOpacity, Text, Image } from "react-native";
import CountDown from "./CountDown";
import * as Brightness from "expo-brightness";
import LinkButton from "./LinkButton";
import { Dimensions } from "react-native";

function Driver({ setPage, kelvin, setKelvin }) {
  const min = 1600;
  const max = 9000;
  const readCap = 100;
  const [flicker, setFlicker] = useState(false);
  const [luv, setLuv] = useState([0, 0, 0]);
  const [readings, setReadings] = useState([]);
  const [startCountdown, setStartCountdown] = useState(false);
  const [brightness, setBrightness] = useState(1);
  cosnt[(control, setControl)] = useState([0, 0, 0]);
  // const [countUp, setCountUp] = useState(true);
  //  const [safety, setSafety] = useState(false);
  const [rgb, setRgb] = useState([0, 0, 0]);
  const [noReadings, setNoReadings] = useState(0);
  const heightRatio = Dimensions.get("window").height / 812;
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
    const reading = [luv[1], luv[2]];
    if (control[2] === 0) {
      setControl(reading);
    } else {
      const diff = [
        Math.abs(control[0] - reading[0]) + Math.abs(control[1] - reading[1]),
        kelvin,
      ];
      setReadings((prev) => [...prev, diff]);
      if (diff[0] < 1) {
        setNoReadings((prev) => prev + 1);
      }
    }
  }

  function calculateTemp() {
    let diff = readings[0][0];
    let diffindex = 0;
    for (let i = 1; i < readings.length; i++) {
      if (readings[i][0] < diff) {
        diff = readings[i][0];
        diffindex = i;
      }
    }
    return readings[diffindex][1];
  }
  /*
  function checkIfSwitch(kelvin) {
    if (readings.length < 2) {
      return;
    }
    const control = readings[0];
    const uDiff = control[0] - luv[1];
    const vDiff = control[1] - luv[2];
    if (Math.abs(uDiff) < 0.5 && Math.abs(vDiff) < 0.5) {
      setNoReadings((prev) => prev + 1);
    }
    const lastUdiff = control[0] - readings[readings.length - 1][0];
    const lastVdiff = control[1] - readings[readings.length - 1][1];
    let nearMiss = false;
    if (
      Math.abs(lastUdiff) + Math.abs(lastVdiff) <
        Math.abs(uDiff) + Math.abs(vDiff) &&
      Math.abs(lastUdiff) + Math.abs(lastVdiff) < 1
    ) {
      nearMiss = true;
    }
    if (readings.length > 4 && Math.abs(uDiff) + Math.abs(vDiff) < 2) {
      handleReset();
      setPage("endscreen");
    }
    console.log(
      kelvin,
      Math.round(control[0]),
      Math.round(control[1]),
      Math.round(luv[1]),
      Math.round(luv[2]),
      Math.round(uDiff),
      Math.round(vDiff),
      nearMiss
    );

    if (kelvin <= 2000) {
      setCountUp(true);
      return true;
    }
    if (countUp) {
      if ((uDiff < vDiff || nearMiss) && kelvin >= 3100) {
        console.log("switch");
        setCountUp(false);
        return false;
      }
    } else {
      if (uDiff > vDiff || nearMiss) {
        if (!safety || nearMiss) {
          setSafety(true);
          setCountUp(true);
          console.log("safety on");
          return true;
        }
        handleReset();
        setPage("endscreen");
      }
    }
    return countUp;
  }
    */
  function handleReset() {
    setReadings([]);
    setFlicker(false);
    // setCountUp(true);
    //setStartCountdown(false);
    setNoReadings(0);
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
      if (noReadings > 5) {
        handleReset();
      }
      if (readings.length > readCap) {
        handleReset();
        setPage("endscreen");
        return;
      }
      if (kelvin >= max) {
        //  if (safety) {
        //   setSafety(false);
        //   setKelvin(max - 1500);
        //  } else {
        setKelvin(calculateTemp());
        handleReset();
        setPage("endscreen");
        //}
        return;
      }
      setTimeout(() => {
        setKelvin((prev) => {
          if (prev < min) {
            return min;
          } else {
            return prev + 200;
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
          padding: 24 * heightRatio,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          display: "inline-flex",
          backgroundColor: "#cfffff",
          gap: 16 * heightRatio,
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
              width: 96 * heightRatio,
              height: 96 * heightRatio,
              resizeMode: "contain",
            }}
          />
          <Text
            style={{
              alignSelf: "center",
              textAlign: "center",
              color: "black",
              fontSize: 32 * heightRatio,
              fontWeight: "400",
              wordWrap: "break-word",
              padding: 16 * heightRatio,

              fontFamily: "Poiret One",
            }}
          >
            Ambient Light Measurement
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#FFE86E",
            borderRadius: 22 * heightRatio,
            padding: 16 * heightRatio,
            justifyContent: "center",
            alignItems: "center",
            gap: 24 * heightRatio,
            display: "inline-flex",
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 22 * heightRatio,
              fontWeight: "400",
              padding: 8 * heightRatio,
              fontFamily: "Poiret One",
              letterSpacing: -0.2,
            }}
          >
            When the countdown begins, hold your device about 6 inches from a
            stationary surface with the screen pointing at it. Make sure it's
            close enough that you can see light from the screen on the surface.
            Hold the device still for another few seconds until the screen
            flashes green.
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
            borderEndWidth: 4 * heightRatio,
            borderBottomWidth: 4 * heightRatio,
            borderColor: "rgba(0,0,0,0.2)",
            borderRadius: 16 * heightRatio,
            justifyContent: "center",
            alignItems: "center",
            padding: 16 * heightRatio,
          }}
        >
          <Text
            style={{
              fontSize: 32 * heightRatio,
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
      <View
        style={{
          position: "absolute",
          left: 10 * heightRatio,
          top: 60 * heightRatio,
          zIndex: 2,
        }}
      >
        <LinkButton
          icon={require("../assets/back.png")}
          target="home"
          setPage={setPage}
          width={60 * heightRatio}
          height={60 * heightRatio}
        />
      </View>
      <Cam luv={luv} setLuv={setLuv} setRgb={setRgb} />
      {startFlicker()}
    </>
  );
}
export default Driver;
//
