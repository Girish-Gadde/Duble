
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import io from "socket.io-client";
import Icon1 from "react-native-vector-icons/Feather";
import { serverIP } from "@/config";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { ActivityIndicator } from 'react-native';


const ChatScreen = ({ route, navigation }) => {
  const { roomId, username, userId, teaMembers, imageUrl, dislikedTeamId, dislikingTeamId, refreshYourTeam } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socket = io(serverIP);
  const scrollViewRef = useRef();

  const [showUnmatch, setShowUnmatch] = useState(false);
  const [showReport, setShowReport] = useState(false);
const [selectedMember, setSelectedMember] = useState(null);
const [reportReason, setReportReason] = useState("");
const [loading, setLoading] = useState(true);


useEffect(() => {
  socket.emit("joinRoom", roomId);

  // Listen for messages from others
  socket.on("message", (message) => {
    // Normalize the message to ensure it has 'timestamp'
    const normalizedMessage = {
      ...message,
      timestamp: message.time || new Date().toISOString(), // If time is not sent, add current timestamp
    };

    // Only add the message if it's not from the current user
    if (message.sender !== username) {
      setMessages((prevMessages) => [...prevMessages, normalizedMessage]);
    }
  });

    // const fetchMessages = async () => {
    //   try {
    //     const response = await fetch(`${serverIP}/api/messages/${roomId}`);
    //     const data = await response.json();

    //     if (data.messages && Array.isArray(data.messages)) {
    //       setMessages(data.messages);
    //     } else {
    //       console.error("Messages data is not in the expected format.");
    //     }
    //   } catch (error) {
    //     console.error("Error fetching messages:", error);
    //   }
    // };

    // fetchMessages();



    const fetchMessages = async () => {
      try {
        const response = await fetch(`${serverIP}/api/messages/${roomId}`);
        const data = await response.json();
    
        if (data.messages && Array.isArray(data.messages)) {
          setMessages(data.messages);
        } else {
          console.error("Messages data is not in the expected format.");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false); // This runs whether success or error
      }
    };

    fetchMessages();
    


    return () => {
      socket.off("message");
      socket.disconnect();
    };
  }, [roomId]);

    const toggleDislike = async () => {
      // setIsDislikeActive(!isDislikeActive);
      // updateCurrentIndex(
      //   currentProfileIndex < profiles.length - 1 ? currentProfileIndex + 1 : 0
      // );
  
      try {
        const response = await fetch(`${serverIP}/match/unmatching-the-team`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ dislikedTeamId, dislikingTeamId, roomId}),
        });
  
        if (!response.ok) {
          throw new Error("Failed to update dislike status and chat room");
        }
        await refreshYourTeam();
        navigation.goBack();
        //removeProfile();
      } catch (error) {
        console.error("Error updating dislike status:", error);
      }
    };

  const sendMessage = () => {
    if (!newMessage) return;

    const message = {
      sender: username,
      message: newMessage,
      timestamp: new Date().toISOString(), // Adding timestamp to the message
    };

    // Update state with the new message before emitting to avoid duplicates
    setMessages((prevMessages) => [...prevMessages, message]);

    // Emit the message to the server
    socket.emit("sendMessage", { roomId, ...message });

    setNewMessage(""); // Reset input after sending
    Keyboard.dismiss(); // Dismiss the keyboard
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const renderMessage = (message, index) => {
    const isMyMessage = message.sender === username;
    const isLastMessage = index === messages.length - 1;

    return (
      <View
        key={index}
        style={[
          styles.messageContainer,
          isMyMessage
            ? styles.myMessageContainer
            : styles.theirMessageContainer,
          isLastMessage && styles.lastMessageContainer,
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            isMyMessage ? styles.myMessageBubble : styles.theirMessageBubble,
          ]}
        >
          <Text style={styles.senderName}>
            {isMyMessage ? "You" : message.sender}
          </Text>
          <Text style={styles.messageText}>{message.message}</Text>
          <Text style={styles.timestamp}>
            {formatTime(message.timestamp)} {/* Display timestamp */}
          </Text>
        </View>
      </View>
    );
  };


  // Function to handle report submission
  const submitReport = async () => {
    if (!selectedMember || !reportReason  || !dislikedTeamId) {
      alert("Please select a member and enter a reason.");
      return;
    }
  
    console.log(`Reporting ${selectedMember} (Team ID: ${dislikedTeamId}) for: ${reportReason}`);
  
    try {
      const response = await fetch(`${serverIP}/like/report-a-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reportingTo: {
            teamId: dislikedTeamId,    // ObjectId of the disliked team
            username: selectedMember   // Username of the reported member
          },
          reportedByUser: userId, // Attach user's ObjectId
          reason: reportReason,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit report");
      }
  
      alert("Report submitted successfully.");
  
      // Reset state after submitting
      setShowReport(false);
      setSelectedMember(null);
      setReportReason("");
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Failed to submit report. Please try again.");
    }
  };
  

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style = {styles.blockContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={20} color="#121212" />
          </TouchableOpacity>
          <Image
            source={{ uri: imageUrl }}
            style={styles.itemImage}
          />
          <Text style={styles.headerText}>{teaMembers[0]} & {teaMembers[1]}</Text>
          <TouchableOpacity onPress={() => setShowUnmatch(!showUnmatch)}>
            <Entypo name="dots-three-vertical" size={28} color="#000000" />
          </TouchableOpacity>
          {/* <TouchableOpacity>
            <Ionicons name="call-outline" size={28} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="videocam-outline" size={28} color="#000000" />
          </TouchableOpacity> */}
        </View>
        {showUnmatch && (
          <View style = {styles.blockContainer}> 
        <TouchableOpacity style={styles.unmatchButton} onPress={
          () => {
            Alert.alert(
              "Confirm Unmatch",
              "Are you sure you want to unmatch? Once unmatched, this feature will block them from reaching you and you won’t be able to reach out to any of these team members also.",
              [
                { text: "Cancel", style: "cancel" },
                { text: "Yes", onPress: toggleDislike },
              ]
            );
          }
        }>
          <Text style={styles.unmatchText}>Unmatch</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.unmatchButton} 
          onPress={() => setShowReport(!showReport)}
        >
          <Text style={styles.unmatchText}>Report</Text>
        </TouchableOpacity>
          </View>
      )}
            {showReport && (
      <View style={styles.reportContainer}>
        {/* Dropdown for selecting a member */}
        <Picker
          selectedValue={selectedMember}
          onValueChange={(itemValue) => setSelectedMember(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Member" value={null} />
          {teaMembers.map((member, index) => (
            <Picker.Item key={index} label={member} value={member} />
          ))}
        </Picker>

        {/* Text input for report reason */}
        {selectedMember && (
          <>
            <TextInput
              style={styles.input1}
              placeholder="Enter report reason..."
              value={reportReason}
              onChangeText={setReportReason}
            />
            <View style={styles.reportButton}>
              <TouchableOpacity onPress={submitReport} style={styles.submitButton}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowReport(false)} style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    )}
      </View>
      <View style={styles.innerContainer}>
  {loading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#6200EE" />
      <Text>Loading chats...</Text>
    </View>
  ) : (
    <ScrollView
      showsVerticalScrollIndicator={false}
      ref={scrollViewRef}
      onContentSizeChange={() =>
        scrollViewRef.current.scrollToEnd({ animated: true })
      }
      style={styles.messageList}
      keyboardShouldPersistTaps="handled"
    >
      {messages.map((message, index) => renderMessage(message, index))}
    </ScrollView>
  )}
  
  {/* Input box and send button stay visible */}
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      value={newMessage}
      onChangeText={setNewMessage}
      placeholder="Start typing..."
      placeholderTextColor="gray"
    />
    <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
      <Icon1 name="send" size={24} color="#fff" />
    </TouchableOpacity>
  </View>
</View>

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  innerContainer: { flex: 1 },
  messageList: { flexGrow: 1, padding: 10, backgroundColor: "#F5EBFF" },
  messageContainer: { marginVertical: 5, flexDirection: "row", alignItems: "flex-end" },
  myMessageContainer: { alignSelf: "flex-end" },
  theirMessageContainer: { alignSelf: "flex-start" },
  messageBubble: { borderRadius: 10, padding: 10, maxWidth: "80%" },
  myMessageBubble: { backgroundColor: "#FFFFFF" },
  theirMessageBubble: { backgroundColor: "#FFFFFF" },
  messageText: { color: "#121212" },
  senderName: { fontWeight: "bold", fontSize: 12, color: "#6420AA", marginBottom: 5 },
  timestamp: { fontSize: 10, color: "#808080", marginTop: 5 },
  inputContainer: { flexDirection: "row", padding: 10, backgroundColor: "#D3D5D7", borderTopWidth: 1, borderTopColor: "#ccc" },
  input: { flex: 1, padding: 10, borderRadius: 20, backgroundColor: "#f0f0f0" },
  sendButton: { justifyContent: "center", alignItems: "center", padding: 10, borderRadius: 20, backgroundColor: "#007bff", marginLeft: 10 },
  lastMessageContainer: { marginBottom: 20 },
  itemImage: { width: 49, height: 49, borderRadius: 25, marginRight: 10 },
  header: { backgroundColor: "#EDEEF1", paddingBottom: "2%", paddingTop: "15%", flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: "4%", elevation: 8 },
  headerText: { fontSize: 20, fontWeight: "600", paddingRight: "5%" },
  unmatchButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 5,
    width: 90,
    alignItems: 'center'
  },
  unmatchText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  reportContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#F5EBFF",
    borderRadius: 5,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#ccc"
  },
  input1: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: '#ffffff'
  },
  reportButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#ff0000",
    padding: 10,
    borderRadius: 5,
  },
  cancelText: {
    color: "#fff",
    fontWeight: "bold",
  },
  blockContainer: {
    backgroundColor: "#F5EBFF"
  },
  loadingContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
}

});

export default ChatScreen;