import Cam from "./Cam";
import Flicker from "./Flicker";
import React, { useEffect, useState, useRef } from "react";
import { Button, View, TouchableOpacity, Text } from "react-native";
import { useImage } from "@shopify/react-native-skia";
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
} from "react-native-vision-camera";

function Driver() {
  const [kelvin, setKelvin] = useState(1000);
  const [flicker, setFlicker] = useState(false);
  const [readings, setReadings] = useState([]);
  const format = useCameraFormat(device, [
    { photoResolution: { width: 100, height: 100 } },
  ]);
  const camera = useRef(null);
  const device = useCameraDevice("front");

  function startFlicker() {
    if (!flicker) {
      return (
        <TouchableOpacity onPressIn={() => setFlicker(true)}>
          <Text
            style={{
              position: "absolute",
              top: 500,
              left: 150,
              color: "white",
              backgroundColor: "black",
              padding: 10,
            }}
          >
            Start Flicker
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <Flicker
          kelvin={kelvin}
          setKelvin={setKelvin}
          setFlicker={setFlicker}
        />
      );
    }
  }

  function processImage(photo) {
    const img = useImage(photo);
    img.readPixels().then((data) => {
      let sum = [0, 0, 0];
      for (let i = 0; i < data.length; i += 3) {
        const rgb = [data[i], data[i + 1], data[i + 2]];
        const luv = rgb2luv(rgb);
        sum[0] += luv[0];
        sum[1] += luv[1];
        sum[2] += luv[2];
      }
      const avg = sum.map((x) => x / (data.length / 3));
      console.log(avg);
      return [avg[1], avg[2]];
    });

    function rgb2luv(rgb) {
      let luv = [0, 0, 0];
      luv[0] = 0.257 * rgb[0] + 0.504 * rgb[1] + 0.098 * rgb[2] + 16;
      luv[1] = -0.148 * rgb[0] - 0.291 * rgb[1] + 0.439 * rgb[2] + 128;
      luv[2] = 0.439 * rgb[0] - 0.368 * rgb[1] - 0.071 * rgb[2] + 128;
      return luv;
    }
  }

  useEffect(() => {
    startFlicker();
  }, [flicker]);
  useEffect(() => {
    if (kelvin > 8000) {
      setFlicker(false);
      setKelvin(1000);
    }
    handleTakePhoto();
  }, [kelvin, flicker]);

  async function handleTakePhoto() {
    if (camera.current) {
      await camera.current
        .takePhoto({
          quality: 1,
          base64: true,
        })
        .then((snap) => {
          setReadings([...readings, snap]);
        });
    }
  }
  return (
    <>
      <Camera
        style={{
          height: "50%",
          position: "absolute",
          width: "100%",
          top: 0,
          zIndex: -1,
        }}
        photo={true}
        format={format}
        device={device}
        isActive={true}
        ref={camera}
      />
      {startFlicker()}
    </>
  );
}
export default Driver;
