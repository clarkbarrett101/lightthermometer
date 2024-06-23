import { View, Text } from "react-native";
import { useEffect, useState } from "react";

function CountDown({ setFlicker, setStartCountdown }) {
  const [countdown, setCountdown] = useState(5);
  const [background, setBackground] = useState("white");
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 0) {
          const color = Math.min(prev * 225, 255);
          setBackground(`rgb(${color},${color},${color})`);
          return prev - 0.05;
        } else {
          setFlicker(true);
          setStartCountdown(false);
          clearInterval(interval);
          return 5;
        }
      });
    }, 50);
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
        backgroundColor: background,
      }}
    >
      <Text
        style={{
          color: "black",
          fontSize: 100,
          textAlign: "center",
          marginTop: "50%",
        }}
      >
        {Math.round(countdown)}
      </Text>
    </View>
  );
}
export default CountDown;
