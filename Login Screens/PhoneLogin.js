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
import axios from "axios";

const PhoneLogin = ({ route, navigation }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { countryCode } = route.params;

  const handleMobileNumberChange = (text) => {
    const formattedText = text.replace(/[^0-9]/g, "");
    if (formattedText.length <= 10) {
      setMobileNumber(formattedText);
    }
  };

  // const sendOTP = async () => {
  //   if (!mobileNumber) {
  //     setErrorMessage("Phone number is required");
  //     return;
  //   }
  //   setLoading(true);
  //   setErrorMessage("");
  //   try {
  //     const response = await axios.post("http://192.168.1.12:4002/auth/send-otp", {
  //       phone: countryCode + mobileNumber,
  //     });
  //     alert("OTP sent to your phone!");
  //     navigation.navigate("OTPScreen", { mobileNumber: countryCode + mobileNumber });
  //   } catch (error) {
  //     console.error("Error sending OTP:", error);
  //     setErrorMessage("Failed to send OTP");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const sendOTP = async () => {
    if (!mobileNumber) {
      setErrorMessage("Phone number is required");
      return;
    }
    setLoading(true);
    setErrorMessage("");
  
    try {
      const response = await axios.post("http://192.168.1.11:4002/auth/send-otp", {
        phone: countryCode + mobileNumber,
      });
  
      // Extract serviceSid from the response
      const { serviceSid } = response.data;
      console.log(serviceSid);
  
      if (serviceSid) {
        alert("OTP sent to your phone!");
        // Pass both mobileNumber and serviceSid to the OTPScreen
        navigation.navigate("OTPScreen", {
          mobileNumber: countryCode + mobileNumber,
          serviceSid,
          countryCode
        });
      } else {
        setErrorMessage("Service ID is missing in the response.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setErrorMessage("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Log in</Text>
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
        onPress={sendOTP}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Send</Text>
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
