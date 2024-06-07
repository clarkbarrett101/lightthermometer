import * as React from "react";
import Svg, { Defs, LinearGradient, Stop, G, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */

function Logo({ style }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
      enableBackground="new 0 0 100 100"
      {...style}
    >
      <Defs>
        <LinearGradient
          id="linear-gradient"
          x1={16.2}
          y1={35.4}
          x2={87}
          y2={76.4}
          gradientTransform="matrix(1 0 0 -1 0 102)"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0} stopColor="#29387f" />
          <Stop offset={0.4} stopColor="#b21e3b" />
          <Stop offset={0.7} stopColor="#d59429" />
          <Stop offset={1} stopColor="#97c93d" />
        </LinearGradient>
      </Defs>
      <G id="Layer_1">
        <Path id="A" d="M35 5L67 5 50 8z" fill="#4e9ec6" />
        <Path id="B" d="M50 8L67 5 72 19z" fill="#9edae0" />
        <Path id="C" d="M67 5l5 14 18 6L67 5z" fill="#def5ea" />
        <Path id="D" d="M72 19L88 42 90 25z" fill="#e7e5cb" />
        <Path id="E" d="M90 25.1L88 42l7 11.9-5-28.8z" fill="#f1d9ae" />
        <Path id="F" d="M88 42L84 68 95 54z" fill="#eec191" />
        <Path id="G" d="M84 68v9.9l10.9-23.7L84 68z" fill="#eeb375" />
        <Path
          id="H"
          d="M84 68.2v9.9L67.3 88.8c-.1 0-.1 0-.1-.1l16.7-20.6s.1 0 .1.1z"
          fill="#c68562"
        />
        <Path id="I" d="M58 80L84 68 67 89z" fill="#cd766e" />
        <Path
          id="J"
          d="M58 80L38.3 92.8c-.1 0 0 .1 0 .1L66.9 89c.1 0 .1-.1 0-.1L58 80z"
          fill="#a24348"
        />
        <Path id="K" d="M25 75L58 80 38 93z" fill="#914661" />
        <Path
          id="L"
          d="M17.1 83l20.7 9.9c.1 0 .1 0 .1-.1L25 75.1h-.1L17 83h.1z"
          fill="#54092f"
        />
        <Path id="M" d="M17 83L3 61.1 25 75l-8 8z" fill="#360750" />
        <Path id="N" d="M25 75L18 45 3 61z" fill="#604089" />
        <Path
          id="O"
          d="M17.9 44.9L5.2 35.1c-.1-.1-.2 0-.2.1L3 60.7c0 .1.1.2.2.1l14.7-15.6c.1-.2.1-.2 0-.3z"
          fill="#3d3887"
        />
        <Path id="P" d="M5 35L18 45 23 16z" fill="#5369b1" />
        <Path id="Q" d="M5.2 34.7L19 14l3.9 2v.1L5.2 34.7z" fill="#26559a" />
        <Path
          id="R"
          d="M34.8 5.2L23 16l-3.9-2v-.1l15.7-8.7c0-.1 0 0 0 0z"
          fill="#125c9d"
        />
        <Path id="S" d="M35 5L23 16 50 8z" fill="#638dc9" />
        <Path id="T" d="M23 16L50 8 45 28z" fill="#82a1d4" />
        <Path id="U" d="M50 8L72 19 45 28z" fill="#bdbbc6" />
        <Path
          id="U_00000004536478971625956850000015195855624793596571_"
          d="M72 19L88 42 72 51z"
          fill="#d5bfbf"
        />
        <Path id="V" d="M88 42L84 68 72 51z" fill="#deaea5" />
        <Path id="W" d="M72 51L84 68 58 80z" fill="#cc9295" />
        <Path id="X" d="M45 57L58 80 72 51z" fill="#ba8c9f" />
        <Path id="Y" d="M45 57L25 75 58 80z" fill="#a15f87" />
        <Path id="Z" d="M45 57L25 75 18 45z" fill="#7c659c" />
        <Path id="AA" d="M45 28L23 16 18 45z" fill="#7888c3" />
        <Path id="AD" d="M45 57L72 51 45 28z" fill="#b69bb8" />
        <Path
          id="AD_00000146463678694408439720000016681489762218975122_"
          d="M72 19L72 51 45 28z"
          fill="#c2b1c6"
        />
        <Path id="AE" d="M45 28L18 45 45 57z" fill="#847ab2" />
      </G>
      <Path
        id="Layer_2"
        d="M37.9 92.8L67.1 88.9 84.2 77.9 95.2 54 90 25 67 5 35 5 19.1 14 5 35.2 3 61 17 83z"
        display="none"
        fill="none"
        stroke="#000"
        strokeWidth={0.5}
        strokeMiterlimit={10}
      />
      <Path
        d="M5.9 43.8c.9 0 1-.2.9-1v-.4c-.7-3.2.1-4.5 4.7-4.5h1.2l.9 4.6h-1c-.9 0-1 .2-.9 1v.4c.7 3.2-.1 4.5-4.7 4.5H5.8l-.9-4.6h1zm8.1-.5c0-3.1 2.5-5.5 5.7-5.5s5.7 2.2 5.7 5.5-2.5 5.5-5.7 5.5-5.7-2.2-5.7-5.5zm6.6 0c0-.5-.4-.9-.9-.9s-.9.4-.9.9.4.9.9.9.9-.4.9-.9zm10.9.3h3.7v2h-3.7v3.1h-5V38.3h8.7l.9 4.7h-4.7v.7h.1zm12.5-.9v5.7h-5v-5.7h-2.7l.9-4.7h8.7l.9 4.7h-2.7zm8.6-4.6l1.2 2.5 1.4-2.7 1.4 2.7 1.2-2.5h5.5l-6.1 11-2.1-4-2.1 4-6.1-11h5.7zm13.4-.6l7.1 11h-5.8l-1.2-2.1-1.2 2.1h-5.8l7.1-11zm13 9h-.9v1.9h-5V38h6c3.8 0 5.2 1.7 5.2 4.2s-.2 2.2-1 3l2.1 3.2h-5.3l-1-1.9H79zm-.8-4.8v1.6h.4c.6 0 .9-.4.9-.7s-.2-.7-.9-.7h-.4zm12.4 3.4h4.3l-.7 3.5h-8.7V38.2h8.7l.7 3.5h-4.3v.7h3.7v2h-3.7v.7zM23 50.8c3 0 5.2 1.9 5.7 4.5l-4.8.7c0-.2-.4-.5-.7-.5s-.9.4-.9.9.4.9.9.9.6-.2.7-.5l4.8.6c-.5 2.6-2.7 4.5-5.7 4.5s-5.7-2.2-5.7-5.5 2.5-5.5 5.7-5.5zm18 .2v10.4h-5v-4.2h-1.4v4.2h-5V51h5v4.2H36V51h5zm6.4 0v10.4h-5V51h5zm10.9 9.1l1.4 2.5h-5.3l-.5-1c-3.1-.2-5.3-2.5-5.3-5.5s2.5-5.5 5.7-5.5 5.7 2.2 5.7 5.5-.6 3-1.6 4zm-5-3.9c0 .5.4.9.9.9s.9-.4.9-.9-.4-.9-.9-.9-.9.4-.9.9zm7.6-5.2h5v5.1c0 .7.2 1 .6 1s.7-.2.7-1V51h5v4.7c0 4-2.4 6-5.6 6s-5.6-2-5.6-6V51h-.1zm17.4 7h4.3l-.7 3.5h-8.7V51.1h8.7l.7 3.5h-4.3v.7H82v2h-3.7v.7z"
        fill="url(#linear-gradient)"
        strokeWidth={0}
      />
    </Svg>
  );
}

export default Logo;
