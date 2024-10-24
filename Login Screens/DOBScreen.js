import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DOBScreen = ({ route, navigation }) => {
  const { name, mobileNumber } = route.params;
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [dob, setDob] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handles date change from DateTimePicker
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setDob(currentDate.toLocaleDateString());
    setErrorMessage(""); // Clear error message on date selection
  };

  // Triggers the date picker
  const showDatepicker = () => {
    setShow(true);
  };

  // Validates and navigates to the next screen
  const navigateToLocationScreen = () => {
    if (dob) {
      navigation.navigate("GenderScreen", {
        name,
        dob,
        mobileNumber,
        navigation,
      });
    } else {
      setErrorMessage("Please select your date of birth");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Set Up</Text>
      <View style={styles.textLogin}>
        <Text style={styles.subtitle}>Hi {name}, When’s your birthday?</Text>

        {/* Touchable to trigger DateTimePicker */}
        <TouchableOpacity onPress={showDatepicker}>
          <TextInput
            style={styles.input}
            placeholder="Select date of birth"
            value={dob}
            editable={false}
            pointerEvents="none" // Disable manual editing
          />
        </TouchableOpacity>

        {/* Conditional error message display */}
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        <Text style={styles.subtitle1}>This can’t be changed later</Text>
      </View>

      {/* Display DateTimePicker */}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="spinner"
          onChange={onChange}
          maximumDate={new Date()} // Restrict future dates
        />
      )}

      {/* Done button to validate and navigate */}
      <TouchableOpacity
        style={styles.button}
        onPress={navigateToLocationScreen}
      >
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 45,
    lineHeight: 53.91,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 45,
  },
  textLogin: {
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 40,
    alignSelf: "center",
    fontWeight: "400",
    lineHeight: 23.96,
    color: "#121212",
  },
  subtitle1: {
    fontSize: 12,
    marginBottom: 8,
    alignSelf: "center",
    fontWeight: "400",
    lineHeight: 14.38,
    color: "#121212",
  },
  input: {
    width: 356,
    height: 49,
    borderWidth: 2,
    borderColor: "#6420AA",
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 35,
    color: "black",
  },
  button: {
    width: 356,
    height: 49,
    backgroundColor: "#6420AA",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 15,
    fontSize: 14,
    alignSelf: "center",
  },
});

export default DOBScreen;
