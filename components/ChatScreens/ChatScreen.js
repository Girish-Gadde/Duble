import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';
import Icon1 from "react-native-vector-icons/Feather";
import axios from 'axios';
import { serverIP } from '../../config';

const socket = io(`${serverIP}/chat-room`);

const ChatScreen = ({ route }) => {
  const { roomId } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const flatListRef = useRef(null);
  const username = "Shivani";

  useEffect(() => {
    console.log(`Joining room: ${roomId} as ${username}`);
    socket.emit('setUsername', username);
    socket.emit('joinRoom', roomId);

    const fetchChatHistory = async () => {
      try {
        const storedMessages = await AsyncStorage.getItem(roomId);
        if (storedMessages) {
          setMessages(JSON.parse(storedMessages));
          console.log(`Loaded messages from AsyncStorage for room: ${roomId}`);
        } else {
          const response = await axios.get(`${serverIP}/chat-room/chat-history/${roomId}`);
          if (response.data && response.data.messages) {
            setMessages(response.data.messages);
            await AsyncStorage.setItem(roomId, JSON.stringify(response.data.messages));
            console.log(`Fetched and stored messages from server for room: ${roomId}`);
          }
        }
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchChatHistory();

    socket.on('receiveMessage', ({ sender, message }) => {
      console.log(`Received message from ${sender}: "${message}"`);
      if (sender !== username) {
        const newMessage = { sender, message };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        saveMessageToStorage(roomId, newMessage);
      }
      scrollToBottom();
    });

    socket.on('updateParticipants', (participants) => {
      console.log(`Participants updated: ${participants.join(', ')}`);
      setParticipants(participants);
    });

    return () => {
      console.log(`Leaving room: ${roomId}`);
      socket.off('receiveMessage');
      socket.off('updateParticipants');
    };
  }, [roomId, username]);

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const sendMessage = async () => {
    if (message.trim()) {
      console.log(`Sending message: "${message}" as ${username}`);
      const newMessage = { sender: username, message };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      socket.emit('sendMessage', { room: roomId, message });
      saveMessageToStorage(roomId, newMessage);
      await saveMessageToDatabase(roomId, newMessage);
      setMessage('');
      Keyboard.dismiss();
    } else {
      console.log('Cannot send empty message');
    }
  };

  const saveMessageToStorage = async (roomId, message) => {
    try {
      const existingMessages = await AsyncStorage.getItem(roomId);
      const messagesArray = existingMessages ? JSON.parse(existingMessages) : [];
      messagesArray.push(message);
      await AsyncStorage.setItem(roomId, JSON.stringify(messagesArray));
      console.log(`Message saved to AsyncStorage for room: ${roomId}`);
    } catch (error) {
      console.error('Failed to save message to storage:', error);
    }
  };

  const saveMessageToDatabase = async (roomId, message) => {
    try {
      await axios.post(`${serverIP}/chat-room/save-message`, { roomId, message });
      console.log('Message successfully saved to MongoDB:', message);
    } catch (error) {
      console.error('Failed to save message to MongoDB:', error);
    }
  };

  const renderItem = ({ item }) => {
    const isMyMessage = item.sender === username;

    return (
      <View
        style={[
          styles.messageContainer,
          isMyMessage ? styles.myMessageContainer : styles.theirMessageContainer,
        ]}
      >
        <View style={[styles.messageBubble, isMyMessage ? styles.myMessageBubble : styles.theirMessageBubble]}>
          <Text style={styles.senderName}>{isMyMessage ? 'You' : item.sender}</Text>
          <Text style={styles.messageText}>{item.message}</Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 102 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <View style={styles.participantsContainer}>
            <Text style={styles.participantsText}>Participants: {participants.join(', ')}</Text>
          </View>
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.messageList}
            onContentSizeChange={scrollToBottom}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={message}
              onChangeText={setMessage}
              placeholder="Type your message..."
            />
            <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
              <Icon1 name="send" size={24} color="#fff" style={styles.sendIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  participantsContainer: {
    padding: 10,
    backgroundColor: '#e0e0e0',
  },
  participantsText: {
    fontSize: 16,
  },
  messageList: {
    padding: 10,
  },
  messageContainer: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  myMessageContainer: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  theirMessageContainer: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-start',
  },
  messageBubble: {
    borderRadius: 10,
    padding: 10,
    maxWidth: '80%',
  },
  myMessageBubble: {
    backgroundColor: '#FF3156', // Green for sender
    alignSelf: 'flex-end',
  },
  theirMessageBubble: {
    backgroundColor: '#d3d3d3', // Gray for receiver
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#fff',
  },
  senderName: {
    fontWeight: 'bold',
    fontSize: 12, // Adjusted font size for the username
    color: '#ffffff', // Color for the username
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#007bff',
    marginLeft: 10,
  },
  sendIcon: {
    fontSize: 24,
  },
});

export default ChatScreen;
