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

const NameScreen = ({ route, navigation }) => {
  // const navigation = useNavigation();
  const { mobileNumber } = route.params;
  const [name, setName] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");


  const handleNameChange = (text) => {
    const validName = text.replace(/[^a-zA-Z\s]/g, ""); // Allows only letters and spaces
    setName(validName);
  };


  const navigateToDOBScreen = () => {
    if(!name){
      setErrorMessage("Please enter your name");
      return 
    }
    const formattedName = name.trim();
    if (formattedName.length === 0) {
      setErrorMessage("Please enter your name");
      return
    }
    
    navigation.navigate("DOBScreen", { name: formattedName, mobileNumber, navigation });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Set Up</Text>
      <View style={styles.textLogin}>
        <Text style={styles.subtitle}>Hi! What’s your name?</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          placeholderTextColor="#D3D3D3"
          keyboardType="default"
          autoCapitalize="none"
          value={name}
          onChangeText={handleNameChange}
          maxLength={27}
        />

        <Text style={styles.subtitle1}>This will appear on your profile</Text>
      </View>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
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
    paddingTop: "15%",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 45,
    lineHeight: 53.91,
    fontWeight: "700",
    marginTop: "5%",
    marginBottom: "15%",
  },
  textLogin: {
    marginBottom: "3.5%",
  },
  subtitle: {
    fontSize: 20,
    marginBottom: "12%",
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
    width: 340,
    height: 40,
    borderWidth: 2,
    borderColor: "#6420AA",
    marginBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 35,
    fontSize: 20,
  },
  button: {
    width: 340,
    height: 40,
    backgroundColor: "#6420AA",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 15,
    fontSize: 14,
  },
});

export default NameScreen;
