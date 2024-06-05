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

const totalRooms = await AsyncStorage.getItem("totalRooms");
if (totalRooms == null) {
  await AsyncStorage.setItem("totalRooms", "0");
}

export default function SavedTemps({ setPage, kelvin, setKelvin, newRoom }) {
  if (newRoom) {
    AsyncStorage.setItem("totalRooms", parseInt(totalRooms) + 1);
    AsyncStorage.setItem("name" + totalRooms, "");
    AsyncStorage.setItem("temp" + totalRooms, kelvin);
  }

  async function getTemps() {
    let rawData = [];
    for (let i = 0; i < totalRooms; i++) {
      let name = await AsyncStorage.getItem("name" + i);
      let temp = await AsyncStorage.getItem("temp" + i);
      rawData.push([name, temp]);
    }
    let temps = [];
    for (let i = 0; i < rawData.length; i++) {
      temps.push(
        <Temp
          setPage={setPage}
          setKelvin={setKelvin}
          key={"temp" + i}
          label={rawData[i][0]}
          temp={rawData[i][1]}
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
        </View>
      </ScrollView>
    </>
  );
}

function Temp({ label = "Room Name", temp, setPage, setKelvin, roomIdx }) {
  if (!temp) temp = (Math.floor(Math.random() * 80) + 10) * 100;
  async function setRoomName() {
    await AsyncStorage.setItem("name" + roomIdx, label);
  }
  function deleteRoom() {
    AsyncStorage.removeItem("name" + roomIdx);
    AsyncStorage.removeItem("temp" + roomIdx);
    AsyncStorage.setItem("totalRooms", parseInt(totalRooms) - 1);
    for (let i = roomIdx; i < totalRooms - 1; i++) {
      AsyncStorage.setItem("name" + i, AsyncStorage.getItem("name" + (i - 1)));
      AsyncStorage.setItem("temp" + i, AsyncStorage.getItem("temp" + (i - 1)));
    }
  }

  const tempColor = kelvin_table[temp];
  return (
    <View
      style={{
        alignSelf: "stretch",

        backgroundColor:
          "rgb(" + tempColor[0] + "," + tempColor[1] + "," + tempColor[2] + ")",
        borderRadius: 22,
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        padding: 16,
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
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
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
            flex: 1,
            marginRight: -42,
          }}
        >
          {temp + "K"}
        </Text>
        <TouchableOpacity
          onPressIn={() => {
            setKelvin(temp);
            setPage("lightBooth");
          }}
        >
          <Image
            source={require("../assets/light_panel.png")}
            style={{
              height: 42,
              width: 42,
              resizeMode: "contain",
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 12,
              backgroundColor: "rgba(255, 255, 255, 0.5)",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
