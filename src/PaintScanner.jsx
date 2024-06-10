import React, { useEffect, useState } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import Cam from "./Cam";

export default function PaintScanner() {
  const [rgb, setRgb] = useState([0, 0, 0]);
  const [countdown, setCountdown] = useState(5);
  const [screenColor, setScreenColor] = useState("black");
  const [startCountdown, setStartCountdown] = useState(false);
  const [readings, setReadings] = useState([]);
  const [lastReading, setLastReading] = useState([0, 0, 0]);
  useEffect(() => {
    if (startCountdown) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            clearInterval(interval);
            return 5;
          }
        });
      }, 500);
      return () => {
        clearInterval(interval);
      };
    }
  }, [startCountdown]);
  useEffect(() => {
    if (startCountdown) {
      if (countdown === 0) {
        const reading = [rgb, lastReading];
        setReadings([...readings, reading]);

        setStartCountdown(false);
        setCountdown(5);
      } else if (countdown === 3) {
        const reading = rgb;
        setReadings([...readings, reading]);
        setScreenColor("red");
      } else if (countdown === 2) {
        const reading = rgb;
        setReadings([...readings, reading]);
        setScreenColor("green");
      } else if (countdown === 1) {
        const reading = rgb;
        setReadings([...readings, reading]);
        setScreenColor("blue");
      } else if (countdown <= 5) {
        setScreenColor("white");
      }
    } else {
      setScreenColor("black");
    }
  }, [countdown, startCountdown]);
  useEffect(() => {
    console.log(readings);
  }, [readings]);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setStartCountdown(true)}>
        <View
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 0,
            backgroundColor: screenColor,
          }}
        />
      </TouchableWithoutFeedback>
      <Cam rgb={rgb} setRgb={setRgb} />
    </>
  );
}
