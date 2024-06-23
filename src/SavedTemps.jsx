import { LinearGradient } from "expo-linear-gradient";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  Dimensions,
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
  const heightRatio = Dimensions.get("window").height / 812;

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
    for (let i = rawData.length - 1; i >= 0; i--) {
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
          heightRatio={heightRatio}
        />
      );
    }
    return temps;
  }

  return (
    <>
      <View
        style={{
          position: "absolute",
          left: 10,
          top: 60 * heightRatio,
          zIndex: 2,
        }}
      >
        <LinkButton
          icon={require("../assets/back.png")}
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
            top: 10 * heightRatio,
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
              fontSize: 36 * heightRatio,
              fontFamily: "Poiret One",
              fontWeight: "400",
              wordWrap: "break-word",
              padding: 16 * heightRatio,
              width: "80%",
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
  heightRatio,
}) {
  const [name, setName] = useState(label);
  useEffect(() => {
    setName(label);
  }, [label]);

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
        borderRadius: 22 * heightRatio,
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        padding: 8 * heightRatio,
      }}
    >
      <TouchableOpacity
        style={{
          flexDirection: "row",
          backgroundColor: "rgba(255, 125, 125, 0.5)",
          zIndex: 1,
          borderRadius: 12 * heightRatio,
          padding: 4 * heightRatio,
          borderEndWidth: 2 * heightRatio,
          borderBottomWidth: 2 * heightRatio,
          paddingLeft: 12 * heightRatio,
          paddingRight: 12 * heightRatio,
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
            fontSize: 32 * heightRatio,
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
            fontSize: 24 * heightRatio,
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "Poiret One",
            fontWeight: "400",
            wordWrap: "break-word",
            lineHeight: 42 * heightRatio,
          }}
        >
          {temp} K
        </Text>
      </View>
      <TouchableOpacity
        onPressIn={() => {
          setKelvin(temp);
          setPage("lightBooth");
        }}
      >
        <Image
          source={require("../assets/lightbooth.png")}
          style={{
            height: 48 * heightRatio,
            width: 48 * heightRatio,
            resizeMode: "contain",
            borderWidth: 1,
            borderColor: "rgba(0, 0, 0, 0.2)",
            borderRadius: 12 * heightRatio,
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            borderEndWidth: 4 * heightRatio,
            borderBottomWidth: 4 * heightRatio,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
