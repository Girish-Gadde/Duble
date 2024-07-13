import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { toggleEditButtonAndBio } from "../components/Redux/Actions";

const HeaderTitleWithIcon1 = ({ title, iconName, iconName1 }) => {
  const dispatch = useDispatch();

  const handleMenuClick = () => {
    // Dispatch action to toggle the state
    dispatch(toggleEditButtonAndBio());
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
        // onPress={handleMenuClick}
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
          right: -125,
          //top: -1,
        }}
        onPress={handleMenuClick}
      >
        {/* Your button icon or text */}
        <Image
          source={require("../assets/Group.jpg")} // Replace with your image source
          style={{
            width: 20,
            height: 20,
            borderRadius: 1,
            marginLeft: 2,
          }} // Adjust width, height, and border-radius as needed
        />
        {/* <MaterialIcons
          name={iconName} // Example icon name
          size={34}
          color="black"
        /> */}
      </TouchableOpacity>
    </View>
  );
};

export default HeaderTitleWithIcon1;
