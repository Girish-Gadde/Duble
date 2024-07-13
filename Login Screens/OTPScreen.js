import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import OTPTextInput from "react-native-otp-textinput";

const OTPScreen = ({ route }) => {
  const { number } = route.params;
  const navigation = useNavigation();
  const navigateToVerifyScreen = () => {
    navigation.navigate("VerifyScreen");
  };
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
      />

      <Text style={styles.subtitle}>Enter OTP sent to {number}</Text>

      <TouchableOpacity style={styles.button} onPress={navigateToVerifyScreen}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.sendText}>Send again</Text>
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
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default OTPScreen;
