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

const AboutScreen = ({ route, navigation }) => {
  // const navigation = useNavigation();
  const { name, dob, gender, mobileNumber } = route.params;
  const [aboutMe, setAboutMe] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputHeight, setInputHeight] = useState(40);

  const handleInputChange = (text) => {
    // Allow only letters and spaces, removing any invalid characters
    const formattedText = text.replace(/[^A-Za-z\s,!.]/g, "");
    setAboutMe(formattedText);
  };

  const navigateToJobScreen = () => {
    if (!aboutMe) {
      setErrorMessage("Please enter something about yourself");
      return;
    }

    const formattedAboutMe = aboutMe.trim();
    if (formattedAboutMe.length === 0) {
      setErrorMessage("Please enter something about yourself");
      return;
    }

    navigation.navigate("JobScreen", {
      name,
      dob,
      gender,
      aboutMe: formattedAboutMe,
      mobileNumber,
      navigation,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Set Up</Text>
      <View style={styles.textLogin}>
        <Text style={styles.subtitle}>Tell us about yourself</Text>
        <TextInput
          style={[styles.input, { height: inputHeight }]} 
          placeholder="About yourself"
          keyboardType="default"
          autoCapitalize="sentences"
          multiline
          placeholderTextColor="gray"
          value={aboutMe}
          onChangeText={handleInputChange}
          onContentSizeChange={(event) =>
            setInputHeight(event.nativeEvent.contentSize.height + 10)
          }
        />

        <Text style={styles.subtitle1}>This will appear on your profile</Text>
      </View>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
      <TouchableOpacity style={styles.button} onPress={navigateToJobScreen}>
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
    marginBottom: "10%",
    alignSelf: "center",
    // marginLeft: 20,
    fontWeight: "400",
    lineHeight: 23.96,
    color: "#121212",
  },
  subtitle1: {
    fontSize: 12,
    marginBottom: 7,
    alignSelf: "center",
    // marginLeft: 20,
    fontWeight: "400",
    lineHeight: 14.38,
    color: "#121212",
  },
  input: {
    width: 340,
    minHeight: 70, // Minimum height
    maxHeight: 200, // Prevents excessive expansion
    borderWidth: 2,
    borderColor: "#6420AA",
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 15, // Slightly adjusted for better appearance
    fontSize: 18,
    textAlignVertical: "top", // Ensures text starts at the top
    
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

export default AboutScreen;
