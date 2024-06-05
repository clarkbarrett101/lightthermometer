import { View, Text } from "react-native";
import { useEffect, useState } from "react";

function CountDown({ setFlicker, setStartCountdown }) {
  const [countdown, setCountdown] = useState(5);
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          setFlicker(true);
          setStartCountdown(false);
          clearInterval(interval);
          return 5;
        }
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 10,
        backgroundColor: "black",
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 100,
          textAlign: "center",
          marginTop: "50%",
        }}
      >
        {countdown}
      </Text>
    </View>
  );
}
export default CountDown;
