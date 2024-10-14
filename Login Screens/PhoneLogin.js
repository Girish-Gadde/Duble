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
import { serverIP } from "../config";

const PhoneLogin = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  //const navigation = useNavigation();

  const handleMobileNumberChange = (text) => {
    // Allow only numeric input and limit the length to 10 digits
    const formattedText = text.replace(/[^0-9]/g, "");
    if (formattedText.length <= 10) {
      setMobileNumber(formattedText);
    }
  };

  const sendPhoneNumberForOtp = async () => {
    navigation.navigate("OTPScreen", { mobileNumber, navigation });
    try {
      const response = await fetch(`${serverIP}/auth/sendOtp`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobileNumber,
          newUser: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response: ", data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  // const navigateToOTPScreen = (phoneNumber) => {
  //   navigation.navigate("OTPScreen", { phoneNumber });
  // };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Log in</Text>
      <View style={styles.textLogin}>
        <Text style={styles.subtitle}>Enter phone number</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone number"
          keyboardType="phone-pad"
          value={mobileNumber}
          onChangeText={handleMobileNumberChange}
        />
        <Text style={styles.subtitle}>OTP will be sent to this number</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={sendPhoneNumberForOtp}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: '15%',
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 45,
    lineHeight: 53.91,
    fontWeight: "700",
    marginTop: '10%',
    marginBottom: '15%',
  },
  textLogin: {
    marginBottom: '5%',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 7,
    alignSelf: "flex-start",
    marginLeft: '5%',
    fontWeight: "400",
    lineHeight: 16.77,
  },
  input: {
    width: 340,
    height: 40,
    borderWidth: 2,
    borderColor: "#6420AA",
    marginBottom: '2%',
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 35,
    fontSize: 24,
    // textAlign: "center",
  },
  button: {
    width: 340,
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
});

export default PhoneLogin;
