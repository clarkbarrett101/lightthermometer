import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { kelvin_table } from "./Kelvin_Table";
function Flicker({ kelvin, setKelvin, flicker, setFlicker }) {
  const [screenColor, setScreenColor] = useState("black");
  const k = kelvin_table[kelvin];

  useEffect(() => {
    if (kelvin >= 2000) {
      const [r, g, b] = kelvin_table[kelvin];
      setScreenColor(`rgb(${r},${g},${b})`);
    } else {
      setScreenColor("black");
    }
  }, [kelvin]);
  return (
    <>
      <View
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
          backgroundColor: screenColor,
        }}
      />
    </>
  );
}
export default Flicker;
