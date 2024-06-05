import React, { useEffect, useState } from "react";
import { View } from "react-native";
import kelvin_table from "./Kelvin_Table";
function Flicker({ kelvin, setKelvin, flicker, setFlicker }) {
  const [screenColor, setScreenColor] = useState("black");
  const k = kelvin_table[kelvin];

  useEffect(() => {
    const interval = setInterval(() => {
      setKelvin((prev) => {
        if (prev < 9000) {
          return prev + 200;
        } else {
          setFlicker(false);
          clearInterval(interval);
          return 9000;
        }
      });
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    if (kelvin % 400 == 0) {
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
