import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

const JobScreen = ({ route, navigation }) => {
  // const navigation = useNavigation();
  const { name, dob, gender, mobileNumber } = route.params;
  const [occupation, setOccupation] = useState(null);
  const navigateToLocScreen = () => {
    if (occupation) {
      navigation.navigate("LocationScreen", {
        name,
        dob,
        gender,
        occupation,
        mobileNumber,
        navigation,
      });
    } else {
      alert("Please enter your occupation");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Set Up</Text>
      <View style={styles.textLogin}>
        <Text style={styles.subtitle}>Hey, What do you do?</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter occupation"
          keyboardType="default"
          autoCapitalize="none"
          value={occupation}
          onChangeText={(text) => setOccupation(text)}
        />

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
    // marginLeft: 20,
    fontWeight: "400",
    lineHeight: 23.96,
    color: "#121212",
  },
  subtitle1: {
    fontSize: 12,
    marginBottom: 10,
    alignSelf: "center",
    // marginLeft: 20,
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

export default JobScreen;
