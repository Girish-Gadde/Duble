import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator
} from "react-native";
import { serverIP } from "../../config";
import axios from "axios";
import { useUserContext } from "../Team Switch/UserContext";


const profiles = [
  {
    id: 1,
    imageSource: require("../../assets/profile-1.jpg"),
    imageSource1: require("../../assets/profile-6.jpg"),
    imageSource2: require("../../assets/profile-7.jpg"),
    imageSource3: require("../../assets/profile-8.jpg"),
    name1: "Neha",
    age1: 25,
    name2: "Shruthi",
    age2: 24,
    location: "2 km away",
    description:
      "Your go to adventure enthusiast and amateur stand-up comedian",
    ourStory:
      "We met at a comedy show where shruthi was performing her stand-up routine and Neha was in the audience",
    funDate:
      "Hiking in the mountains, laughing, roasting marshmallows and sharing stories",
    singleImage1: require("../../assets/image20.jpg"),
    singleImage2: require("../../assets/image21.jpg"),
  },
  {
    id: 2,
    imageSource: require("../../assets/profile-2.png"),
    imageSource1: require("../../assets/profile-9.jpg"),
    imageSource2: require("../../assets/profile-10.jpg"),
    imageSource3: require("../../assets/profile-11.jpg"),
    name1: "Anusha",
    age1: 24,
    name2: "Nikitha",
    age2: 26,
    location: "3 km away",
    description: "Crazy cat lady who is as crazy as a cat who loves to explore",
    ourStory: "We met at a coffee shop and bonded over our love for cats",
    funDate: "Visiting a cat café and having a cat-themed movie marathon",
    singleImage1: require("../../assets/image20.jpg"),
    singleImage2: require("../../assets/image21.jpg"),
  },
  {
    id: 3,
    imageSource: require("../../assets/profile-3.png"),
    imageSource1: require("../../assets/profile-5.jpg"),
    imageSource2: require("../../assets/profile-13.jpg"),
    imageSource3: require("../../assets/profile-12.jpg"),
    name1: "Julia",
    age1: 27,
    name2: "Jenny",
    age2: 24,
    location: "4 km away",
    description:
      "Your go to adventure enthusiast and amateur stand-up comedian",
    ourStory:
      "We met at a hiking event and instantly clicked while exploring nature",
    funDate: "Going on a spontaneous road trip to explore new hiking trails",
    singleImage1: require("../../assets/image20.jpg"),
    singleImage2: require("../../assets/image21.jpg"),
  },
  {
    id: 4,
    imageSource: require("../../assets/profile-4.png"),
    imageSource1: require("../../assets/profile-14.jpg"),
    imageSource2: require("../../assets/profile-7.jpg"),
    imageSource3: require("../../assets/profile-8.jpg"),
    name1: "Shivani",
    age1: 23,
    name2: "Chandini",
    age2: 25,
    location: "10 km away",
    description:
      "We love to travel and experience new places, cultures, animals etc",
    ourStory:
      "We met while traveling solo in Europe and decided to explore the rest of the trip together",
    funDate:
      "Attending a cultural festival in a foreign country and trying out exotic foods",
    singleImage1: require("../../assets/image20.jpg"),
    singleImage2: require("../../assets/image21.jpg"),
  },
  {
    id: 5,
    imageSource: require("../../assets/profile-4.png"),
    imageSource1: require("../../assets/profile-6.jpg"),
    imageSource2: require("../../assets/profile-7.jpg"),
    imageSource3: require("../../assets/profile-8.jpg"),
    name1: "Shivani",
    age1: 23,
    name2: "Chandini",
    age2: 25,
    location: "10 km away",
    description:
      "We love to travel and experience new places, cultures, animals etc",
    ourStory:
      "We first met at a local music festival and bonded over our favorite bands",
    funDate: "A road trip to a music festival, camping out under the stars",
    singleImage1: require("../../assets/image20.jpg"),
    singleImage2: require("../../assets/image21.jpg"),
  },
  {
    id: 6,
    imageSource: require("../../assets/profile-6.jpg"),
    imageSource1: require("../../assets/profile-6.jpg"),
    imageSource2: require("../../assets/profile-7.jpg"),
    imageSource3: require("../../assets/profile-8.jpg"),
    name1: "Shivani",
    age1: 23,
    name2: "Chandini",
    age2: 25,
    location: "10 km away",
    description:
      "We love to travel and experience new places, cultures, animals etc",
    ourStory:
      "We bumped into each other at a cooking class and decided to partner up",
    funDate:
      "A cooking class followed by a dinner at a newly opened restaurant",
    singleImage1: require("../../assets/image20.jpg"),
    singleImage2: require("../../assets/image21.jpg"),
  },
  {
    id: 7,
    imageSource: require("../../assets/profile-7.jpg"),
    imageSource1: require("../../assets/profile-6.jpg"),
    imageSource2: require("../../assets/profile-7.jpg"),
    imageSource3: require("../../assets/profile-8.jpg"),
    name1: "Shivani",
    age1: 23,
    name2: "Chandini",
    age2: 25,
    location: "10 km away",
    description:
      "We love to travel and experience new places, cultures, animals etc",
    ourStory:
      "We met while traveling solo in Europe and decided to explore the rest of the trip together",
    funDate:
      "Attending a cultural festival in a foreign country and trying out exotic foods",
    singleImage1: require("../../assets/image20.jpg"),
    singleImage2: require("../../assets/image21.jpg"),
  },
  {
    id: 8,
    imageSource: require("../../assets/profile-8.jpg"),
    imageSource1: require("../../assets/profile-6.jpg"),
    imageSource2: require("../../assets/profile-7.jpg"),
    imageSource3: require("../../assets/profile-8.jpg"),
    name1: "Shivani",
    age1: 23,
    name2: "Chandini",
    age2: 25,
    location: "10 km away",
    description:
      "We love to travel and experience new places, cultures, animals etc",
    ourStory:
      "Our love for food brought us together when we met at a gourmet food festival.",
    funDate:
      "Going on a food tour in the city, trying out the best local dishes.",
    singleImage1: require("../../assets/image20.jpg"),
    singleImage2: require("../../assets/image21.jpg"),
  },
  {
    id: 9,
    imageSource: require("../../assets/profile-9.jpg"),
    imageSource1: require("../../assets/profile-6.jpg"),
    imageSource2: require("../../assets/profile-7.jpg"),
    imageSource3: require("../../assets/profile-8.jpg"),
    name1: "Shivani",
    age1: 23,
    name2: "Chandini",
    age2: 25,
    location: "10 km away",
    description:
      "We love to travel and experience new places, cultures, animals etc",
    ourStory:
      "We met at a book club meeting and bonded over our favorite authors.",
    funDate:
      "Visiting an art gallery followed by a relaxing evening at a cozy café.",
    singleImage1: require("../../assets/image20.jpg"),
    singleImage2: require("../../assets/image21.jpg"),
  },
  {
    id: 10,
    imageSource: require("../../assets/profile-10.jpg"),
    imageSource1: require("../../assets/profile-6.jpg"),
    imageSource2: require("../../assets/profile-7.jpg"),
    imageSource3: require("../../assets/profile-8.jpg"),
    name1: "Shivani",
    age1: 23,
    name2: "Chandini",
    age2: 25,
    location: "10 km away",
    description:
      "We love to travel and experience new places, cultures, animals etc",
    ourStory:
      "We met at a local hiking club and have been exploring trails together ever since.",
    funDate:
      "Going on a spontaneous road trip to a nearby national park and camping under the stars.",
    singleImage1: require("../../assets/image20.jpg"),
    singleImage2: require("../../assets/image21.jpg"),
  },
];

const MatchScreen = ({ navigation }) => {
  //const navigation = useNavigation();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const teamId = '66d6ee9e92e63ffe7c44f9ef';


  const { indexRef } = useUserContext();
  const displayIndex = useRef(indexRef.current); // Use ref to hold the current index value
  

  useEffect(() => {
    // Update the displayIndex whenever indexRef changes
    displayIndex.current = indexRef.current;
  }, [indexRef.current]);

  console.log('Current Index ------->', displayIndex)



  // Chat List Code
   
  useEffect(() => {
    const fetchRooms = async () => {
      if (!teamId) {
        console.warn('No team ID provided');
        alert('Please enter a team ID');
        return;
      }

      console.log('Fetching rooms for team ID:', teamId);

      try {
        const response = await axios.get(`${serverIP}/chat-room/api/rooms/${teamId}`);
        console.log('Fetched rooms datas:', response.data);
        console.log('Fetched rooms data:------> Teams', response.data.teams);

        if (!response.data || response.data.length === 0) {
          console.warn('No rooms found for the provided team ID.');
          alert('No rooms found for the provided team ID.');
          setRooms([]);
        } else {
          setRooms(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        alert('Failed to fetch rooms');
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);  // Fetch rooms when component mounts

  const handleRoomPress = (room) => {
    const { roomId, teams } = room;
    // Find the team that matches the teamId and get its members
    const team = teams.find(t => t.teamId === teamId);
    const memberName = team && team.members && team.members.length > 0 ? team.members[0] : 'No member'; // Ensure members array is valid
    console.log('Room selected:', roomId);
    console.log('Members:', team ? team.members : 'No members');
    navigation.navigate('ChatScreen', { roomId, username: memberName });
  };

  const renderItem = ({ item }) => {
    console.log('Rendering room items:', item); // Debugging log
    console.log('Rendering room item ------> index 1:', item.teams); // Debugging log

    // Ensure teams is an array before flattening its members
    const allMembers = Array.isArray(item.teams)
      ? item.teams.flatMap(team => team.members).join('   ')  // Adding spaces between names
      : 'No members available';

    return (
      <TouchableOpacity onPress={() => handleRoomPress(item)}>
        <View style={styles.roomContainer}>
          <Text style={styles.memberText}>{allMembers}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />;
  }

  // Chat List Code


  return (
    <View style={styles.container}>
      <TextInput style={styles.searchBar} placeholder="Search matches" />
      <Text style={styles.headerText}>New Matches</Text>
      <View style={styles.scrollViewWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
        >
          {profiles.map((profile, index) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("TeamProfile", { profile })}
            >
              <View key={index} style={styles.imageContainer}>
                <Image source={profile.imageSource} style={styles.image} />
                <Text style={styles.imageText}>
                  {profile.name1} & {profile.name2}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <Text style={styles.headerText}>Chats</Text>
      {/* <FlatList
        data={profiles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.chatContainer}>
            <Image source={item.imageSource} style={styles.chatImage} />
            <TouchableOpacity
              style={styles.chatTextContainer}
              onPress={() => navigation.navigate("Chat", { profile: item })}
            >
              <Text style={styles.chatText}>
                {item.name1} & {item.name2}
              </Text>
              <Text style={styles.chatMessage}>{item.description}</Text>
            </TouchableOpacity>
          </View>
        )}
      /> */}
       <FlatList
        data={rooms}
        keyExtractor={(item) => item.roomId ? item.roomId.toString() : 'undefined'}
        renderItem={renderItem}
      />
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: "#F4F4F4",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 22,
    paddingHorizontal: 10,
    margin: 10,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "500",
    marginVertical: 10,
    lineHeight: 14.52,
    marginHorizontal: 15,
  },
  scrollView: {
    flexDirection: "row",
  },
  scrollViewWrapper: {
    marginBottom: 20, // Adjust the value as needed to ensure space between scrollView and FlatList
  },
  imageContainer: {
    width: 102,
    height: 190,
    alignItems: "center",
    marginRight: 10,
  },
  image: {
    width: 102,
    height: 146,
  },
  imageText: {
    textAlign: "center",
    marginTop: 5,
  },
  chatContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  chatImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  chatTextContainer: {
    flex: 1,
  },
  chatText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  chatMessage: {
    fontSize: 14,
    color: "#555",
  },

  // Room list styling
  containerRoom: {
     flex: 1,
     padding: 10,
   },
   roomContainer: {
     padding: '6%',
     borderWidth: 1,
     borderColor: '#ccc',
   },
   memberText: {
     fontSize: 16,
     marginVertical: 2,
     flexWrap: 'wrap',
   },
   loadingIndicator: {
     flex: 1,
     justifyContent: 'center',     
     alignItems: 'center',
   },
});

export default MatchScreen;
