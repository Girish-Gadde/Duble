import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import * as Sharing from "expo-sharing";
import { serverIP } from "@/config";

export default function CreateTeam({
  mobileNumber,
  fetchTeams,
  userId,
  navigation,
}) {
  console.log("Mobilen No7 ---->", mobileNumber);
  const [teamName, setTeamName] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [otp, setOtp] = useState(""); // State to store OTP
  const [teamateMobileNumber, setTeamateMobileNumber] = useState(null);

  // Hardcoded creator's name
  //const creatorName = "6305148607"; // Replace with the actual hardcoded name

  const generateOtp = () => {
    // Generate a random 6-digit OTP
    const otpValue = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(otpValue);
  };

  const createTeam = async () => {
    if (!teamateMobileNumber && !teamName) {
      Alert.alert("Error", "Please provide the Team Name");
      return;
    }

    try {
      const response = await axios.post(`${serverIP}/auth/create-a-team`, {
        teamName,
        mobileNumber,
        teamateMobileNumber, // Use the hardcoded creator name
      });

      console.log(response, "TEaM");
      //await refreshYourTeam();
      //const { inviteLink } = response.data;
      //setInviteLink(inviteLink);
      //generateOtp(); // Generate OTP when the team is created
      Alert.alert("Success", response.data.message, [
        {
          text: "OK",
          onPress: () => {
            console.log("DG");
            fetchTeams(); // Call refreshYourTeam
            // navigation.goBack(); // Navigate back to the previous screen
          },
        },
      ]);
      setTeamName("");
      setTeamateMobileNumber("");
    } catch (error) {
      console.error("Error creating team:", error);
      Alert.alert("Error", "Failed to create team");
    }
  };

  const shareInvite = async () => {
    if (!inviteLink || !otp) {
      Alert.alert("Error", "Please generate an invite link and OTP first");
      return;
    }

    // Custom message with separate OTP and team name
    const message = `Your OTP is ${otp} for team Name ${teamName}. Join the team using this link: ${inviteLink}`;

    try {
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(inviteLink, {
          title: "Invite Link",
          message: message, // Include team name and OTP in the message
        });
        console.log("Shared successfully");
      } else {
        Alert.alert("Error", "Sharing not available on this platform");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a Team</Text>

      <Text style={styles.label}>Team Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Team Name"
        value={teamName}
        onChangeText={setTeamName}
      />
      <Text style={styles.label}>Team mate's Mobile number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your team mate's mobile number"
        value={teamateMobileNumber}
        onChangeText={setTeamateMobileNumber}
      />

      <TouchableOpacity style={styles.button} onPress={createTeam}>
        <Text style={styles.buttonText}>Create Team</Text>
      </TouchableOpacity>

      {inviteLink ? (
        <View>
          <Text style={styles.inviteLink}>Invite Link: {inviteLink}</Text>
          <TouchableOpacity style={styles.button} onPress={shareInvite}>
            <Text style={styles.buttonText}>Share Invite Link</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: "10%",
    marginTop: "5%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: "20%",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#FF3156",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  inviteLink: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 14,
  },
});
