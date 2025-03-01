import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { Picker } from "@react-native-picker/picker";

const HeightScreen = ({ route, navigation }) => {
  const { name, dob, gender, aboutMe, occupation, mobileNumber } = route.params;
  const [feet, setFeet] = useState("5"); // Default: 5 feet
  const [inches, setInches] = useState("0"); // Default: 0 inches

  const navigateToLocScreen = () => {
    if (feet && inches !== "") {
      const selectedHeight = `${feet}'${inches}"`;
      console.log(selectedHeight, 'HT')
      navigation.navigate("PictureScreen", {
        name,
        dob,
        gender,
        aboutMe,
        occupation,
        mobileNumber,
        height: selectedHeight, // Sending formatted height
      });
    } else {
      alert("Please select your height");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Set Up</Text>
      <View style={styles.textLogin}>
        <Text style={styles.subtitle}>Select your height</Text>

        {/* Feet Picker */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={feet}
            onValueChange={(itemValue) => setFeet(itemValue)}
            style={styles.picker}
          >
            {Array.from({ length: 7 }, (_, i) => (
              <Picker.Item key={i} label={`${4 + i} ft`} value={`${4 + i}`} />
            ))}
          </Picker>
        </View>

        {/* Inches Picker */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={inches}
            onValueChange={(itemValue) => setInches(itemValue)}
            style={styles.picker}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <Picker.Item key={i} label={`${i} in`} value={`${i}`} />
            ))}
          </Picker>
        </View>

        <Text style={styles.subtitle1}>This will appear on your profile</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={navigateToLocScreen}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: "15%",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 45,
    fontWeight: "700",
    marginTop: "5%",
    marginBottom: "15%",
  },
  textLogin: {
    marginBottom: "3.5%",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 20,
    marginBottom: "10%",
    fontWeight: "400",
    color: "#121212",
  },
  subtitle1: {
    fontSize: 12,
    marginBottom: 7,
    fontWeight: "400",
    color: "#121212",
  },
  pickerContainer: {
    width: 340,
    borderWidth: 2,
    borderColor: "#6420AA",
    borderRadius: 35,
    backgroundColor: "#fff",
    overflow: "hidden",
    marginBottom: 10,
  },
  picker: {
    width: "100%",
    height: 40,
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

export default HeightScreen;

