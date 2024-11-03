import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Text, View, Image, StyleSheet } from "react-native";

const VerifyScreen = ({ route, navigation }) => {
  //const navigation = useNavigation();
  const { mobileNumber } = route.params;
  const navigateToNameScreen = () => {
    navigation.navigate("NameScreen", { mobileNumber, navigation });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigateToNameScreen();
    }, 1000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  });

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/Star1.jpg")} // Replace with your image path
          style={styles.image}
        />
        <Image
          source={require("../assets/checkmark.png")} // Replace with your image path
          style={styles.checkmark}
        />
      </View>
      <Text style={styles.verifiedText}>You're verified!</Text>
      <Text style={styles.headerText}>
        Next, set up your profile in just 6 quick steps!
      </Text>
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
  imageContainer: {
    position: "relative", // Needed for overlay positioning
  },
  image: {
    width: 50, // Adjust as needed
    height: 50, // Adjust as needed
    marginBottom: 20,
  },
  verifiedText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#121212",
  },
  headerText: {
    fontWeight: "400",
    fontSize: 16,
    textAlign: "center",
    width: "80%",
    lineHeight: 19.17,
    paddingVertical: 12,
    marginVertical: 12,
  },
  checkmark: {
    position: "absolute",
    width: 18,
    height: 12.86,
    bottom: 38, // Position the checkmark at the bottom-right
    right: 15,
  },
});

export default VerifyScreen;
