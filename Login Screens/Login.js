import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Login = () => {
  const [activeButton, setActiveButton] = useState(null);
  const navigation = useNavigation();

  const navigateToPhoneLoginScreen = () => {
    navigation.navigate("PhoneLogin", { navigation });
  };

  const navigateToPhoneLoginScreen1 = () => {
    navigation.navigate("PhoneLogin1");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Image
        source={require("../assets/Duble-Image.jpg")}
        style={styles.headerImage}
      /> */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            activeButton === "phone"
              ? styles.activeButton
              : styles.activeButton,
          ]}
          onPress={navigateToPhoneLoginScreen}
        >
          <Icon
            name="phone"
            size={16}
            color={activeButton === "phone" ? "#EDEEF1" : "#EDEEF1"}
            style={styles.icon}
          />
          <Text
            style={[
              styles.buttonText,
              { color: activeButton === "phone" ? "#EDEEF1" : "#EDEEF1" },
            ]}
          >
            Login with Phone Number
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            activeButton === "gmail"
              ? styles.activeButton
              : styles.inactiveButton,
          ]}
          onPress={navigateToPhoneLoginScreen1}
        >
          <Image
            source={require("../assets/gmail-1.jpg")}
            style={styles.image}
          />
          <Text
            style={[
              styles.buttonText,
              { color: activeButton === "gmail" ? "#EDEEF1" : "#121212" },
            ]}
          >
            Login with Gmail
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    //alignContent:'center',
    alignItems: "center",
    padding: '5%',
  },
  buttonContainer: {
    marginVertical: '4%', // Spacing between the button container and other elements
    width: '100%', // Container takes up 90% of the screen width
    height:'16%'
  },
  button: {
    flexDirection: "row", // Row layout to align icon/image and text side by side
    alignItems: "center", // Vertically centers icon/image and text
    justifyContent: "center", // Centers both icon/image and text horizontally
    paddingVertical: '3%', // Vertical padding for the button
    marginVertical: '2%', // Margin between buttons
    borderRadius: 33, // Rounded corners
    width: '100%', // Button width takes up the full width of the container (90% of screen width)
    height: '40%', // Button height is set to 10% of the screen height
  },
  activeButton: {
    backgroundColor: "#6420AA", // Background color for the active button
  },
  inactiveButton: {
    backgroundColor: "#fff", // Background color for the inactive button
    borderWidth: 2, // Border width for inactive button
    borderColor: "#6420AA", // Border color for inactive button
  },
  icon: {
    marginRight: '4%', // Space between the icon and text
  },
  buttonText: {
    fontSize: 18, // Text size
    color: "#121212", // Default text color
    textAlign: "center", // Text alignment in the center
  },
  image: {
    width: '8%', // Set image width to 8% of the screen width
    height: undefined, // Allows the aspect ratio to be maintained
    aspectRatio: 1, // Ensures the image remains square
    marginRight: '4%', // Space between the image and text
  },
  headerImage: {
    width: "112%",
    height: "80%",
    marginBottom: 20,
  },
});

export default Login;