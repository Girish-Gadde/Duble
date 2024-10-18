import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const GenderScreen = ({ route, navigation }) => {
  const { name, dob, mobileNumber } = route.params;
  const [gender, setGender] = useState("");
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigateToNextScreen = () => {
    if (gender) {
      navigation.navigate("JobScreen", {
        name,
        dob,
        gender,
        mobileNumber,
        navigation,
      });
    } else {
      setErrorMessage("Please select your gender");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Set Up</Text>
      <View style={styles.textLogin}>
        <Text style={styles.subtitle}>Please select your gender</Text>
        {/* Gender Dropdown List */}
        <DropDownPicker
          open={open}
          value={gender}
          items={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Non-binary", value: "non-binary" },
            { label: "Other", value: "other" },
          ]}
          setOpen={setOpen}
          setValue={setGender}
          placeholder="Select your gender"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropDownContainer}
        />

        {/* Gender Input Field */}
        {/* <TextInput
          style={styles.input}
          placeholder="Enter your gender"
          keyboardType="default"
          autoCapitalize="none"
          value={gender}
          onChangeText={(text) => setGender(text)}
        /> */}
      </View>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
      <TouchableOpacity
        style={[styles.button, open && { marginTop: 150 }]}
        onPress={navigateToNextScreen}
      >
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
    marginBottom: "6%",
  },
  subtitle: {
    fontSize: 20,
    marginBottom: "10%",
    alignSelf: "center",
    fontWeight: "400",
    lineHeight: 23.96,
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
    width: "88%",
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
  dropdown: {
    borderColor: "gray",
    backgroundColor: "#fff",
    width: "85%",
  },
  dropDownContainer: {
    borderColor: "gray",
    width: "85%",
  },
});

export default GenderScreen;
