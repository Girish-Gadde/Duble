import { serverIP } from "@/config";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
//import LinearGradient from "react-native-linear-gradient";

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

const Likes = ({ route, navigation }) => {
  //const navigation = useNavigation();
  const { yourTeamProfile } = route.params;
  const [teams, setTeams] = useState([]);
  console.log(yourTeamProfile, "HOME_LIKE");
  const likedByIDs = yourTeamProfile.likedByIDs;

  useEffect(() => {
    // Function to fetch teams from the back-end
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${serverIP}/like/get-liked-teams`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ likedByIDs }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch teams");
        }

        const data = await response.json();
        console.log(data, "LIKED_TEAMS");
        setTeams(data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    if (likedByIDs && likedByIDs.length > 0) {
      fetchTeams();
    }
  }, [likedByIDs]);

  const navigateToLikedProfile = (item) => {
    navigation.navigate("LikedProfile", { profile: item });
  };
  return (
    <View style={styles.container}>
      <TextInput style={styles.searchBar} placeholder="Search..." />
      <Text style={styles.headerText}>People who liked you</Text>
      <FlatList
        data={teams}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.profileContainer}
            onPress={() => navigateToLikedProfile(item)}
          >
            {/* <View> */}
            <Image
              source={{ uri: `${serverIP}${item.selectedImages[0]}` }}
              style={styles.profileImage}
            />
            <Text
              style={styles.profileText}
            >{`${item.name1} & ${item.name2}`}</Text>
            {/* </View> */}
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id.toString()}
        numColumns={3}
        contentContainerStyle={styles.flatListContent}
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
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "500",
    marginVertical: 10,
    lineHeight: 14.52,
    marginHorizontal: 5,
  },
  flatListContent: {
    justifyContent: "space-between",
  },
  profileContainer: {
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 6,
    flex: 1,
    maxWidth: "30%", // Ensures 3 items per row
  },
  profileImage: {
    width: 110,
    height: 169,
    borderRadius: 11.64,
    marginBottom: 5,
  },
  profileText: {
    textAlign: "center",
    fontSize: 12,
    lineHeight: 14.52,
    color: "#45474B",
    fontWeight: "400",
  },
});

export default Likes;
