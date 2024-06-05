import React, { useState, useRef, useEffect } from "react";
import kelvin_table from "./Kelvin_Table";
import { PanResponder } from "react-native";
import { View, Text } from "react-native";
import { Dimensions } from "react-native";
import Slider from "./Slider";
import LinkButton from "./LinkButton";

export default function LightBooth({ setPage, kelvin, setKelvin }) {
  const sw = Dimensions.get("window").width;
  const sh = Dimensions.get("window").height;
  const preloadKelvin = kelvin_table[1000];
  const [touchPosition, setTouchPosition] = useState(0);
  const [rgb, setRgb] = useState([255, 249, 253]);
  const min = 1000;
  const max = 9000;
  const step = 100;
  const [hideUI, setHideUI] = useState(false);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: handleTouchStart,
      onPanResponderMove: handleTouchMove,
    })
  ).current;

  function handleTouchStart(event) {
    const { locationX } = event.nativeEvent;
    const pos = locationX / sw;
    const kelvin = Math.round((pos * max + min) / step) * step;
    if (kelvin < min) {
      setKelvin(min);
      return;
    } else if (kelvin > max) {
      setKelvin(max);
      return;
    }
    console.log(kelvin);

    setKelvin(kelvin);
  }
  function handleTouchMove(event) {
    const { locationX } = event.nativeEvent;
    const pos = locationX / sw;
    const kelvin = Math.round((pos * max + min) / step) * step;
    if (kelvin < min) {
      setKelvin(min);
      return;
    } else if (kelvin > max) {
      setKelvin(max);
      return;
    }
    setKelvin(kelvin);
  }

  useEffect(() => {
    setRgb(kelvin_table[kelvin]);
  }, [kelvin]);

  return (
    <View style={{ backgroundColor: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})` }}>
      <View
        hidden={hideUI}
        style={{
          padding: 20,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <View hidden={hideUI} style={{ flex: 1 }}>
          <View style={{ textAlign: "center", top: 40 }}>
            <Text
              style={{
                color: "black",
                fontSize: 24,
                fontFamily: "Poiret One",
                fontWeight: "400",
                wordWrap: "break-word",
              }}
            >
              Choose a temperature to simulate specific lighting conditions,
              maximize brightness for best results.
            </Text>
          </View>
        </View>
        <Slider
          min={min}
          max={max}
          panHandlers={panResponder.panHandlers}
          kelvin={kelvin}
        />
        <Text
          hidden={hideUI}
          style={{
            color: "black",
            fontSize: 48,
            justifySelf: "center",
            alignSelf: "center",
            fontFamily: "Poiret One",
          }}
        >
          {kelvin}K
        </Text>
        <LinkButton
          text=""
          target="home"
          setPage={setPage}
          icon={require("../assets/arrow.png")}
          width={100}
          height={50}
        />
      </View>
    </View>
  );
}
