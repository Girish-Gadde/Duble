import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Text, View, Image, StyleSheet } from "react-native";

const SetUpScreen = ({ route, navigation }) => {
  const { mobileNumber } = route.params;
  // const navigation = useNavigation();
  const navigateToNameScreen = () => {
    navigation.navigate("HomeTab", { mobileNumber });
  };

  useEffect(() => {
    const storeMobileNumber = async () => {
      try {
        await AsyncStorage.setItem("mobileNumber", mobileNumber);
        console.log("Mobile number stored in AsyncStorage:", mobileNumber);
      } catch (error) {
        console.error("Error storing mobile number:", error);
      }
    };

    storeMobileNumber();

    const timer = setTimeout(() => {
      navigateToNameScreen();
    }, 1000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  });

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/Star1.jpg")} // Replace with your image path
        style={styles.image}
      />
      <Text style={styles.verifiedText}>You’re all set up!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: 50, // Adjust as needed
    height: 50, // Adjust as needed
    marginBottom: 10,
  },
  verifiedText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#121212",
  },
});

export default SetUpScreen;
