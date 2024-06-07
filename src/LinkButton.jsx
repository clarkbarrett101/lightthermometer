import React from "react";
import { Text, Image, TouchableOpacity, View } from "react-native";
import Logo from "./Logo";

const LinkButton = ({
  setPage,
  text = "",
  target,
  icon,
  hidden,
  fontSize,
  width,
  height,
  kelvin,
  setKelvin,
  onPress,
}) => {
  function textarea() {
    if (text === "") {
      return null;
    } else {
      return (
        <Text
          style={{
            textAlign: "center",
            color: "black",
            fontSize: fontSize ? fontSize : 32,
            wordWrap: "break-word",
            fontFamily: "Poiret One",
            flex: 2,
          }}
        >
          {text}
        </Text>
      );
    }
  }

  return (
    <TouchableOpacity
      onPressIn={() => {
        setPage(target);
        if (onPress) {
          onPress();
        }
      }}
    >
      <View
        style={{
          width: width ? width : "100%",
          height: height ? height : 100,
          backgroundColor: "#FFE86E",
          borderEndColor: "rgba(0, 0, 0, 0.2)",
          borderEndWidth: 4,
          borderBottomWidth: 4,
          borderColor: "rgba(0, 0, 0, 0.2)",
          borderRadius: 16,
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
          display: hidden ? "none" : "flex",
          flexDirection: "row",
          padding: 4,
        }}
      >
        <Image
          source={icon}
          style={{
            flex: 1,
            resizeMode: "contain",
            maxHeight: height ? height - 4 : "auto",
            maxWidth: width ? width - 4 : "auto",
          }}
        />
        {textarea()}
      </View>
    </TouchableOpacity>
  );
};

export default LinkButton;
