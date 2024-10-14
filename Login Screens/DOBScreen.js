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

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    //setShow(false); // Close the picker after a date is selected
    setDate(currentDate);
    setDob(currentDate.toLocaleDateString()); // Format date to display in the input
  };

  const showDatepicker = () => {
    setShow(true); // Open the date picker when tapped
  };

  const navigateToLocationScreen = () => {
    if (!dob) {
      alert("Please select your date of birth.");
      return;
    }
    navigation.navigate("LocationScreen", {
      name,
      dob,
      mobileNumber,
      navigation,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Set Up</Text>
      <View style={styles.textLogin}>
        <Text style={styles.subtitle}>Hi {name}, When’s your birthday?</Text>

        {/* Make sure TouchableOpacity triggers the date picker */}
        <TouchableOpacity onPress={showDatepicker}>
          <TextInput
            style={styles.input}
            placeholder="Select date of birth"
            value={dob}
            editable={false} // Disable direct input
            pointerEvents="none" // Disable interaction on the input field itself
          />
        </TouchableOpacity>

        <Text style={styles.subtitle1}>This can’t be changed later</Text>
      </View>

      {/* Show the date picker when 'show' is true */}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChange}
          maximumDate={new Date()} // Prevent selecting future dates
        />
      )}

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
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 45,
    alignSelf: "center",
    fontWeight: "400",
    lineHeight: 23.96,
    color: "#121212",
  },
  subtitle1: {
    fontSize: 12,
    marginBottom: 10,
    alignSelf: "center",
    fontWeight: "400",
    lineHeight: 14.38,
    color: "#121212",
  },
  input: {
    width: 340,
    height: 40,
    borderWidth: 2,
    borderColor: "#6420AA",
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 35,
    color: "black",
  },
  button: {
    width: 340,
    height: 40,
    backgroundColor: "#6420AA",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default DOBScreen;
