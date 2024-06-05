import React from "react";
import { Image, View } from "react-native";
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Rect,
  Circle,
} from "react-native-svg";

export default function Slider({ kelvin, panHandlers, min, max }) {
  return (
    <Svg
      width={"100%"}
      height={"5%"}
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
          <Stop stopColor="#FF3800" />
          <Stop offset={0.130767} stopColor="#FF8A12" />
          <Stop offset={0.252396} stopColor="#FFB46B" />
          <Stop offset={0.366539} stopColor="#FFD1A3" />
          <Stop offset={0.471326} stopColor="#FFE4CE" />
          <Stop offset={0.577985} stopColor="#FFF3EF" />
          <Stop offset={0.699613} stopColor="#F5F3FF" />
          <Stop offset={0.830597} stopColor="#E3E9FF" />
          <Stop offset={0.948483} stopColor="#D6E1FF" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
