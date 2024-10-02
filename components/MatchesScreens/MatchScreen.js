import { serverIP } from "@/config";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState, useRef } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios"; // Make sure to import axios if you're using it
import { useSelector } from "react-redux";
import { menuClickAction } from "../Redux/Actions";
// import { useUserContext } from 'path-to-your-context'; // Uncomment and adjust the path if you have a UserContext

const MatchScreen = ({ route, navigation }) => {
  // **HOOKS AND STATE DECLARATIONS**
  // Make sure all hooks are declared at the top level
  const { dispatch } = route.params;
  const yourTeamProfile = useSelector((state) => state.profile);
  const [teams, setTeams] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // **TEAM ID**
  // You can get teamId from yourTeamProfile or route.params
  const teamId = "66d6ee9e92e63ffe7c44f9ef"; // Adjust this based on your data structure

  // **CONTEXT (If used)**
  // If you're using useUserContext, make sure it's properly set up
  // const { indexRef } = useUserContext();
  // const displayIndex = useRef(indexRef.current);

  // **EFFECT TO FETCH MATCHED TEAMS**
  useEffect(() => {
    const matchIDs = yourTeamProfile.matchIDs;

    const fetchTeams = async () => {
      try {
        const response = await fetch(`${serverIP}/match/get-matched-teams`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ matchIDs }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch teams");
        }

        const data = await response.json();
        console.log(data, "MATCHED_TEAMS");
        setTeams(data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    if (matchIDs && matchIDs.length > 0) {
      fetchTeams();
    }
  }, [yourTeamProfile]);

  // **EFFECT TO FETCH CHAT ROOMS**
  useEffect(() => {
    const fetchRooms = async () => {
      if (!teamId) {
        console.warn("No team ID provided");
        alert("Please enter a team ID");
        setLoading(false);
        return;
      }

      console.log("Fetching rooms for team ID:", teamId);

      try {
        const response = await axios.get(
          `${serverIP}/chat-room/api/rooms/${teamId}`
        );
        console.log("Fetched rooms data:", response.data);

        if (!response.data || response.data.length === 0) {
          console.warn("No rooms found for the provided team ID.");
          alert("No rooms found for the provided team ID.");
          setRooms([]);
        } else {
          setRooms(response.data);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
        alert("Failed to fetch rooms");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [teamId]); // Fetch rooms when component mounts

  // **NAVIGATION FUNCTIONS**
  const navigateToMatchedTeam = (profile) => {
    dispatch(menuClickAction());
    navigation.navigate("TeamProfile", { profile, yourTeamProfile });
  };

  const handleRoomPress = (room) => {
    const { roomId, teams } = room;
    // Find the team that matches the teamId and get its members
    const team = teams.find((t) => t.teamId === teamId);
    const memberName =
      team && team.members && team.members.length > 0
        ? team.members[0]
        : "No member";
    console.log("Room selected:", roomId);
    console.log("Members:", team ? team.members : "No members");
    navigation.navigate("Chat", { roomId, username: memberName });
  };

  // **RENDER FUNCTIONS**
  const renderChatItem = ({ item }) => {
    console.log("Rendering room item:", item); // Debugging log

    // Ensure teams is an array before flattening its members
    const allMembers = Array.isArray(item.teams)
      ? item.teams.flatMap((team) => team.members).join("   ") // Adding spaces between names
      : "No members available";

    return (
      <TouchableOpacity onPress={() => handleRoomPress(item)}>
        <View style={styles.chatContainer}>
          {/* Placeholder image, replace with actual image if available */}
          <Image
            source={require("../../assets/profile-1.jpg")}
            style={styles.chatImage}
          />
          <View style={styles.chatTextContainer}>
            <Text style={styles.chatText}>{allMembers}</Text>
            <Text style={styles.chatMessage}>
              Chat description or last message
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // **LOADING STATE**
  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={styles.loadingIndicator}
      />
    );
  }

  // **MAIN RETURN**
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
          {teams.map((profile, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigateToMatchedTeam(profile)}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: `${profile.selectedImages[0]}` }}
                  style={styles.image}
                />
                <Text style={styles.imageText}>
                  {profile.name1} & {profile.name2}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <Text style={styles.headerText}>Chats</Text>
      <FlatList
        data={rooms}
        keyExtractor={(item) =>
          item.roomId ? item.roomId.toString() : "undefined"
        }
        renderItem={renderChatItem}
      />
    </View>
  );
};

// **STYLES**
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
    marginBottom: 20,
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
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MatchScreen;
