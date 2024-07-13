import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { toggleEditButtonAndBio } from "../components/Redux/Actions";
import { useNavigation } from "@react-navigation/native";

const HeaderTitleWithIcon2 = ({ title, iconName, iconName1 }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleMenuClick = () => {
    // Dispatch action to toggle the state
    console.log("HT");
    dispatch(toggleEditButtonAndBio());
  };

  const handleBackClick = () => {
    navigation.goBack();
  };
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
      }}
    >
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 200,
          top: -1,
        }}
        onPress={handleMenuClick}
      >
        {/* Your button icon or text */}
        <MaterialIcons
          name={iconName1} // Example icon name
          size={30}
          color="black"
        />
      </TouchableOpacity>

      <Image
        source={require("../assets/capture3.jpeg")} // Replace with your image source
        style={{
          width: 100,
          height: 28,
          borderRadius: 6,
          marginLeft: 2,
          position: "relative",
          right: 42,
        }} // Adjust width, height, and border-radius as needed
      />

      {/* <Ionicons
        name={iconName}
        size={24}
        color="black"
        style={{ marginRight: 5 }}
      />
  
      <Text style={{ fontSize: 25, fontWeight: "400" }}>{title}</Text> */}
      <TouchableOpacity
        style={{
          position: "absolute",
          left: -165,
          top: -1,
        }}
        onPress={handleBackClick}
      >
        {/* Your button icon or text */}

        <Ionicons
          name={iconName} // Example icon name
          size={30}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderTitleWithIcon2;
