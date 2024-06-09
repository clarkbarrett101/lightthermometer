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
          paddingBottom: 48,
          justifyContent: "flex-end",
          alignItems: "center",
          height: "100%",
          zIndex: 2,
        }}
      >
        <LinkButton
          text="Measure light temperature"
          target="driver"
          setPage={setPage}
          icon={require("../assets/lighttherm.png")}
          fontSize={24}
          height={100}
        />
        <LinkButton
          text="Simulate lighting conditions"
          target="lightBooth"
          setPage={setPage}
          icon={require("../assets/lightbooth.png")}
          fontSize={24}
          height={100}
        />
        <LinkButton
          text="Saved temperatures"
          target="savedTemps"
          setPage={setPage}
          icon={require("../assets/list.png")}
          fontSize={24}
          height={80}
          padding={16}
        />
        <Text
          style={{
            fontSize: 48,
            textAlign: "center",
            fontFamily: "Poiret One",
            padding: 16,
            paddingBottom: 0,
          }}
        >
          Light Thermometer
        </Text>
        <Text
          style={{
            fontSize: 24,
            textAlign: "center",
            fontFamily: "Poiret One",
            padding: 0,
          }}
        >
          by
        </Text>
        <Image
          source={require("../assets/logo.png")}
          style={{
            width: 96,
            height: 96,
            resizeMode: "contain",
          }}
        />
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
