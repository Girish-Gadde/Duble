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

const LocationScreen = () => {
  const navigation = useNavigation();

  const navigateToOTPScreen = () => {
    navigation.navigate("PictureScreen");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Set Up</Text>
      <View style={styles.textLogin}>
        <Text style={styles.subtitle}>
          Please provide your location for customized team suggestions
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={navigateToOTPScreen}>
        <Text style={styles.buttonText}>Allow</Text>
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

  button: {
    width: 356,
    height: 49,
    backgroundColor: "#6420AA",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    marginTop: 200,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default LocationScreen;
