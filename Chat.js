import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import io from 'socket.io-client';
import Icon1 from "react-native-vector-icons/Feather";

const socket = io('http://192.168.1.26:3000');

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const flatListRef = useRef(null);
  const inputRef = useRef(null); // Ref for the TextInput
  const room = 'Duple room';     
  const username = 'Girish';

  useEffect(() => {
    console.log(`Joining room: ${room} as ${username}`);
    socket.emit('setUsername', username);
    socket.emit('joinRoom', room);

    socket.on('receiveMessage', ({ sender, message }) => {
      console.log(`Received message from ${sender}: "${message}"`);
      if (sender !== username) {
        setMessages((prevMessages) => [...prevMessages, { sender, message }]);
      }
      scrollToBottom();
    });

    socket.on('updateParticipants', (participants) => {
      console.log(`Participants updated: ${participants.join(', ')}`);
      setParticipants(participants);
    });

    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      scrollToBottom(); // Scroll to bottom when keyboard shows up
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      scrollToBottom(); // Scroll to bottom when keyboard hides
    });

    return () => {
      console.log(`Leaving room: ${room}`);
      socket.off('receiveMessage');
      socket.off('updateParticipants');
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [room, username]);

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      console.log(`Sending message: "${message}" as ${username}`);
      setMessages((prevMessages) => [...prevMessages, { sender: username, message }]);
      socket.emit('sendMessage', { room, message });
      setMessage('');
      Keyboard.dismiss();
    } else {
      console.log('Cannot send empty message');
    }
  };

  const renderItem = ({ item }) => {
    const isMyMessage = item.sender === username;

    console.log(`Rendering message from ${item.sender}`);

    return (
      <View
        style={[
          styles.messageContainer,
          isMyMessage ? styles.myMessageContainer : styles.theirMessageContainer,
        ]}
      >
        {!isMyMessage && <Text style={styles.senderName}>{item.sender}</Text>}
        <View style={[styles.messageBubble, isMyMessage ? styles.myMessageBubble : styles.theirMessageBubble]}>
          <Text style={styles.messageText}>{item.message}</Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
              ref={inputRef}
              style={styles.input}
              value={message}
              onChangeText={setMessage}
              placeholder="Type your message..."
            />
            <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
              <Icon1 name="send" size={24} color="#fff" style={styles.sendIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.receiveButton}>
              <Text style={styles.receiveText}>Rec</Text>
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
    padding: 10,
    marginTop: '7%',
  },
  participantsContainer: {
    marginTop:'2%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    //backgroundColor: '#D3D5D7',
    alignItems:'center'
  },
  participantsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  messageList: {
    paddingBottom: 20,
    paddingHorizontal: '3%',
  },
  messageContainer: {
    marginVertical: 5,
    maxWidth: '75%',
  },
  myMessageContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  theirMessageContainer: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
  },
  myMessageBubble: {
    backgroundColor: '#007bff',
    borderTopRightRadius: 0,
  },
  theirMessageBubble: {
    backgroundColor: '#e1e1e1',
    borderTopLeftRadius: 0,
  },
  messageText: {
    color: '#fff',
  },
  senderName: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    padding: 10,
    backgroundColor: '#D3D5D7',
    borderRadius: 20,
    width: '100%',
    
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 21.17,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#F9F7F7',
  },
  sendButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    padding: 10,
    marginLeft: 10,
  },
  sendIcon: {
    color: '#121212',
  },
  receiveButton: {
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
  },
  receiveText: {
    color: '#fff',
  },
});

export default ChatScreen;
