import React, { useState, useRef, useEffect } from "react";
import kelvin_table from "./Kelvin_Table";
import { PanResponder } from "react-native";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Dimensions } from "react-native";
import Slider from "./Slider";
import LinkButton from "./LinkButton";
import * as Brightness from "expo-brightness";

export default function LightBooth({ setPage, kelvin, setKelvin, setNewRoom }) {
  const sw = Dimensions.get("window").width;
  const sh = Dimensions.get("window").height;
  const preloadKelvin = kelvin_table[1000];
  const [touchPosition, setTouchPosition] = useState(0);
  const [rgb, setRgb] = useState([255, 249, 253]);
  const min = 2000;
  const max = 9000;
  const step = 100;
  const [hideUI, setHideUI] = useState(false);
  Brightness.setSystemBrightnessAsync(1);
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
          <View style={{ textAlign: "center", top: 40 }} hidden={hideUI}>
            <Text
              style={{
                color: "black",
                fontSize: 24,
                fontFamily: "Poiret One",
                fontWeight: "400",
                wordWrap: "break-word",
                display: hideUI ? "none" : "flex",
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
          hidden={hideUI}
        />
        <Text
          hidden={hideUI}
          style={{
            color: "black",
            fontSize: 48,
            justifySelf: "center",
            alignSelf: "center",
            fontFamily: "Poiret One",
            display: hideUI ? "none" : "flex",
          }}
        >
          {kelvin}K
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 16,
            width: "100%",
            justifyContent: "center",
          }}
        >
          <LinkButton
            text=""
            target="home"
            setPage={setPage}
            icon={require("../assets/back.png")}
            width={80}
            height={50}
            hidden={hideUI}
          />
          <LinkButton
            text="Save"
            target="savedTemps"
            setPage={setPage}
            icon={require("../assets/bookmark.png")}
            width={100}
            height={50}
            fontSize={24}
            kelvin={kelvin}
            setKelvin={setNewRoom}
            onPress={() => setNewRoom(true)}
            hidden={hideUI}
          />
          <TouchableOpacity
            onPress={() => {
              setHideUI(!hideUI);
            }}
          >
            <View
              style={{
                width: 140,
                height: 50,
                display: "flex",
                flexDirection: "row",
                backgroundColor: hideUI ? "rgba(0,0,0,.1)" : "#FFFFAF",
                borderEndColor: "rgba(0, 0, 0, 0.2)",
                borderEndWidth: 4,
                borderBottomWidth: 4,
                gap: 8,
                borderColor: "rgba(0, 0, 0, 0.2)",
                borderRadius: 16,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={
                  hideUI
                    ? require("../assets/eye-closed.png")
                    : require("../assets/eye-open.png")
                }
                style={{
                  width: 40,
                  height: 40,
                  resizeMode: "contain",
                }}
              />
              <Text
                style={{
                  textAlign: "center",
                  color: "black",
                  fontSize: 24,
                  wordWrap: "break-word",
                  fontFamily: "Poiret One",
                }}
              >
                {hideUI ? "Show" : "Hide"} UI
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
