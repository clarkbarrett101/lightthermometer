import LinkButton from "./LinkButton";
import { View, Image, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function Home({ setPage }) {
  return (
    <>
      <LinearGradient
        colors={["#D6E1FF", "#FFE49E"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: "100%",
          zIndex: 1,
        }}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          padding: 16,
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          zIndex: 2,
        }}
      >
        <LinkButton
          text="Measure light temperature"
          target="driver"
          setPage={setPage}
          icon={require("../assets/Thermometer.png")}
          fontSize={24}
        />
        <LinkButton
          text="Simulate lighting conditions"
          target="lightBooth"
          setPage={setPage}
          icon={require("../assets/light_panel.png")}
          fontSize={24}
        />
        <LinkButton
          text="Saved temperatures"
          target="savedTemps"
          setPage={setPage}
          icon={require("../assets/save.png")}
          fontSize={24}
        />
        <Text
          style={{
            fontSize: 48,
            textAlign: "center",
            fontFamily: "Poiret One",
            padding: 16,
          }}
        >
          Light Thermometer
        </Text>
      </View>
    </>
  );
}
/*
<View style={{ display: "flex", flexDirection: "row" }}>
<Text
  style={{
    fontSize: 24,
    fontFamily: "Poiret One",
    flex: 1,
    textAlign: "center",
    marginRight: -64,
  }}
>
  by
</Text>
<Logo style={{ width: 64, height: 64 }} />
</View>
*/
