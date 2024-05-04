import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const HeaderTitleWithIcon = ({ title, iconName }) => {
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
          left: -128,
          top: -3,
        }}
      >
        <View
          style={{
            padding: 4,
            borderRadius: 22,
            backgroundColor: "#EFE0E4",
            flexDirection: "row",
            borderWidth: 1,
            borderColor: "black",
          }}
        >
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1582481960493-26179ea458e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHx8",
            }} // Replace with your image source
            style={{
              width: 26,
              height: 26,
              borderRadius: 13,
              marginLeft: 2,
            }} // Adjust width, height, and border-radius as needed
          />
          <MaterialIcons
            name="keyboard-arrow-right" // Right arrow icon
            size={24}
            color="black"
          />
        </View>
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
          right: -130,
          top: -1,
        }}
      >
        {/* Your button icon or text */}
        <MaterialIcons
          name="swap-horiz" // Example icon name
          size={35}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderTitleWithIcon;
