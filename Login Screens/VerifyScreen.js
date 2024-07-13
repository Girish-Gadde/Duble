import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Text, View, Image, StyleSheet } from "react-native";

const VerifyScreen = () => {
  const navigation = useNavigation();
  const navigateToNameScreen = () => {
    navigation.navigate("NameScreen");
  };

  useEffect(() => {
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
      <Text style={styles.verifiedText}>Verified!</Text>
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

export default VerifyScreen;
