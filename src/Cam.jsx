import React, { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import {
  Camera,
  useFrameProcessor,
  useCameraFormat,
  useCameraDevice,
  useCameraPermission,
  runAtTargetFps,
} from "react-native-vision-camera";
import { useSharedValue } from "react-native-worklets-core";
import RGB2LUV from "./RGB2LUV";

function Cam({ luv, setLuv, setRgb }) {
  const camera = useRef(null);
  const device = useCameraDevice("front");
  const format = useCameraFormat(device, [
    { videoResolution: { width: 1, height: 1 } },
  ]);
  const average = useSharedValue([0, 0, 0]);
  const frameProcessor = useFrameProcessor((frame) => {
    "worklet";
    if (frame.pixelFormat === "rgb") {
      const buffer = frame.toArrayBuffer();
      const data = new Uint8Array(buffer);
      let sum = [0, 0, 0];
      for (let i = 0; i < data.length; i += 4) {
        sum[2] += data[i];
        sum[1] += data[i + 1];
        sum[0] += data[i + 2];
      }
      const avg = sum.map((x) => x / (data.length / 4));
      average.value = avg;
    }
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setRgb(average.value);
      const [l, u, v] = RGB2LUV(average.value);
      setLuv([l, u, v]);
    }, 50);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Camera
      fps={30}
      ref={camera}
      device={device}
      frameProcessor={frameProcessor}
      format={format}
      pixelFormat="rgb"
      isActive={true}
      style={{ display: "none" }}
    />
  );
}
export default Cam;
