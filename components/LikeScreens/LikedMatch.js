import { serverIP } from "@/config";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const LikedMatch = ({ route, navigation }) => {
  const { profile, userName, userId, yourTeamProfile, refreshYourTeam } = route.params;
  console.log(userName, 'NM')
  const [roomId1, setRoomId] = useState(null);

  const navigateBack = () => {
    navigation.goBack();
  };
  const createChatRoom = async () => {
    const url = `${serverIP}/chat-room/api/match`;

    const requestData = {
      teamA: {
        teamId: `${yourTeamProfile._id}`,
        members: [`${yourTeamProfile.name1}`, `${yourTeamProfile.name2}`],
        teamMembers: [`${yourTeamProfile.teamMembers}`],
        imageUrl: `${yourTeamProfile.selectedImages[0]}`
      },
      teamB: {
        teamId: `${profile._id}`,
        members: [`${profile.name1}`, `${profile.name2}`],
        teamMembers: [`${profile.teamMembers}`],
        imageUrl: `${profile.selectedImages[0]}`
      },
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const responseData = await response.json();

      if (response.ok) {
        setRoomId(responseData.roomId);
        let roomId = responseData.roomId;
        const teaMembers = [profile.name1, profile.name2]
        console.log(responseData, "Response Data-1---->:", roomId, teaMembers);
        // refreshYourTeam();
        navigation.navigate("LikedChat", { roomId, username: userName, userId, teaMembers, imageUrl: profile.selectedImages[0], dislikedTeamId: profile._id, dislikingTeamId: yourTeamProfile._id, refreshYourTeam });
      //  onRoomSelect(roomId, userName, teaMembers);
        // Alert.alert("Success", "Chat room created successfully", [
        //   {
        //     text: "OK",
        //     onPress: () => handleNavigate(responseData.roomId),
        //   },
        // ]);
      } else {
        setRoomId(responseData.roomId);
        Alert.alert("Alert", "Chat room already exists for this team", [
          {
            text: "OK",
            onPress: handleNavigate(responseData.roomId),
          },
        ]);

        console.log("Error:", response.status);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while creating the chat room");
      console.error("Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.crossIcon} onPress={navigateBack}>
        <Icon name="close" size={24} color="#000" />
      </TouchableOpacity>
      <Image
        source={require("../../assets/nimbus_link.jpg")}
        style={styles.image}
      />
      <Text style={styles.text}>
        You matched with {profile.name1} & {profile.name2}!
      </Text>
      <TouchableOpacity style={styles.button} onPress={createChatRoom}>
        <Text style={styles.buttonText}>Start Chatting</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  crossIcon: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#FF3156",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 190,
    height: 49,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
  },
  buttonText: {
    color: "#FFDDEE",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19.17,
  },
});

export default LikedMatch;
