import React from "react";
import { Image, View } from "react-native";
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Rect,
  Circle,
} from "react-native-svg";
import kelvin_table from "./Kelvin_Table";

export default function Slider({
  kelvin,
  panHandlers,
  min,
  max,
  hidden,
  heightRatio,
}) {
  const k = kelvin_table[kelvin];
  function colorString(kelvinLevel) {
    const k = kelvin_table[kelvinLevel];
    return `rgb(${k[0]},${k[1]},${k[2]})`;
  }
  const allKelvinLevels = [1500, 2500, 3500, 4500, 5500, 6500, 7500, 8500];
  function colorStops() {
    return allKelvinLevels.map((level) => {
      return (
        <Stop
          key={level}
          offset={level / 9000}
          stopColor={colorString(level)}
        />
      );
    });
  }
  const iconSize = 25 * heightRatio;
  if (hidden) {
    return null;
  }
  return (
    <>
      <View
        style={{
          justifyContent: "space-around",
          display: "flex",
          flexDirection: "row",
          width: "100%",
          marginBottom: -15,
        }}
      >
        <Image
          source={require("../assets/flame.png")}
          style={{ width: iconSize, height: iconSize, resizeMode: "contain" }}
        />
        <Image
          source={require("../assets/light-bulb.png")}
          style={{ width: iconSize, height: iconSize, resizeMode: "contain" }}
        />
        <Image
          source={require("../assets/sunset.png")}
          style={{ width: iconSize, height: iconSize, resizeMode: "contain" }}
        />
        <Image
          source={require("../assets/sun.png")}
          style={{ width: iconSize, height: iconSize, resizeMode: "contain" }}
        />
        <Image
          source={require("../assets/cloud-sun.png")}
          style={{ width: iconSize, height: iconSize, resizeMode: "contain" }}
        />
        <Image
          source={require("../assets/clouds.png")}
          style={{ width: iconSize, height: iconSize, resizeMode: "contain" }}
        />
      </View>
      <Svg
        width={"100%"}
        height={5 * heightRatio + "%"}
        viewBox="0 0 908 58"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...panHandlers}
      >
        <Rect
          x={2}
          y={2}
          width={904}
          height={54}
          rx={27}
          fill="url(#paint0_linear_12_98)"
        />
        <Rect
          x={2}
          y={2}
          width={904}
          height={54}
          rx={27}
          stroke="#000"
          strokeWidth={4}
        />
        <Circle
          cx={824 * ((kelvin - min) / (max - min)) + 42}
          cy={29}
          r={40}
          strokeWidth={4}
          stroke={"black"}
          fill="white"
        />
        <Defs>
          <LinearGradient
            id="paint0_linear_12_98"
            x1={50}
            y1={29}
            x2={904}
            y2={29}
            gradientUnits="userSpaceOnUse"
          >
            {colorStops()}
          </LinearGradient>
        </Defs>
      </Svg>
    </>
  );
}
