import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const profiles = [
  {
    id: 1,
    imageSource: require("../../assets/profile-image-1.jpg"),
    name1: "Neha",
    age1: 25,
    name2: "Shruthi",
    age2: 24,
    location: "2 km away",
    description:
      "Your go to adventure enthusiast and amateur stand-up comedian",
  },
  {
    id: 2,
    imageSource: require("../../assets/profile-2.png"),
    name1: "Anusha",
    age1: 24,
    name2: "Nikitha",
    age2: 26,
    location: "3 km away",
    description: "Crazy cat lady who is as crazy as a cat who loves to explore",
  },
  {
    id: 3,
    imageSource: require("../../assets/profile-3.png"),
    name1: "Julia",
    age1: 27,
    name2: "Jenny",
    age2: 24,
    location: "4 km away",
    description:
      "Your go to adventure enthusiast and amateur stand-up comedian",
  },
  {
    id: 4,
    imageSource: require("../../assets/profile-4.png"),
    name1: "Shivani",
    age1: 23,
    name2: "Chandini",
    age2: 25,
    location: "10 km away",
    description:
      "We love to travel and experience new places, cultures, animals etc",
  },
  // Add more profiles as needed
];

const ProfileScreen1 = ({ navigation }) => {
  const [isHeartActive, setIsHeartActive] = useState(false);
  const [showIcons, setShowIcons] = useState(true);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const isEditVisible = useSelector((state) => state.showEditButtonAndBio);
  //const navigation = useNavigation();

  const toggleHeart = () => {
    setIsHeartActive(!isHeartActive);

    setCurrentProfileIndex(
      currentProfileIndex < profiles.length - 1 ? currentProfileIndex + 1 : 0
    );
  };

  const handleScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const show = currentOffset <= 0;

    if (show !== showIcons) {
      setShowIcons(show);
    }
  };

  const goToProfileDetails = () => {
    navigation.navigate("ProfileDetails", {});
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      style={{ backgroundColor: "#EDEEF1" }}
    >
      <View style={{ flex: 1 }}>
        <Image
          source={profiles[currentProfileIndex].imageSource}
          style={styles.image}
          resizeMode="cover"
        />
        {isEditVisible && (
          <TouchableOpacity
            style={styles.editButton}
            onPress={goToProfileDetails}
          >
            <View style={styles.editButtonContainer}>
              <Ionicons
                name="infinite-outline"
                size={24}
                color="red"
                style={styles.icon}
              />
              <Text style={styles.editButtonText}>Edit</Text>
            </View>
          </TouchableOpacity>
        )}

        <View style={styles.textContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>
              {profiles[currentProfileIndex].name1},
            </Text>
            <Text style={styles.ageText}>
              {profiles[currentProfileIndex].age1}
            </Text>
          </View>
          <View style={styles.locationContainer}>
            <MaterialIcons
              name="location-on"
              size={18}
              color="white"
              style={styles.locationIcon}
            />
            <Text style={styles.locationText}>
              {profiles[currentProfileIndex].location}
            </Text>
          </View>
          <Text style={styles.descriptionText}>
            "{profiles[currentProfileIndex].description}"
          </Text>
        </View>
        {/*
          showIcons ? (
            <View style={styles.actionContainer1}>
              <TouchableOpacity style={styles.actionButton1}>
                <View
                  style={{
                    backgroundColor: "#6420AA",
                    borderRadius: 999,
                    width: 60,
                    height: 60,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AntDesign name="close" size={30} color="white" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton2}
                onPress={toggleHeart}
              >
                <View
                  style={[
                    styles.heartButton,
                    { backgroundColor: isHeartActive ? "#00b300" : "#FF3156" },
                  ]}
                >
                  <AntDesign name="heart" size={30} color="white" />
                </View>
              </TouchableOpacity>
            </View>
          ) : null
        */}

        <View style={{ marginTop: 15 }}>
          <View style={styles.viewContainer}>
            <View style={styles.searchContainer}>
              {/* <Ionicons name="search" size={16} color="#454545" /> */}
              <Text style={styles.searchText}>🔍 Our Story</Text>
            </View>
            <Text style={styles.text}>
              We met at a comedy show where Shruti was performing her stand-up
              routine, and Neha was in the audience.
            </Text>
          </View>
          <View style={styles.viewContainer}>
            <View style={styles.searchContainer}>
              {/* <Ionicons name="star" size={16} color="#FFFF66" /> */}
              <Text style={styles.searchText}>🌟 Our Idea of a Fun Date</Text>
            </View>
            <Text style={styles.text}>
              Hiking in the mountains, laughing, roasting marshmallows and
              sharing stories{" "}
            </Text>
          </View>
          <View style={styles.viewContainer}>
            <View style={styles.searchContainer}>
              {/* <Ionicons name="star" size={16} color="#FFFF66" /> */}
              <Text style={styles.searchText}>🌟 Life Philosophy: </Text>
            </View>
            <Text style={styles.text}>
              "Embrace the unknown, for it is where growth and adventure await."
            </Text>
          </View>
          <View style={styles.viewContainer}>
            <View style={styles.searchContainer}>
              {/* <Ionicons name="star" size={16} color="#FFFF66" /> */}
              <Text style={styles.searchText}>🏞️ Ideal Weekend</Text>
            </View>
            <Text style={styles.text}>
              My perfect weekend involves starting the day with a hike in the
              mountains, followed by a cozy afternoon painting in my studio.
            </Text>
          </View>
          {/* <View style={styles.actionContainer2}> 
          <TouchableOpacity style={styles.goBackButton} onPress={toggleHeart}>
            <View style={[styles.buttonBackContainer]}>
              <Text style={styles.backButtonText}>Go Back</Text>
            </View>
          </TouchableOpacity>
      </View> */}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "92%",
    height: 600,
    alignSelf: "center",
    borderRadius: 12,
    marginRight: 3,
  },
  textContainer: {
    position: "absolute",
    top: 450,
    left: 7,
    right: 0,
    bottom: 0,
    padding: 20,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  nameText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#EDEEF1",
    marginRight: 10,
  },
  ageText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#EDEEF1",
  },
  divider: {
    width: 3,
    height: 30,
    backgroundColor: "white",
    marginHorizontal: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  locationIcon: {
    marginRight: 5,
  },
  locationText: {
    fontSize: 16,
    color: "#EDEEF1",
  },
  descriptionText: {
    fontSize: 14,
    color: "#EDEEF1",
    marginBottom: 20,
  },
  actionContainer1: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "absolute",
    top: 565,
    marginBottom: 20,
  },
  actionContainer2: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 20,
    paddingLeft: 8,
    // position: "absolute",
    // bottom: 10,
    // left: 0,
    // right: 0,
    marginTop: 40,
    marginBottom: 5,
  },
  actionButton1: { flex: 1, alignItems: "flex-end", marginHorizontal: 15 },
  actionButton2: { flex: 1, alignItems: "flex-start", marginHorizontal: 15 },
  heartButton: {
    borderRadius: 999,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 15,
  },
  searchText: {
    fontSize: 16,
    color: "black",
    marginLeft: 2,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    lineHeight: 15,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  viewContainer: {
    backgroundColor: "#FFFFFF",
    marginTop: 30,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 6,
    paddingBottom: 10,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: "#6420AA",
    borderRadius: 35,
    paddingVertical: 13,
    paddingHorizontal: 10,
    alignItems: "center",
    width: 170,
    height: 49,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    //fontWeight: "bold",
    // marginTop: 5,
  },
  editButton: {
    position: "absolute",
    width: 98,
    height: 40,
    top: 6,
    left: 262,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
  },
  editButtonContainer: {
    // backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 84,
    height: 30,
    paddingTop: 6,
  },
  editButtonText: {
    color: "#FF3156",
    fontSize: 20,
    marginLeft: 5,
    //fontWeight: "bold",
    // marginTop: 5,
  },
  icon: {
    marginTop: 2,
    marginHorizontal: 7, // Adjust the spacing between icon and text as needed
  },
  goBackButton: {
    width: 345,
    height: 49,
    margin: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 35,
    // paddingVertical: 10,
    // paddingHorizontal: 10,

    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    border: 2,
    borderWidth: 2,
    borderColor: "#45474B",
  },
  // buttonBackContainer: {
  //   width: 345,
  //   height: 49,
  // },
  backButtonText: {
    width: 80,
    height: 24,
    color: "#121212",
    fontSize: 20,
    alignItems: "center",
    marginBottom: 4.5,
  },
});

export default ProfileScreen1;
