import { useEffect, useState } from "react";
import { View } from "react-native";

export default function EndScreen({ setPage }) {
  const [round, setRound] = useState(0);
  const [screenColor, setScreenColor] = useState("000000");
  useEffect(() => {
    setTimeout(() => {
      if (round === 0) {
        setScreenColor("88ff44");
        setRound(1);
      } else if (round === 1) {
        setScreenColor("000000");
        setRound(2);
      } else if (round === 2) {
        setScreenColor("88ff44");
        setRound(3);
      } else if (round === 3) {
        setPage("lightBooth");
      }
    }, 150);
  }, [round]);
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: `#${screenColor}`,
      }}
    />
  );
}
