import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";

const DubleStart = () => {
  const navigation = useNavigation();
  const navigateToLoginScreen = () => {
    navigation.navigate("Login", {navigation});
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigateToLoginScreen();
    }, 1000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  });
  return (
    <View style={styles.container}>
      <Image source={require("../assets/Vector.png")} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6420AA",
  },
  image: {
    width: 98,
    height: 85,
  },
});

export default DubleStart;
