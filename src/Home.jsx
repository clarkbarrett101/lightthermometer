import LinkButton from "./LinkButton";
import { View, Image, Text, Dimensions } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Logo, LogoText, SloganText } from "./Logo";

export default function Home({ setPage }) {
  const screenSize = Dimensions.get("window");
  console.log(screenSize);
  const heightRatio = screenSize.height / 812;
  const widthRatio = screenSize.width / 375;
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
          gap: 16 * heightRatio,
          padding: 16,
          paddingBottom: 32 * heightRatio,
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
          fontSize={24 * heightRatio}
          height={100 * heightRatio}
        />
        <LinkButton
          text="Simulate lighting conditions"
          target="lightBooth"
          setPage={setPage}
          icon={require("../assets/lightbooth.png")}
          fontSize={24 * heightRatio}
          height={100 * heightRatio}
        />
        <LinkButton
          text="Saved temperatures"
          target="savedTemps"
          setPage={setPage}
          icon={require("../assets/ListIcon.png")}
          fontSize={24 * heightRatio}
          height={100 * heightRatio}
          imgPadding={30 * heightRatio}
        />
        <Text
          style={{
            fontSize: 48 * heightRatio,
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
            fontSize: 24 * heightRatio,
            textAlign: "center",
            fontFamily: "Poiret One",
            padding: 0,
            marginTop: -12 * heightRatio,
          }}
        >
          by
        </Text>
        <Logo
          style={{
            width: 72 * heightRatio,
            height: 96 * heightRatio,
            resizeMode: "contain",
            marginLeft: -4,
            zIndex: 3,
            marginTop: -16 * heightRatio,
            marginBottom: -16 * heightRatio,
          }}
          heightRatio={heightRatio}
        />
      </View>
    </>
  );
}
