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
import { menuClickAction, menuClickAction1 } from "../Redux/Actions";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useUserContext } from 'path-to-your-context'; // Uncomment and adjust the path if you have a UserContext

const MatchScreen = ({ route, navigation,onRoomSelect }) => {
  // **HOOKS AND STATE DECLARATIONS**
  // Make sure all hooks are declared at the top level
  const { userName, dispatch } = route.params;
  const yourTeamProfile = useSelector((state) => state.profile);
  const [teams, setTeams] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [clickStatuses, setClickStatuses] = useState({});
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
    if (!yourTeamProfile) {
      console.log("Profile not available");
      setLoading(false); // Stop loading if no profile is available
      return;
    }

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

        const storedStatuses = await AsyncStorage.getItem(
          `clickStatuses_${yourTeamProfile._id}_Match`
        );
        const statuses = storedStatuses ? JSON.parse(storedStatuses) : {};
        setClickStatuses(statuses);
        console.log(statuses, clickStatuses, "CLICK-MATCH");
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    const fetchRooms = async () => {
      if (!yourTeamProfile._id) {
        console.warn("No team ID provided");
        alert("Please enter a team ID");
        setLoading(false);
        return;
      }

      console.log("Fetching rooms for team ID:", yourTeamProfile._id);

      try {
        const response = await axios.get(
          `${serverIP}/chat-room/api/rooms/${yourTeamProfile._id}`
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
        console.log("Error fetching rooms:", error);
        // alert("Failed to fetch rooms");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
    fetchRooms();
  }, [yourTeamProfile]);

  // **EFFECT TO FETCH CHAT ROOMS**
  // useEffect(() => {
  // }, [yourTeamProfile]); // Fetch rooms when component mounts

  // **NAVIGATION FUNCTIONS**
  const navigateToMatchedTeam = async (profile) => {
    try {
      if (!clickStatuses[profile._id]) {
        const updatedStatuses = { ...clickStatuses, [profile._id]: true };
        await AsyncStorage.setItem(
          `clickStatuses_${yourTeamProfile._id}_Match`,
          JSON.stringify(updatedStatuses)
        );
        setClickStatuses(updatedStatuses);
        console.log(updatedStatuses, clickStatuses, "AFTER CLICK");
      }
      dispatch(menuClickAction());
      navigation.navigate("TeamProfile", { profile, yourTeamProfile, userName });
    } catch (error) {
      console.error("Error updating click status:", error);
      Alert.alert("Error", "Failed to update click status. Please try again.");
    }
  };

  const handleRoomPress = (room) => {
    console.log(room, 'RM-TEAM')
    const { roomId, teams } = room;
    // Find the team that matches the teamId and get its members
    const team = teams.find((t) => t.teamId !== yourTeamProfile._id);
    const memberName =
      team && team.members && team.members.length > 0
        ? team.members[0]
        : "No member";
    console.log("Room selected:", roomId);
    console.log("Members:", team ? team.members : "No members");
    dispatch(menuClickAction());
 //   navigation.navigate("Chat", { roomId, username: userName });
 if (team) {
  const teaMembers = team.members;
  const imageUrl = team.imageUrl;
  onRoomSelect(roomId, userName, teaMembers, imageUrl);
}
  };

  // **RENDER FUNCTIONS**
  const renderChatItem = ({ item }) => {
    console.log("Rendering room item:", item); // Debugging log

    // Ensure teams is an array before flattening its members
    const matchedTeam = Array.isArray(item.teams)
    ? item.teams.find((team) => team.teamId !== yourTeamProfile._id) // Find the matched team
    : null;
  
  const matchedTeamMembers = matchedTeam
    ? matchedTeam.members.join("  &  ") // Join members with spaces
    : "No members available";
  
  console.log("Matched Team: ", matchedTeam);

    return (
      <TouchableOpacity onPress={() => handleRoomPress(item)}>
        <View style={styles.chatContainer}>
          {/* Placeholder image, replace with actual image if available */}
          <Image
            source={matchedTeam?.imageUrl ? { uri: matchedTeam.imageUrl } : require("../../assets/profile-1.jpg")}
            style={styles.chatImage}
          />
          <View style={styles.chatTextContainer}>
            <Text style={styles.chatText}>{matchedTeamMembers}</Text>
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
      {/*  <TextInput style={styles.searchBar} placeholder="Search matches" /> */}
      <Text style={styles.headerText}>New Matches</Text>
      <View style={styles.scrollViewWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
        >
          {teams.map((profile) => {
            const showBorder = !clickStatuses[profile._id];
            return (
              <TouchableOpacity
                key={profile._id}
                onPress={() => navigateToMatchedTeam(profile)}
              >
                <View style={styles.imageContainer}>
                  {showBorder ? (
                    <LinearGradient
                      colors={["#6420AA", "#FF3EA5"]}
                      style={styles.gradientBorder}
                    >
                      <Image
                        source={{ uri: profile.selectedImages[0] }}
                        style={styles.image}
                      />
                    </LinearGradient>
                  ) : (
                    <Image
                      source={{ uri: profile.selectedImages[0] }}
                      style={styles.image}
                    />
                  )}
                  <Text style={styles.imageText}>
                    {profile.name1} & {profile.name2}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
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
    width: 120,
    height: 190,
    alignItems: "center",
    marginRight: 10,
  },
  image: {
    width: 102,
    height: 146,
    marginVertical: 2,
    marginHorizontal: 2,
    borderRadius: 10,
  },
  gradientBorder: {
    padding: 2, // Thickness of the gradient border
    borderRadius: 10, // Make sure it matches the shape of the image
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
