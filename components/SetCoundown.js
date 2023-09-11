import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { pickerData } from "./PickerData";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const SetCountdown = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [selectedMonth, setSelectedMonth] = useState("1");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [fontLoaded] = useFonts({
    courgette: require("../assets/font/Courgette-Regular.ttf"),
  });

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  // Convert Bengali digits to English digits
  const convertToEnglishDigits = (number) => {
    const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const convertedNumber = number
      .split("")
      .map((char) =>
        bengaliDigits.includes(char)
          ? englishDigits[bengaliDigits.indexOf(char)]
          : char
      )
      .join("");
    return convertedNumber;
  };

  // Handle form submission
  const handleSubmit = async () => {
    const now = new Date();
    const currentYear = now.getFullYear();

    const isNumber = /^[0-9]+$/;

    const convertedDay = convertToEnglishDigits(selectedDay);
    const convertedYear = convertToEnglishDigits(selectedYear);

    if (convertedDay === "" && convertedYear === "") {
      showToast("Please enter your birthday");
    } else if (convertedDay === "") {
      showToast("Please enter the day!");
    } else if (!isNumber.test(convertedDay)) {
      showToast(`Oops! ${convertedDay}, The day must be a number.`);
    } else if (convertedYear === "") {
      showToast("Please enter the year");
    } else if (!isNumber.test(convertedYear)) {
      showToast(`Invalid characters: ${convertedYear} in the year!`);
    } else if (convertedDay > 31 || convertedDay < 1) {
      showToast("Oops! Day should be 1-31");
    } else if (convertedYear > currentYear) {
      showToast("Birthday can't be in the future!");
    } else {
      const userData = {
        day: convertedDay,
        month: selectedMonth,
        year: convertedYear,
      };

      const newStoreTime = new Date(
        convertedYear,
        parseInt(selectedMonth) - 1,
        convertedDay
      );

      // navigation.navigate("DrawerNavigator", { updatedStoreTime: newStoreTime });
      navigation.navigate("DrawerNavigator");


      try {
        await AsyncStorage.setItem("my-key", JSON.stringify(userData));
        console.log("success");
      } catch (e) {
        console.log(e);
      }
    }
  };

  // Render component
  return (
    <ImageBackground
      source={require("../assets/Light-Background-Best-Wallpaper-transformed.jpg")}
      style={styles.app_background}
      resizeMode="cover"
    >
      {/* Input field for day */}
      <TextInput
        style={[styles.input, fontLoaded && { fontFamily: "courgette" }]}
        placeholder="Day (1-31)"
        value={selectedDay}
        maxLength={2}
        onChangeText={(day) => setSelectedDay(day)}
        keyboardType="numeric"
      />

      {/* Picker for month */}
      <View style={styles.pickerView}>
        <Picker
          selectedValue={selectedMonth}
          onValueChange={(month) => setSelectedMonth(month)}
          style={styles.input_picker}
        >
          {pickerData.map((data) => (
            <Picker.Item
              style={styles.pickerItem}
              key={data.value}
              label={data.label}
              value={data.value}
            />
          ))}
        </Picker>
      </View>

      {/* Input field for year */}
      <TextInput
        style={[styles.input, fontLoaded && { fontFamily: "courgette" }]}
        placeholder="Year"
        maxLength={4}
        value={selectedYear}
        onChangeText={(year) => setSelectedYear(year)}
        keyboardType="numeric"
      />

      {/* Submit button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text
          style={[
            styles.submitButtonText,
            fontLoaded && { fontFamily: "courgette" },
          ]}
        >
          Submit
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

// Styles
const styles = StyleSheet.create({
  app_background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#57b3a4",
    fontSize: 19,
    marginVertical: 12,
    paddingLeft: 20,
    borderRadius: 10,
  },
  pickerView: {
    width: "80%",
    alignItems: "center",
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#57b3a4",
    borderRadius: 10,
  },
  input_picker: {
    width: "100%",
    height: 40,
    fontSize: 25,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 12,
    marginTop: -11,
  },
  pickerItem: {
    fontSize: 20,
  },
  submitButton: {
    backgroundColor: "#57b3a4",
    padding: 8,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
    width: "80%",
  },
  submitButtonText: {
    color: "white",
    fontSize: 21,
  },
});

export default SetCountdown;
