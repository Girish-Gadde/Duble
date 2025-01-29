import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import OTPTextInput from "react-native-otp-textinput";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { serverIP } from "@/config";

const OTPScreen = ({ route, navigation }) => {
  const { mobileNumber, serviceSid } = route.params;
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(20); // 20-second cooldown
  const [isCooldownActive, setIsCooldownActive] = useState(true);

  

  useEffect(() => {
    startCooldown();
  }, []);

  const startCooldown = () => {
    setIsCooldownActive(true);
    let timer = 20;
    setCooldown(timer);

    const interval = setInterval(() => {
      timer -= 1;
      setCooldown(timer);
      if (timer === 0) {
        clearInterval(interval);
        setIsCooldownActive(false);
      }
    }, 1000);
  };

  const handleOtpChange = (enteredOtp) => {
    setOtp(enteredOtp);
    if (enteredOtp.length === 6) {
      verifyOtp(enteredOtp);
    }
  };

  const verifyOtp = async (enteredOtp) => {
    if (!enteredOtp) {
      setErrorMessage("OTP is required");
      return;
    }
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(`${serverIP}/auth/verify-otp`, {
        phone: mobileNumber,
        otp: enteredOtp,
        serviceSid,
      });

      if (response.status === 200 && response.data.Details) {
        alert("OTP Verified Successfully!");
        if (response.data.Details === "Navigate to Account Details") {
          navigation.navigate("VerifyScreen", { otp: enteredOtp, mobileNumber });
        } else if (response.data.Details === "Navigate to Home page") {
          await AsyncStorage.setItem("mobileNumber", mobileNumber);
          navigation.navigate("HomeTab", { mobileNumber });
        } else {
          setErrorMessage("Unexpected response. Please try again.");
        }
      } else {
        setErrorMessage(response.data.Details || "Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setErrorMessage("Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const sendOTP = async () => {
    if (!mobileNumber) {
      setErrorMessage("Phone number is required");
      return;
    }
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(`${serverIP}/auth/send-otp`, {
        phone: mobileNumber,
      });

      if (response.data.serviceSid) {
        alert("OTP sent to your phone!");
        route.params.serviceSid = response.data.serviceSid;
        console.log("New serviceSid updated:", response.data.serviceSid);
        startCooldown(); // Restart cooldown after sending OTP
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
      <View style={styles.header}>
        <Text style={styles.title}>Log in</Text>
      </View>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={26} color="#121212" />
      </TouchableOpacity>

      <OTPTextInput
        tintColor="#6420AA"
        offTintColor="#6420AA"
        containerStyle={styles.otpContainer}
        textInputStyle={styles.otpInput}
        handleTextChange={handleOtpChange}
        inputCount={6}
      />

      <Text style={styles.subtitle}>Enter OTP sent to {mobileNumber}</Text>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={() => verifyOtp(otp)}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Done</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={sendOTP} disabled={isCooldownActive}>
        <Text style={[styles.sendText, isCooldownActive && styles.disabledText]}>
          {isCooldownActive ? ` Didn’t received an otp ? send otp again in ${cooldown}s` : "send otp again"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        You will get a otp from Duble to verify your number and this helps us create a safe community for you
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", paddingTop: 50, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", marginVertical: 20 },
  backButton: { marginTop: 20, position: "relative", right: 150, top: -80 },
  title: { fontSize: 45, fontWeight: "700", alignSelf: "center" },
  subtitle: { fontSize: 12, marginBottom: 25, color: "#121212" },
  sendText: { fontSize: 14, marginBottom: 25, color: "#121212", marginTop: 12 },
  underlineText: { textDecorationLine: "underline", color: "#121212" },
  otpContainer: { marginBottom: 20 },
  otpInput: { borderBottomWidth: 2, borderColor: "#6420AA", width: 40, height: 49, fontSize: 24, textAlign: "center" },
  button: { width: 356, height: 49, backgroundColor: "#6420AA", justifyContent: "center", alignItems: "center", borderRadius: 35 },
  buttonDisabled: { backgroundColor: "#9a73ef" },
  buttonText: { color: "#fff", fontSize: 16 },
  loginText: { fontWeight: "400", fontSize: 15, textAlign: "center", width: "85%", paddingVertical: 7, marginBottom: 17 },
  errorText: { color: "red", marginBottom: 15, fontSize: 14 },
  disabledText: { color: "gray" }, // Makes disabled text gray
});

export default OTPScreen;
