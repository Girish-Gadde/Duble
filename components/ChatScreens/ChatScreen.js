import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableOpacity,
  Text,
  ScrollView
} from 'react-native';
import io from 'socket.io-client';
import Icon1 from 'react-native-vector-icons/Feather';
import { serverIP } from '@/config';

const ChatScreen = ({ route }) => {
 const { roomId } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socket = io(serverIP);
  const username = "Prashik"; // Adjust this if needed

  const scrollViewRef = useRef();

  useEffect(() => {
    socket.emit('joinRoom', roomId);

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    const fetchMessages = async () => {
      try {
        const response = await fetch(`${serverIP}/api/messages/${roomId}`);
        
        // Log the status and response text
        console.log('Response status:', response.status);
        const text = await response.text(); // Read the response as text
        console.log('Response text:', text); // Log the raw response text
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = JSON.parse(text); // Parse the text as JSON
        console.log('Fetched messages:', data); // Log the fetched messages
    
        if (data.messages && Array.isArray(data.messages)) {
          setMessages(data.messages);
        } else {
          console.error('No messages found or incorrect data format:', data);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    return () => {
      socket.off('message');
      socket.disconnect();
    };
  }, [roomId]);

  const sendMessage = () => {
    if (!newMessage) return;

    const message = { sender: username, message: newMessage };
    
    // Emit the message to the server
    socket.emit('sendMessage', { roomId, ...message });

    // Clear the input field and dismiss the keyboard
    setNewMessage('');
    Keyboard.dismiss();
  };

  const renderMessage = (message, index) => {
    const isMyMessage = message.sender === username;
    const isLastMessage = index === messages.length - 1; // Check if this is the last message

    return (
      <View
        key={index}
        style={[
          styles.messageContainer,
          isMyMessage ? styles.myMessageContainer : styles.theirMessageContainer,
          isLastMessage && styles.lastMessageContainer, // Apply margin for last message
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            isMyMessage ? styles.myMessageBubble : styles.theirMessageBubble,
          ]}
        >
          <Text style={styles.senderName}>{isMyMessage ? "You" : message.sender}</Text>
          <Text style={styles.messageText}>{message.message}</Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // Adjust this offset if necessary
    >
      <View style={styles.innerContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
          style={styles.messageList}
          keyboardShouldPersistTaps="handled" // This allows taps to register even when the keyboard is open
        >
          {messages.map((message, index) => renderMessage(message, index))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type your message..."
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
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  innerContainer: {
    flex: 1,
  },
  messageList: {
    flexGrow: 1,
    padding: 10,
  },
  messageContainer: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  myMessageContainer: {
    alignSelf: "flex-end",
  },
  theirMessageContainer: {
    alignSelf: "flex-start",
  },
  messageBubble: {
    borderRadius: 10,
    padding: 10,
    maxWidth: "80%",
  },
  myMessageBubble: {
    backgroundColor: "#FF3156",
  },
  theirMessageBubble: {
    backgroundColor: "#d3d3d3",
  },
  messageText: {
    color: "#fff",
  },
  senderName: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#ffffff",
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#007bff",
    marginLeft: 10,
  },
  lastMessageContainer: {
    marginBottom: 20, // Adjust this value as needed for your design
  },
});

export default ChatScreen;
