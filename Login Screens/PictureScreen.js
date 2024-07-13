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

const PictureScreen = ({ route }) => {
  const navigation = useNavigation();

  const navigateToSetUpScreen = () => {
    navigation.navigate("SetUpScreen");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Set Up</Text>
      <View style={styles.textLogin}>
        <Text style={styles.subtitle}>Let’s add a few pictures!</Text>
      </View>
      <View style={styles.viewContainer}>
        <Text style={styles.uploadText}>Upload</Text>
      </View>
      <Text style={styles.AddText}>Add more+</Text>
      <TouchableOpacity style={styles.button} onPress={navigateToSetUpScreen}>
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
    marginTop: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  viewContainer: {
    width: 350,
    height: 350,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadText: {
    fontSize: 20,
    fontWeight: "400",
    lineHeight: 23.96,
    textDecorationLine: "underline",
    color: "#121212",
  },
  AddText: {
    fontSize: 20,
    fontWeight: "400",
    lineHeight: 23.96,
    textDecorationLine: "underline",
    color: "#121212",
    marginTop: 25,
  },
});

export default PictureScreen;
