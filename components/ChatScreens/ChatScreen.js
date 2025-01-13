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
  Image
} from "react-native";
import io from "socket.io-client";
import Icon1 from "react-native-vector-icons/Feather";
import { serverIP } from "@/config";
import { Ionicons,Entypo } from "@expo/vector-icons";

const ChatScreen = ({ route, navigation  }) => {
  const { roomId, username } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socket = io(serverIP);
  //  const username = "Prashik"; // Adjust this if needed

  const scrollViewRef = useRef();

  useEffect(() => {
    socket.emit("joinRoom", roomId);

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    const fetchMessages = async () => {
      try {
        const response = await fetch(`${serverIP}/api/messages/${roomId}`);

        // Log the status and response text
        console.log("Response status:", response.status);
        const text = await response.text(); // Read the response as text
        console.log("Response text:", text); // Log the raw response text

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = JSON.parse(text); // Parse the text as JSON
        console.log("Fetched messages:", data); // Log the fetched messages

        if (data.messages && Array.isArray(data.messages)) {
          setMessages(data.messages);
        } else {
          console.error("No messages found or incorrect data format:", data);
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

    const message = { sender: username, message: newMessage };

    // Emit the message to the server
    socket.emit("sendMessage", { roomId, ...message });

    // Clear the input field and dismiss the keyboard
    setNewMessage("");
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
          isMyMessage
            ? styles.myMessageContainer
            : styles.theirMessageContainer,
          isLastMessage && styles.lastMessageContainer, // Apply margin for last message
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
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // Adjust this offset if necessary
    >
    <View>
      <View style={{
      backgroundColor: '#EDEEF1',
      paddingBottom: '2%',
      paddingTop: '15%',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingHorizontal: '4%',
      
      // Shadow for iOS
      shadowColor: '#45474B1A', // Shadow color
      shadowOffset: { width: 0, height: 10 }, // Shadow offset
      shadowOpacity: 0.8, // Shadow transparency
      shadowRadius: 4, // Shadow blur

      // Shadow for Android
      elevation: 8, // Height-based shadow

      // Additional styling for clarity
      borderBottomColor: '#45474B1A', // Optional border fallback
      borderBottomWidth: 2,}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons style={{justifyContent:"center",alignContent:'center',alignItems:'center'}} name="arrow-back-outline" size={20} color="#121212" />
        </TouchableOpacity>
       
        <View>
            <Image
                        source={{
                          uri: "https://images.pexels.com/photos/5642024/pexels-photo-5642024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                        }}
                        style={styles.itemImage}
                      />
         </View>
         <View style={{paddingRight:'5%'}}>
          <Text style={{fontSize:20,fontWeight:'600'}}>Rahul & Rishi</Text>
         </View>
         <TouchableOpacity>
           <Entypo style={{justifyContent:"center",alignContent:'center',alignItems:'center'}} name="dots-three-vertical" size={28} color="#000000" />
         </TouchableOpacity>
         <TouchableOpacity>
           <Ionicons style={{justifyContent:"center",alignContent:'center',alignItems:'center'}} name="call-outline" size={28} color="#000000" />
         </TouchableOpacity>
         <TouchableOpacity>
           <Ionicons style={{justifyContent:"center",alignContent:'center',alignItems:'center'}} name="videocam-outline" size={28} color="#000000" />
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
          keyboardShouldPersistTaps="handled" // This allows taps to register even when the keyboard is open
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
    backgroundColor:"#F5EBFF"
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
    backgroundColor: "#FFFFFF",
  },
  theirMessageBubble: {
    backgroundColor: "#FFFFFF",
  },
  messageText: {
    color: "#121212",
  },
  senderName: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#ffffff",
    marginBottom: 5,
    color:'#6420AA'
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#D3D5D7",
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
  itemImage: {
    width: 49,
    height: 49,
    borderRadius: 25,
    marginRight: 10,
  },
});

export default ChatScreen;
