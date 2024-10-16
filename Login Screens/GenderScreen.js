import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

const GenderScreen = ({ route, navigation }) => {
  const { name, dob, mobileNumber } = route.params;
  const [gender, setGender] = useState("");

  const navigateToNextScreen = () => {
    if (gender) {
      navigation.navigate("JobScreen", {
        name,
        dob,
        gender,
        mobileNumber,
        navigation,
      });
    } else {
      alert("Please enter your gender");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Set Up</Text>
      <View style={styles.textLogin}>
        <Text style={styles.subtitle}>Please enter your gender</Text>

        {/* Gender Input Field */}
        <TextInput
          style={styles.input}
          placeholder="Enter your gender"
          keyboardType="default"
          autoCapitalize="none"
          value={gender}
          onChangeText={(text) => setGender(text)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={navigateToNextScreen}>
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
    lineHeight: 53.91,
    fontWeight: "700",
    marginTop: "5%",
    marginBottom: "15%",
  },
  textLogin: {
    marginBottom: "5%",
  },
  subtitle: {
    fontSize: 20,
    marginBottom: "12%",
    alignSelf: "center",
    fontWeight: "400",
    lineHeight: 23.96,
    color: "#121212",
  },
  input: {
    width: 340,
    height: 40,
    borderWidth: 2,
    borderColor: "#6420AA",
    marginBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 35,
    fontSize: 20,
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

export default GenderScreen;
