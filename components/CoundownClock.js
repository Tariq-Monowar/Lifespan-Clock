import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const CountdownClock = () => {
  const navigation = useNavigation();
  const [storeTime, setStoreTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [fontLoaded] = useFonts({
    borel: require("../assets/font/Courgette-Regular.ttf"),
  });


  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("my-key");
      if (value !== null) {
        const jsonObject = JSON.parse(value);
        const newStoreTime = new Date(
          jsonObject.year,
          jsonObject.month - 1,
          jsonObject.day
        );
        setStoreTime(newStoreTime);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const calculateTimeSinceBirth = () => {
    if (storeTime) {
      const now = new Date();
      const timeDiff = Math.abs(now.getTime() - storeTime.getTime());

      const days = Math.floor(timeDiff / (1000 * 3600 * 24));
      const hours = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));
      const minutes = Math.floor((timeDiff % (1000 * 3600)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }
  };

  useEffect(() => {
    calculateTimeSinceBirth();

    const interval = setInterval(calculateTimeSinceBirth, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [storeTime]);

  return (
    <>
      <StatusBar
        translucent={true}
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <ImageBackground
        source={require("../assets/Light-Background-Best-Wallpaper-transformed.jpg")}
        style={[
          styles.app_background,
          { marginTop: -StatusBar.currentHeight - 100 },
        ]}
      >
        {fontLoaded && (
          <View
            style={[
              styles.blurContainer,
              { marginTop: -StatusBar.currentHeight - 100 },
            ]}
          >
            <TouchableOpacity
              onPress={()=>navigation.navigate('SetCoundown')}
              style={styles.setTime}
            >
              <Text style={styles.setTimeText}>Set</Text>
            </TouchableOpacity>
            <View style={styles.countContainer}>

              <View style={styles.daysView}>
                <Text style={[styles.daysNumber, { fontFamily: "borel" }]}>
                  {timeLeft.days.toString().padStart(4, "0")}
                </Text>
                <Text style={[styles.days, { fontFamily: "borel" }]}>day</Text>
              </View>

              <View style={styles.HMS}>
                <View style={styles.HMSView}>
                  <Text style={[styles.HMSNumber, { fontFamily: "borel" }]}>
                    {timeLeft.hours.toString().padStart(2, "0")}
                  </Text>
                  <Text style={[styles.HMSsymbol, { fontFamily: "borel" }]}>
                    h
                  </Text>
                </View>
                <View style={styles.HMSView}>
                  <Text style={[styles.HMSNumber, { fontFamily: "borel" }]}>
                    {timeLeft.minutes.toString().padStart(2, "0")}
                  </Text>
                  <Text style={[styles.HMSsymbol, { fontFamily: "borel" }]}>
                    m
                  </Text>
                </View>
                <View style={styles.HMSView}>
                  <Text style={[styles.HMSNumber, { fontFamily: "borel" }]}>
                    {timeLeft.seconds.toString().padStart(2, "0")}
                  </Text>
                  <Text style={[styles.HMSsymbol, { fontFamily: "borel" }]}>
                    s
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </ImageBackground>
    </>
  );
};

export default CountdownClock;

const styles = StyleSheet.create({
  app_background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },

  setTime: {
    color: "#000",
    marginBottom: -20,
    marginLeft: "auto",
    marginRight: 20,
  },
  setTimeText: {
    fontSize: 20,
  },

  blurContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  countContainer: {
    marginTop: 200,
  },
  daysView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  daysNumber: {
    fontSize: 50,
    marginLeft: -28,
  },
  days: {
    fontSize: 22,
    marginTop: 40,
    marginLeft: -3,
  },

  HMS: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },

  HMSView: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 25,
    marginTop: 6,
  },
  HMSNumber: {
    fontSize: 36,
    width: 45
  },
  HMSsymbol: {
    fontSize: 21,
    marginTop: 20,
    marginLeft: -6
  },
});



//https://www.google.com/search?q=life+clock+time+graphic&tbm=isch&ved=2ahUKEwj-4KXK_p2BAxW_2zgGHc7PDF8Q2-cCegQIABAA&oq=life+clock+time+graphic&gs_lcp=CgNpbWcQAzoECCMQJzoHCAAQExCABDoICAAQCBAeEBNQywdY4hBgoBdoAHAAeACAAaMBiAGUB5IBAzAuNpgBAKABAaoBC2d3cy13aXotaW1nwAEB&sclient=img&ei=raL8ZL7WNL-34-EPzp-z-AU&bih=651&biw=1366&rlz=1C1UEAD_enBD1074BD1074#imgrc=1RsXxA1nIYbvPM&imgdii=xLZ3hHyjNsn4WM