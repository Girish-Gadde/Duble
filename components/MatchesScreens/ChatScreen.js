import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import io from "socket.io-client";
import Icon1 from "react-native-vector-icons/Feather";
import axios from "axios";
import { serverIP } from "../../config";
import { useSelector } from "react-redux";

const socket = io(`${serverIP}/chat-room`);

const ChatScreen = ({ route, navigation }) => {
  const { roomId } = route.params;
  const individualProfile = useSelector((state) => state.individualProfile);
  const menuClicked = useSelector((state) => state.menuClicked);
  const [username, setUsername] = useState(individualProfile.name);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const flatListRef = useRef(null);
  //  const username = "Shivani";
  console.log(menuClicked, "OO");
  useEffect(() => {
    if (menuClicked) {
      navigation.goBack(); // Go back when menuClicked is true
    }
  }, [menuClicked, navigation]);

  useEffect(() => {
    console.log(`Joining room: ${roomId} as ${username}`);
    socket.emit("setUsername", username);
    socket.emit("joinRoom", roomId);

    const fetchChatHistory = async () => {
      try {
        const storedMessages = await AsyncStorage.getItem(roomId);
        if (storedMessages) {
          setMessages(JSON.parse(storedMessages));
          console.log(`Loaded messages from AsyncStorage for room: ${roomId}`);
        } else {
          const response = await axios.get(
            `${serverIP}/chat-room/chat-history/${roomId}`
          );
          if (response.data && response.data.messages) {
            setMessages(response.data.messages);
            await AsyncStorage.setItem(
              roomId,
              JSON.stringify(response.data.messages)
            );
            console.log(
              `Fetched and stored messages from server for room: ${roomId}`
            );
          }
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchChatHistory();

    socket.on("receiveMessage", ({ sender, message }) => {
      console.log(`Received message from ${sender}: "${message}"`);
      if (sender !== username) {
        const newMessage = { sender, message };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        saveMessageToStorage(roomId, newMessage);
      }
      scrollToBottom();
    });

    socket.on("updateParticipants", (participants) => {
      console.log(`Participants updated: ${participants.join(", ")}`);
      setParticipants(participants);
    });

    return () => {
      console.log(`Leaving room: ${roomId}`);
      socket.off("receiveMessage");
      socket.off("updateParticipants");
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
      socket.emit("sendMessage", { room: roomId, message });
      saveMessageToStorage(roomId, newMessage);
      await saveMessageToDatabase(roomId, newMessage);
      setMessage("");
      Keyboard.dismiss();
    } else {
      console.log("Cannot send empty message");
    }
  };

  const saveMessageToStorage = async (roomId, message) => {
    try {
      const existingMessages = await AsyncStorage.getItem(roomId);
      const messagesArray = existingMessages
        ? JSON.parse(existingMessages)
        : [];
      messagesArray.push(message);
      await AsyncStorage.setItem(roomId, JSON.stringify(messagesArray));
      console.log(`Message saved to AsyncStorage for room: ${roomId}`);
    } catch (error) {
      console.error("Failed to save message to storage:", error);
    }
  };

  const saveMessageToDatabase = async (roomId, message) => {
    try {
      await axios.post(`${serverIP}/chat-room/save-message`, {
        roomId,
        message,
      });
      console.log("Message successfully saved to MongoDB:", message);
    } catch (error) {
      console.error("Failed to save message to MongoDB:", error);
    }
  };

  const renderItem = ({ item }) => {
    const isMyMessage = item.sender === username;

    return (
      <View
        style={[
          styles.messageContainer,
          isMyMessage
            ? styles.myMessageContainer
            : styles.theirMessageContainer,
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            isMyMessage ? styles.myMessageBubble : styles.theirMessageBubble,
          ]}
        >
          <Text style={styles.senderName}>
            {isMyMessage ? "You" : item.sender}
          </Text>
          <Text style={styles.messageText}>{item.message}</Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 102 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <View style={styles.participantsContainer}>
            <Text style={styles.participantsText}>
              Participants: {participants.join(", ")}
            </Text>
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
              <Icon1
                name="send"
                size={24}
                color="#fff"
                style={styles.sendIcon}
              />
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
    backgroundColor: "#f5f5f5",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  participantsContainer: {
    padding: 10,
    backgroundColor: "#e0e0e0",
  },
  participantsText: {
    fontSize: 16,
  },
  messageList: {
    padding: 10,
  },
  messageContainer: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  myMessageContainer: {
    justifyContent: "flex-end",
    alignSelf: "flex-end",
  },
  theirMessageContainer: {
    justifyContent: "flex-end",
    alignSelf: "flex-start",
  },
  messageBubble: {
    borderRadius: 10,
    padding: 10,
    maxWidth: "80%",
  },
  myMessageBubble: {
    backgroundColor: "#FF3156", // Green for sender
    alignSelf: "flex-end",
  },
  theirMessageBubble: {
    backgroundColor: "#d3d3d3", // Gray for receiver
    alignSelf: "flex-start",
  },
  messageText: {
    color: "#fff",
  },
  senderName: {
    fontWeight: "bold",
    fontSize: 12, // Adjusted font size for the username
    color: "#ffffff", // Color for the username
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
  sendIcon: {
    fontSize: 24,
  },
});

export default ChatScreen;

// // ChatScreen.js
// import React, { useState, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   FlatList,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Ionicons } from "@expo/vector-icons";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import Icon1 from "react-native-vector-icons/Feather";
// import Icon2 from "react-native-vector-icons/Octicons";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleEditButtonAndBio } from "../Redux/Actions";

// const ChatScreen = ({ route, navigation }) => {
//   const { profile } = route.params;
//   const [messages, setMessages] = useState([]);
//   const [inputText, setInputText] = useState("");
//   const flatListRef = useRef(null);
//   const dispatch = useDispatch();
//   const isEditVisible = useSelector((state) => state.showEditButtonAndBio);

//   console.log("PRO", profile);

//   const goToUnlikedMatch = () => {
//     navigation.navigate("UnlikedMatch", { profile });
//   };

//   const handleMenuClick = () => {
//     // Dispatch action to toggle the state
//     dispatch(toggleEditButtonAndBio());
//   };

//   const navigateToTeamProfile = () => {
//     navigation.navigate("TeamProfile", { profile });
//   };

//   useEffect(() => {
//     const loadMessages = async () => {
//       try {
//         const storedMessages = await AsyncStorage.getItem(
//           `messages_${profile.id}`
//         );
//         if (storedMessages) {
//           setMessages(JSON.parse(storedMessages));
//         }
//       } catch (error) {
//         console.error("Failed to load messages from storage", error);
//       }
//     };
//     loadMessages();
//   }, []);

//   useEffect(() => {
//     navigation.setOptions({
//       headerTitle: () => (
//         <View style={styles.headerContainer}>
//           <Image
//             source={profile.imageSource}
//             style={{
//               width: 49,
//               height: 49,
//               borderRadius: 55.87,
//               marginHorizontal: 10,
//             }}
//           />
//           <TouchableOpacity onPress={navigateToTeamProfile}>
//             <View style={styles.headerProfile}>
//               <Text style={styles.nameContainer}>
//                 {profile.name1} & {profile.name2}
//               </Text>
//               <Text style={styles.matchTextContainer}>Matched 3 days ago</Text>
//             </View>
//           </TouchableOpacity>
//           <View style={styles.iconContainer}>
//             <Icon1 name="phone" size={24} style={styles.icon} />
//             <Icon2
//               name="device-camera-video"
//               size={30}
//               color="#000"
//               style={styles.icon1}
//             />
//             <TouchableOpacity onPress={handleMenuClick}>
//               <Icon name="more-vert" size={30} style={styles.icon} />
//             </TouchableOpacity>
//           </View>
//         </View>
//       ),
//       headerTitleAlign: "center",
//     });
//   }, [navigation, profile]);

//   useEffect(() => {
//     if (flatListRef.current) {
//       flatListRef.current.scrollToEnd({ animated: true });
//     }
//   }, [messages]);

//   const sendMessage = async () => {
//     if (inputText.trim()) {
//       const newMessage = {
//         text: inputText,
//         sender: true,
//         id: Date.now().toString(),
//       };
//       const updatedMessages = [...messages, newMessage];
//       setMessages(updatedMessages);
//       setInputText("");
//       try {
//         await AsyncStorage.setItem(
//           `messages_${profile.id}`,
//           JSON.stringify(updatedMessages)
//         );
//       } catch (error) {
//         console.error("Failed to save message", error);
//       }
//     }
//   };

//   const receiveMessage = async () => {
//     const receivedMessage = {
//       text: inputText,
//       sender: false,
//       id: Date.now().toString(),
//     };
//     const updatedMessages = [...messages, receivedMessage];
//     setMessages(updatedMessages);
//     setInputText("");
//     try {
//       await AsyncStorage.setItem(
//         `messages_${profile.id}`,
//         JSON.stringify(updatedMessages)
//       );
//     } catch (error) {
//       console.error("Failed to save message", error);
//     }
//   };

//   const renderItem = ({ item }) => (
//     <View
//       style={[
//         styles.messageContainer,
//         item.sender ? styles.sent : styles.received,
//       ]}
//     >
//       <Text style={styles.messageText}>{item.text}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         ref={flatListRef}
//         data={messages}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         style={styles.chatContainer}
//       />
//       {isEditVisible && (
//         <TouchableOpacity style={styles.editButton} onPress={goToUnlikedMatch}>
//           <View style={styles.editButtonContainer}>
//             <Ionicons
//               name="infinite-outline"
//               size={20}
//               color="red"
//               //style={styles.icon}
//             />
//             <Text style={styles.editButtonText}>Unmatch</Text>
//           </View>
//         </TouchableOpacity>
//       )}
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           value={inputText}
//           onChangeText={setInputText}
//           placeholder="Start tying.."
//         />
//         <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
//           <Icon1 name="send" size={24} color="#fff" style={styles.sendIcon} />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={receiveMessage} style={styles.receiveButton}>
//           <Text style={styles.receiveText}>Rec</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   chatContainer: {
//     flex: 1,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     padding: 2,
//     borderTopWidth: 1,
//     borderColor: "#ccc",
//     backgroundColor: "#D3D5D7",
//   },
//   input: {
//     flex: 1,
//     width: 356,
//     height: 40,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 21.17,
//     padding: 10,
//     marginRight: 10,
//     backgroundColor: "#F9F7F7",
//   },
//   messageContainer: {
//     padding: 10,
//     borderRadius: 5,
//     marginVertical: 5,
//     maxWidth: "70%",
//   },
//   sent: {
//     alignSelf: "flex-end",
//     backgroundColor: "#FFFFFF",
//   },
//   received: {
//     alignSelf: "flex-start",
//     backgroundColor: "#FFFFFF",
//   },
//   messageText: {
//     fontSize: 16,
//   },
//   iconContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginLeft: 36,
//   },
//   icon: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     color: "#000",
//     marginHorizontal: 8,
//   },
//   icon1: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     color: "#000",
//     marginLeft: 10,
//   },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     // height: 70,
//   },
//   nameContainer: {
//     // marginRight: 0,
//     fontSize: 18,
//     color: "#121212",
//   },
//   matchTextContainer: {
//     fontSize: 12,
//   },
//   sendButton: {
//     backgroundColor: "#FFFFFF", // Black background for the send button
//     borderRadius: 999,
//     padding: 10,
//     marginLeft: 10,
//   },
//   sendIcon: {
//     color: "#121212", // White icon color
//   },
//   receiveButton: {
//     backgroundColor: "#000", // Black background for the receive button
//     borderRadius: 20,
//     padding: 10,
//     marginLeft: 10,
//   },
//   receiveText: {
//     color: "#fff", // White text color
//   },
//   headerProfile: {
//     flexDirection: "column",
//     width: 123,
//   },
//   editButton: {
//     position: "absolute",
//     width: 124,
//     height: 34,
//     top: 2,
//     left: 258,
//     backgroundColor: "#FFFFFF",
//     borderRadius: 12,
//   },
//   editButtonContainer: {
//     // backgroundColor: "#FFFFFF",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     width: 124,
//     height: 34,
//     // paddingTop: 6,
//   },
//   editButtonText: {
//     color: "#FF3156",
//     fontSize: 17,
//     marginLeft: 5,
//     fontWeight: "350",
//     lineHeight: 20.37,
//   },
// });

// export default ChatScreen;
