// ChatScreen.js
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon1 from "react-native-vector-icons/Feather";
import Icon2 from "react-native-vector-icons/Octicons";
import { useDispatch, useSelector } from "react-redux";
import { toggleEditButtonAndBio } from "../Redux/Actions";

const ChatScreen = ({ route, navigation }) => {
  const { profile } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const flatListRef = useRef(null);
  const dispatch = useDispatch();
  const isEditVisible = useSelector((state) => state.showEditButtonAndBio);

  console.log("PRO", profile);

  const goToUnlikedMatch = () => {
    navigation.navigate("UnlikedMatch", { profile });
  };

  const handleMenuClick = () => {
    // Dispatch action to toggle the state
    dispatch(toggleEditButtonAndBio());
  };

  const navigateToTeamProfile = () => {
    navigation.navigate("TeamProfile", { profile });
  };

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const storedMessages = await AsyncStorage.getItem(
          `messages_${profile.id}`
        );
        if (storedMessages) {
          setMessages(JSON.parse(storedMessages));
        }
      } catch (error) {
        console.error("Failed to load messages from storage", error);
      }
    };
    loadMessages();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerContainer}>
          <Image
            source={profile.imageSource}
            style={{
              width: 49,
              height: 49,
              borderRadius: 55.87,
              marginHorizontal: 10,
            }}
          />
          <TouchableOpacity onPress={navigateToTeamProfile}>
            <View style={styles.headerProfile}>
              <Text style={styles.nameContainer}>
                {profile.name1} & {profile.name2}
              </Text>
              <Text style={styles.matchTextContainer}>Matched 3 days ago</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.iconContainer}>
            <Icon1 name="phone" size={24} style={styles.icon} />
            <Icon2
              name="device-camera-video"
              size={30}
              color="#000"
              style={styles.icon1}
            />
            <TouchableOpacity onPress={handleMenuClick}>
              <Icon name="more-vert" size={30} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      ),
      headerTitleAlign: "center",
    });
  }, [navigation, profile]);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (inputText.trim()) {
      const newMessage = {
        text: inputText,
        sender: true,
        id: Date.now().toString(),
      };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      setInputText("");
      try {
        await AsyncStorage.setItem(
          `messages_${profile.id}`,
          JSON.stringify(updatedMessages)
        );
      } catch (error) {
        console.error("Failed to save message", error);
      }
    }
  };

  const receiveMessage = async () => {
    const receivedMessage = {
      text: inputText,
      sender: false,
      id: Date.now().toString(),
    };
    const updatedMessages = [...messages, receivedMessage];
    setMessages(updatedMessages);
    setInputText("");
    try {
      await AsyncStorage.setItem(
        `messages_${profile.id}`,
        JSON.stringify(updatedMessages)
      );
    } catch (error) {
      console.error("Failed to save message", error);
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender ? styles.sent : styles.received,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.chatContainer}
      />
      {isEditVisible && (
        <TouchableOpacity style={styles.editButton} onPress={goToUnlikedMatch}>
          <View style={styles.editButtonContainer}>
            <Ionicons
              name="infinite-outline"
              size={20}
              color="red"
              //style={styles.icon}
            />
            <Text style={styles.editButtonText}>Unmatch</Text>
          </View>
        </TouchableOpacity>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Start tying.."
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Icon1 name="send" size={24} color="#fff" style={styles.sendIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={receiveMessage} style={styles.receiveButton}>
          <Text style={styles.receiveText}>Rec</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 2,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#D3D5D7",
  },
  input: {
    flex: 1,
    width: 356,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 21.17,
    padding: 10,
    marginRight: 10,
    backgroundColor: "#F9F7F7",
  },
  messageContainer: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    maxWidth: "70%",
  },
  sent: {
    alignSelf: "flex-end",
    backgroundColor: "#FFFFFF",
  },
  received: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
  },
  messageText: {
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 36,
  },
  icon: {
    backgroundColor: "#fff",
    borderRadius: 12,
    color: "#000",
    marginHorizontal: 8,
  },
  icon1: {
    backgroundColor: "#fff",
    borderRadius: 12,
    color: "#000",
    marginLeft: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // height: 70,
  },
  nameContainer: {
    // marginRight: 0,
    fontSize: 18,
    color: "#121212",
  },
  matchTextContainer: {
    fontSize: 12,
  },
  sendButton: {
    backgroundColor: "#FFFFFF", // Black background for the send button
    borderRadius: 999,
    padding: 10,
    marginLeft: 10,
  },
  sendIcon: {
    color: "#121212", // White icon color
  },
  receiveButton: {
    backgroundColor: "#000", // Black background for the receive button
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
  },
  receiveText: {
    color: "#fff", // White text color
  },
  headerProfile: {
    flexDirection: "column",
    width: 123,
  },
  editButton: {
    position: "absolute",
    width: 124,
    height: 34,
    top: 2,
    left: 258,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
  },
  editButtonContainer: {
    // backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 124,
    height: 34,
    // paddingTop: 6,
  },
  editButtonText: {
    color: "#FF3156",
    fontSize: 17,
    marginLeft: 5,
    fontWeight: "350",
    lineHeight: 20.37,
  },
});

export default ChatScreen;
