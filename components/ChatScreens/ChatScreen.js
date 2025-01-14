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
} from "react-native";
import io from "socket.io-client";
import Icon1 from "react-native-vector-icons/Feather";
import { serverIP } from "@/config";
import { Ionicons, Entypo } from "@expo/vector-icons";

const ChatScreen = ({ route, navigation }) => {
  const { roomId, username } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socket = io(serverIP);
  const scrollViewRef = useRef();

  useEffect(() => {
    socket.emit("joinRoom", roomId);

    // Listen for messages from others
    socket.on("message", (message) => {
      // Only add the message if it's not from the current user
      if (message.sender !== username) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

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
      }
    };

    fetchMessages();

    return () => {
      socket.off("message");
      socket.disconnect();
    };
  }, [roomId]);

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

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={20} color="#121212" />
          </TouchableOpacity>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/5642024/pexels-photo-5642024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            }}
            style={styles.itemImage}
          />
          <Text style={styles.headerText}>Rahul & Rishi</Text>
          <TouchableOpacity>
            <Entypo name="dots-three-vertical" size={28} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call-outline" size={28} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="videocam-outline" size={28} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.innerContainer}>
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
});

export default ChatScreen;
