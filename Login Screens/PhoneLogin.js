import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

const PhoneLogin = () => {
  const navigation = useNavigation();

  const number = "9998886644";

  const navigateToOTPScreen = () => {
    navigation.navigate("OTPScreen", { number });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Log in</Text>
      <View style={styles.textLogin}>
        <Text style={styles.subtitle}>Enter phone number</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone number"
          keyboardType="phone-pad"
        />
        <Text style={styles.subtitle}>OTP will be sent to this number</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={navigateToOTPScreen}>
        <Text style={styles.buttonText}>Verify</Text>
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
    marginBottom: 60,
  },
  textLogin: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 7,
    alignSelf: "flex-start",
    marginLeft: 20,
    fontWeight: "400",
    lineHeight: 16.77,
  },
  input: {
    width: 356,
    height: 49,
    borderWidth: 2,
    borderColor: "#6420AA",
    marginBottom: 7,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 35,
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

export default PhoneLogin;
