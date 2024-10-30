import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { toggleEditButtonAndBio } from "../components/Redux/Actions";
import { useNavigation } from "@react-navigation/native";

const HeaderTitleWithIcon2 = ({
  title,
  iconName,
  iconName1,
  handleMenuClick,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // const handleMenuClick = () => {
  //   // Dispatch action to toggle the state
  //   navigation.goBack();
  //   // dispatch(toggleEditButtonAndBio());
  // };

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
          right: 150,
          // top: -1,
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

      {/* <Image
        source={require("../assets/capture3.jpeg")} // Replace with your image source
        style={{
          width: 100,
          height: 28,
          borderRadius: 6,
          marginLeft: 2,
          hidden: true,
        }} // Adjust width, height, and border-radius as needed
      /> */}

      {/* <TouchableOpacity
        style={{
          position: "absolute",
          right: -125,
          //top: -1,
        }}
        onPress={handleMenuClick}
      >
        <Image
          source={require("../assets/Group.jpg")} // Replace with your image source
          style={{
            width: 20,
            height: 20,
            borderRadius: 1,
            marginLeft: 2,
          }} // Adjust width, height, and border-radius as needed
        />
      </TouchableOpacity> */}
    </View>
  );
};

export default HeaderTitleWithIcon2;
