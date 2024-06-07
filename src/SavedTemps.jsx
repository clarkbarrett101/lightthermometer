import { LinearGradient } from "expo-linear-gradient";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";
import LinkButton from "./LinkButton";
import kelvin_table from "./Kelvin_Table";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function SavedTemps({
  setPage,
  kelvin,
  setKelvin,
  newRoom,
  setNewRoom,
}) {
  const [rawData, setRawData] = useState([]);

  useEffect(() => {
    getRawData();
  }, []);
  useEffect(() => {
    getTemps();
  }, [rawData]);

  async function getRawData() {
    const jsonData = await AsyncStorage.getItem("data");
    if (!jsonData) {
      await AsyncStorage.setItem("data", JSON.stringify([]));
      setRawData([]);
      return;
    }
    const data = JSON.parse(jsonData);
    if (newRoom) {
      const entry = ["", kelvin];
      data.push(entry);
      setNewRoom(false);
    }
    setRawData(data);
    await AsyncStorage.setItem("data", JSON.stringify(data));
  }

  function getTemps() {
    let temps = [];
    for (let i = 0; i < rawData.length; i++) {
      temps.push(
        <Temp
          setPage={setPage}
          setKelvin={setKelvin}
          key={"temp" + i}
          label={rawData[i][0]}
          temp={rawData[i][1]}
          roomIdx={i}
          rawData={rawData}
          setRawData={setRawData}
        />
      );
    }
    return temps;
  }

  return (
    <>
      <View style={{ position: "absolute", left: 10, top: 60, zIndex: 2 }}>
        <LinkButton
          icon={require("../assets/arrow.png")}
          target="home"
          setPage={setPage}
          width={60}
          height={60}
        />
      </View>
      <LinearGradient
        colors={["#D6E1FF", "#FFEEaE"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <ScrollView>
        <View
          style={{
            width: "100%",
            height: "100%",
            top: 10,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            display: "inline-flex",
            gap: 16,
            padding: 16,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "black",
              fontSize: 36,
              fontFamily: "Poiret One",
              fontWeight: "400",
              wordWrap: "break-word",
              padding: 16,
            }}
          >
            My Saved Temperatures
          </Text>
          {getTemps()}
        </View>
      </ScrollView>
    </>
  );
}

//////////////////////////////////

function Temp({
  label = "",
  temp,
  setPage,
  setKelvin,
  roomIdx,
  rawData,
  setRawData,
}) {
  const [name, setName] = useState(label);

  async function setRoomName(text) {
    rawData[roomIdx][0] = text;
    await AsyncStorage.setItem("data", JSON.stringify(rawData));
  }

  async function deleteRoom() {
    rawData.splice(roomIdx, 1);
    setRawData([...rawData]);
    await AsyncStorage.setItem("data", JSON.stringify(rawData));
  }

  const tempColor = kelvin_table[parseInt(temp)];
  const tempColorString = tempColor
    ? `rgb(${tempColor[0]}, ${tempColor[1]}, ${tempColor[2]})`
    : "white";

  return (
    <View
      style={{
        backgroundColor: tempColorString,
        borderRadius: 22,
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        padding: 8,
      }}
    >
      <TouchableOpacity
        style={{
          flexDirection: "row",
          backgroundColor: "rgba(255, 125, 125, 0.5)",
          zIndex: 1,
          borderRadius: 12,
          padding: 4,
          borderEndWidth: 2,
          borderBottomWidth: 2,
          paddingLeft: 12,
          paddingRight: 12,
          borderColor: "rgba(0, 0, 0, 0.1)",
        }}
        onPress={() => {
          deleteRoom();
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "600",
            color: "white",
          }}
        >
          X
        </Text>
      </TouchableOpacity>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <TextInput
          style={{
            textAlign: "center",
            color: "black",
            fontSize: 32,
            fontFamily: "Poiret One",
            fontWeight: "400",
            wordWrap: "break-word",
          }}
          maxLength={18}
          placeholder={"Room Name"}
          editable={true}
          value={name}
          onChangeText={(value) => {
            setName(value);
          }}
          onEndEditing={() => {
            setRoomName(name);
          }}
        />

        <Text
          style={{
            textAlign: "center",
            color: "black",
            fontSize: 24,
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "Poiret One",
            fontWeight: "400",
            wordWrap: "break-word",
            lineHeight: 42,
          }}
        >
          {temp + "K"}
        </Text>
      </View>
      <TouchableOpacity
        onPressIn={() => {
          setKelvin(temp);
          setPage("lightBooth");
        }}
      >
        <Image
          source={require("../assets/light_panel.png")}
          style={{
            height: 48,
            width: 48,
            resizeMode: "contain",
            borderWidth: 1,
            borderColor: "rgba(0, 0, 0, 0.2)",
            borderRadius: 12,
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            borderEndWidth: 4,
            borderBottomWidth: 4,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
