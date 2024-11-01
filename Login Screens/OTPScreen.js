import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import OTPTextInput from "react-native-otp-textinput";
import { serverIP } from "@/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OTPScreen = ({ route, navigation }) => {
  const { mobileNumber } = route.params;
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false)
  //const navigation = useNavigation();

  const sendPhoneNumberForOtp = async () => {
    //  navigation.navigate("OTPScreen", { mobileNumber });
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
      Alert.alert(
        "OTP Sent",
        "OTP is sent once again to the given mobile number.",
        [
          {
            text: "Press Ok and enter OTP",
            onPress: () => console.log("Alert closed"),
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const verifyUserOtp = async (otp) => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await fetch(`${serverIP}/auth/verifyUserOtp`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp,
          mobileNumber,
        }),
      });

      if (!response.ok) {
        setErrorMessage("Please enter a valid OTP");
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      if (data.Details === "Navigate to Account Details") {
        navigation.navigate("VerifyScreen", { otp, mobileNumber, navigation });
      } else if (data.Details === "Navigate to Home page") {
        await AsyncStorage.setItem("mobileNumber", mobileNumber);
        navigation.navigate("HomeTab", { mobileNumber });
      } else {
        alert("Unexpected response. Please try again.");
      }

      console.log("Response: ", data);
    } catch (error) {
      setErrorMessage("Please enter a valid OTP");
      console.error("Error: ", error);
    } finally{
      setLoading(false)
    }
  };

  const handleOtpChange = (enteredOtp) => {
    setOtp(enteredOtp);

    // Automatically verify OTP if it is 4 digits long
    if (enteredOtp.length === 4) {
      verifyUserOtp(enteredOtp);
    }
  };

  const handleDonePress = () => {
    if(!loading){
      verifyUserOtp(otp)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Log in</Text>
      </View>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={26} color="#121212" />
      </TouchableOpacity>

      <OTPTextInput
        tintColor="#6420AA"
        offTintColor="#6420AA"
        containerStyle={styles.otpContainer}
        textInputStyle={styles.otpInput}
        handleTextChange={handleOtpChange}
      />

      <Text style={styles.subtitle}>Enter OTP sent to {mobileNumber}</Text>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <TouchableOpacity 
      style={[styles.button, loading && styles.buttonDisables]}
      onPress={{handleDonePress}}
      disabled={loading}
      >
      {loading ? (
        <ActivityIndicator color="#fff"/>
      ) : (
        <Text style={styles.buttonText}>Done</Text>
      )}
      </TouchableOpacity>
      <TouchableOpacity onPress={sendPhoneNumberForOtp}>
        <Text style={styles.sendText}>Send again</Text>
      </TouchableOpacity>
      <Text style={styles.loginText}>
        You will get a call from Duble to verify your number and this helps us
        create safe community for you
      </Text>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  backButton: {
    //marginRight: 10,
    marginTop: 20,
    position: "relative",
    right: 150,
    top: -80,
  },
  title: {
    fontSize: 45,
    lineHeight: 53.91,
    fontWeight: "700",
    alignSelf: "center",
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 25,
    lineHeight: 14.38,
    color: "#121212",
  },
  sendText: {
    fontSize: 14,
    marginBottom: 25,
    lineHeight: 16.77,
    color: "#121212",
    textDecorationLine: "underline", // Adds underline
    marginTop: 12,
  },
  otpContainer: {
    marginBottom: 20,
  },
  otpInput: {
    borderBottomWidth: 2,
    borderColor: "#6420AA",
    width: 40,
    height: 49,
    fontSize: 24,
    textAlign: "center",
  },
  button: {
    width: 356,
    height: 49,
    backgroundColor: "#6420AA",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
  },
  buttonDisables:{
    backgroundColor:"#9a73ef"
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  loginText: {
    fontWeight: "400",
    fontSize: 15,
    textAlign: "center",
    width: "85%",
    lineHeight: 18.15,
    paddingVertical: 7,
    marginBottom: 17,
  },
  errorText: {
    color: "red",
    marginBottom: 15,
    fontSize: 14,
  },
});

export default OTPScreen;
