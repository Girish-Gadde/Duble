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

const NameScreen = () => {
  const navigation = useNavigation();

  const navigateToDOBScreen = () => {
    navigation.navigate("DOBScreen");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Set Up</Text>
      <View style={styles.textLogin}>
        <Text style={styles.subtitle}>Hi! What’s your name?</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          keyboardType="phone-pad"
        />
        <Text style={styles.subtitle1}>This will appear on your profile</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={navigateToDOBScreen}>
        <Text style={styles.buttonText}>Done</Text>
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
    marginBottom: 45,
  },
  textLogin: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 45,
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
    width: 356,
    height: 49,
    borderWidth: 2,
    borderColor: "#6420AA",
    marginBottom: 10,
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

export default NameScreen;
