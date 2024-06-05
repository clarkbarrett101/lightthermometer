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
        sum[0] += data[i];
        sum[1] += data[i + 1];
        sum[2] += data[i + 2];
      }
      const avg = sum.map((x) => x / (data.length / 4));
      average.value = avg;
    }
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      const [r, g, b] = [average.value[0], average.value[1], average.value[2]];
      setLuv(rgb2luv(r, g, b));
      setScreenColor(`rgb(${r},${g},${b})`);
    }, 50);
    return () => {
      clearInterval(interval);
    };
  }, []);
  function rgb2luv(r, g, b) {
    let l = 0.299 * r + 0.587 * g + 0.114 * b;
    let u = (r - l) * 0.492;
    let v = (b - l) * 0.877;
    u = Math.round(u * 100) / 100;
    v = Math.round(v * 100) / 100;
    return [u, v];
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
      style={{
        display: "none",
      }}
    />
  );
}
export default Cam;
