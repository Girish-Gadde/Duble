import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  Share,
  StyleSheet,
} from "react-native";
import axios from "axios";

const InviteUser = () => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(null);
  const [senderName, setSenderName] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");

  const handleSendInvite = async () => {
    if (!senderName || !senderPhone) {
      alert("Please enter both sender name and phone number.");
      return;
    }

    setLoading(true);

    try {
      // Generate OTP by calling the backend API
      const response = await axios.post(
        "http://192.168.1.5:4002/team-invite/generate-otp",
        {
          senderName,
          senderPhone,
        }
      );

      // Extract the generated OTP from the response
      const generatedOtp = response.data.otp;
      setOtp(generatedOtp);

      // Share the OTP via social media apps
      const message = `Join my team on the app! OTP: ${generatedOtp}`;
      await Share.share({
        message: `${message} \nDownload the app here: https://yourappstorelink.com`,
      });
    } catch (error) {
      console.error("Error generating OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!receiverName || !receiverPhone || !otp) {
      alert("Please enter receiver details and OTP to verify.");
      return;
    }

    setLoading(true);

    try {
      // Verify OTP and create team
      const response = await axios.post(
        "http://192.168.1.5:4002/team-invite/verify-otp",
        {
          otp,
          receiverName,
          receiverPhone,
        }
      );

      alert("Team created successfully!");
    } catch (error) {
      console.error("Error verifying OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send Team Invite</Text>

      <TextInput
        style={styles.input}
        placeholder="Sender Name"
        value={senderName}
        onChangeText={setSenderName}
      />
      <TextInput
        style={styles.input}
        placeholder="Sender Phone"
        value={senderPhone}
        onChangeText={setSenderPhone}
        keyboardType="phone-pad"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <Button title="Send Invite" onPress={handleSendInvite} />

          {otp && (
            <>
              <Text style={styles.otp}>Generated OTP: {otp}</Text>

              <TextInput
                style={styles.input}
                placeholder="Receiver Name"
                value={receiverName}
                onChangeText={setReceiverName}
              />
              <TextInput
                style={styles.input}
                placeholder="Receiver Phone"
                value={receiverPhone}
                onChangeText={setReceiverPhone}
                keyboardType="phone-pad"
              />

              <Button title="Verify OTP" onPress={handleVerifyOtp} />
            </>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "100%",
  },
  otp: {
    fontSize: 20,
    color: "green",
    marginVertical: 10,
  },
});

export default InviteUser;
