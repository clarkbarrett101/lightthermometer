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

function Cam({ luv, setLuv }) {
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
      const [l, u, v] = RGB2LUV(average.value);
      setLuv([u, v]);
    }, 50);
    return () => {
      clearInterval(interval);
    };
  }, []);
  function RGB2LUV(rgb) {
    let [r, g, b] = rgb;
    const l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const u = -0.0999 * r - 0.336 * g + 0.436 * b;
    const v = 0.615 * r - 0.5586 * g - 0.0563 * b;
    return [l, u, v];
  }
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
