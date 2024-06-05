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
            fontSize: 36,
            textAlign: "center",
            fontFamily: "Poiret One",
          }}
        >
          Light Thermometer
        </Text>
        <Text style={{ fontSize: 24, fontFamily: "Poiret One" }}>by</Text>
        <Image
          source={require("../assets/warning.png")}
          style={{ height: 200, width: 200 }}
        />
      </View>
    </>
  );
}
