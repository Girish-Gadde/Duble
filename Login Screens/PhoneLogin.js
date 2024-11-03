import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { serverIP } from "../config";

const PhoneLogin = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  //const navigation = useNavigation();

  const handleMobileNumberChange = (text) => {
    // Allow only numeric input and limit the length to 10 digits
    const formattedText = text.replace(/[^0-9]/g, "");
    if (formattedText.length <= 10) {
      setMobileNumber(formattedText);
    }
  };

  const sendPhoneNumberForOtp = async () => {
    setLoading(true);
    setErrorMessage("");
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
        setErrorMessage("Please enter a valid mobile number");
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      navigation.navigate("OTPScreen", { mobileNumber, navigation });
      console.log("Response: ", data);
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  // const navigateToOTPScreen = (phoneNumber) => {
  //   navigation.navigate("OTPScreen", { phoneNumber });
  // };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Log in</Text>
      {/* <Text style={styles.loginText}>
        Enter your phone number to team up with your best friend and meet new
        people!
      </Text> */}
      <View style={styles.textLogin}>
        <Text style={styles.subtitle}>Enter phone number</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone number"
          placeholderTextColor="#D3D3D3"
          keyboardType="phone-pad"
          value={mobileNumber}
          onChangeText={handleMobileNumberChange}
        />
        <Text style={styles.subtitle}>OTP will be sent to this number</Text>
      </View>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={sendPhoneNumberForOtp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Verify</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.messageText}>
        Don't worry! Your number is safe with us and is stored in encrypted form
      </Text>
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
    marginTop: "10%",
    marginBottom: "16%",
  },
  textLogin: {
    marginBottom: "4%",
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 7,
    alignSelf: "flex-start",
    marginLeft: "5%",
    fontWeight: "400",
    lineHeight: 16.77,
  },
  input: {
    width: 340,
    height: 40,
    borderWidth: 2,
    borderColor: "#6420AA",
    marginBottom: "2%",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 35,
    fontSize: 20,
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
  buttonDisabled: {
    backgroundColor: "#9a73ef",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  // loginText: {
  //   fontWeight: "400",
  //   fontSize: 15,
  //   textAlign: "center",
  //   width: "80%",
  //   lineHeight: 18.15,
  //   paddingVertical: 7,
  //   marginBottom: 17,
  // },
  messageText: {
    fontWeight: "400",
    fontSize: 12,
    textAlign: "center",
    width: "84%",
    lineHeight: 14.52,
    paddingVertical: 10,
    marginVertical: 15,
  },
  errorText: {
    color: "red",
    marginBottom: 15,
    fontSize: 14,
  },
});

export default PhoneLogin;
