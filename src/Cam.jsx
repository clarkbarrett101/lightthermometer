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

function Cam({ rgb, setRgb }) {
  const camera = useRef(null);
  const canvas = useRef(null);
  const device = useCameraDevice("front");
  const format = useCameraFormat(device, [
    { videoResolution: { width: 1, height: 1 } },
  ]);
  const average = useSharedValue([0, 0, 0]);
  const [screenColor, setScreenColor] = useState("black");
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
      let [r, g, b] = [average.value[0], average.value[1], average.value[2]];
      r = Math.round(r * 100) / 100;
      g = Math.round(g * 100) / 100;
      b = Math.round(b * 100) / 100;
      setRgb([r, g, b]);
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
      style={{ width: 100, height: 100 }}
    />
  );
}
export default Cam;
