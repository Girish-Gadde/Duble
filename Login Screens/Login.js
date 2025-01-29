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
    navigation.navigate("CountryCode", { navigation });
  };

  const navigateToPhoneLoginScreen1 = () => {
    navigation.navigate("PhoneLogin1");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require("../assets/Duble-cover.png")}
          style={styles.headerImage}
        />
        <View style={styles.coffeeView}>
          <Text style={styles.coffeeText}>Coffee for four?</Text>
        </View>
        <View style={styles.saturdayView}>
          <Text style={styles.coffeeText}>Saturday afternoon!</Text>
        </View>
        <View style={styles.smallImageView}>
          <Image
            source={require("../assets/smile-eyes.png")} // Replace with actual image path
            style={styles.smallImage}
          />
        </View>
      </View>
      <Text style={styles.headerText}>
        Meet new friends with Duble. It’s easy and safe!
      </Text>
      <Text style={styles.dubleText}>
        Team up with your best friend on Duble and find your new friends. Match,
        Chat and Meetup!
      </Text>

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
        {/* <TouchableOpacity
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
        </TouchableOpacity> */}
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
    padding: "5%",
  },
  buttonContainer: {
    marginVertical: "4%", // Spacing between the button container and other elements
    width: "90%", // Container takes up 90% of the screen width
    height: "16%",
  },
  button: {
    flexDirection: "row", // Row layout to align icon/image and text side by side
    alignItems: "center", // Vertically centers icon/image and text
    justifyContent: "center", // Centers both icon/image and text horizontally
    paddingVertical: "3%", // Vertical padding for the button
    marginVertical: "2%", // Margin between buttons
    borderRadius: 33, // Rounded corners
    width: "100%", // Button width takes up the full width of the container (90% of screen width)
    height: "40%", // Button height is set to 10% of the screen height
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
    marginRight: "4%", // Space between the icon and text
  },
  buttonText: {
    fontSize: 18, // Text size
    color: "#121212", // Default text color
    textAlign: "center", // Text alignment in the center
  },
  image: {
    width: "8%", // Set image width to 8% of the screen width
    height: undefined, // Allows the aspect ratio to be maintained
    aspectRatio: 1, // Ensures the image remains square
    marginRight: "4%", // Space between the image and text
  },
  headerImage: {
    width: 278.09,
    height: 305,
    marginBottom: 20,
  },
  headerText: {
    fontWeight: "400",
    fontSize: 28,
    textAlign: "center",
    width: 337,
    lineHeight: 33.54,
    paddingTop: 10,
    paddingBottom: 4,
    marginTop: 16,
    marginBottom: 6,
    color: "#121212",
  },
  dubleText: {
    fontWeight: "400",
    fontSize: 16,
    textAlign: "center",
    width: 324,
    lineHeight: 19.17,
    paddingVertical: 3,
    marginTop: 4,
    marginBottom: 20,
    color: "#121212",
  },
  headerContainer: {
    position: "relative",
    width: "100%",
    height: 330, // Set this height based on your image
    alignItems: "center",
  },
  coffeeView: {
    position: "absolute",
    top: "13%",
    left: "80%",
    transform: [{ translateX: -72.5 }, { translateY: -20 }], // Center the 145x40 view
    width: 145,
    height: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  coffeeText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "400",
    lineHeight: 19.17,
    color: "#121212",
  },
  saturdayView: {
    position: "absolute",
    top: "79%",
    left: "18%",
    transform: [{ translateX: -72.5 }, { translateY: -20 }], // Center the 145x40 view
    width: 180,
    height: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  smallImageView: {
    position: "absolute",
    top: "14%", // Adjust positioning as needed
    left: "11%",
    transform: [{ translateX: -26.5 }, { translateY: -20 }], // Center the 53x40 view
    width: 53,
    height: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  smallImage: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
});

export default Login;
