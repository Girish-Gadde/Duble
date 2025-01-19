import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  MaterialIcons,
  Ionicons,
  SimpleLineIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowIcons } from "../Redux/Actions";
import Carousel from "react-native-reanimated-carousel";
import { serverIP } from "@/config";

const width = Dimensions.get("window").width;

// const profiles = [
//   {
//     id: 1,
//     imageSource: require("../../assets/profile-1.jpg"),
//     imageSource1: require("../../assets/profile-6.jpg"),
//     imageSource2: require("../../assets/profile-7.jpg"),
//     imageSource3: require("../../assets/profile-8.jpg"),
//     name1: "Neha",
//     age1: 25,
//     name2: "Shruthi",
//     age2: 24,
//     location: "2 km away",
//     description:
//       "Your go to adventure enthusiast and amateur stand-up comedian",
//     ourStory:
//       "We met at a comedy show where shruthi was performing her stand-up routine and Neha was in the audience",
//     funDate:
//       "Hiking in the mountains, laughing, roasting marshmallows and sharing stories",
//     singleImage1: require("../../assets/image20.jpg"),
//     singleImage2: require("../../assets/image21.jpg"),
//   },
//   {
//     id: 2,
//     imageSource: require("../../assets/profile-2.png"),
//     imageSource1: require("../../assets/profile-9.jpg"),
//     imageSource2: require("../../assets/profile-10.jpg"),
//     imageSource3: require("../../assets/profile-11.jpg"),
//     name1: "Anusha",
//     age1: 24,
//     name2: "Nikitha",
//     age2: 26,
//     location: "3 km away",
//     description: "Crazy cat lady who is as crazy as a cat who loves to explore",
//     ourStory: "We met at a coffee shop and bonded over our love for cats",
//     funDate: "Visiting a cat café and having a cat-themed movie marathon",
//   },
//   {
//     id: 3,
//     imageSource: require("../../assets/profile-3.png"),
//     imageSource1: require("../../assets/profile-5.jpg"),
//     imageSource2: require("../../assets/profile-13.jpg"),
//     imageSource3: require("../../assets/profile-12.jpg"),
//     name1: "Julia",
//     age1: 27,
//     name2: "Jenny",
//     age2: 24,
//     location: "4 km away",
//     description:
//       "Your go to adventure enthusiast and amateur stand-up comedian",
//     ourStory:
//       "We met at a hiking event and instantly clicked while exploring nature",
//     funDate: "Going on a spontaneous road trip to explore new hiking trails",
//   },
//   {
//     id: 4,
//     imageSource: require("../../assets/profile-4.png"),
//     imageSource1: require("../../assets/profile-14.jpg"),
//     imageSource2: require("../../assets/profile-7.jpg"),
//     imageSource3: require("../../assets/profile-8.jpg"),
//     name1: "Shivani",
//     age1: 23,
//     name2: "Chandini",
//     age2: 25,
//     location: "10 km away",
//     description:
//       "We love to travel and experience new places, cultures, animals etc",
//     ourStory:
//       "We met while traveling solo in Europe and decided to explore the rest of the trip together",
//     funDate:
//       "Attending a cultural festival in a foreign country and trying out exotic foods",
//   },
//   // Add more profiles as needed
// ];

const HomeScreen = ({ route, navigation }) => {
  const { refreshYourTeam, dispatch } = route.params;
  const yourTeamProfile = useSelector((state) => state.profile);
  // console.log(yourTeamProfile, "HOME");
  const [currentProfile, setCurrentProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  // useEffect(() => {
  //   if (yourTeamProfile) {
  //   fetchInitialProfile();
  //   }
  // }, []);

  useEffect(() => {
    if (yourTeamProfile) fetchInitialProfile();
  }, [yourTeamProfile]);

  const fetchInitialProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${serverIP}/auth/get-saved-teams`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ yourTeamProfile }),
      });

      const responseData = await response.json();
      if (response.ok) {
        console.log(responseData, "TM--------->>>>>");
        setCurrentProfile(responseData);
        setImages(formatImages(responseData.selectedImages));
      } else {
        setCurrentProfile(null);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatImages = (imagePaths) =>
    imagePaths.map((imagePath) => ({ uri: imagePath }));

  const handleAction = async (url, payload) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();
      if (response.ok && responseData.nextProfile) {
        console.log(responseData, "NEXT-------------------->>>>>>>>>");
        setCurrentProfile(responseData.nextProfile);
        setImages(formatImages(responseData.nextProfile.selectedImages));

        if (responseData.message === "Teams are Matched") {
          Alert.alert("Teams Matched", "Teams are Matched", [
            {
              text: "OK",
              onPress: refreshYourTeam,
            },
          ]);
        }
      } else {
        setCurrentProfile(null); // No more profiles
        setImages([]);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleHeart = () => {
    if (!currentProfile) return;
    const payload = {
      likedTeamId: currentProfile._id,
      likingTeamId: yourTeamProfile._id,
    };
    handleAction(`${serverIP}/like/saving-like-id`, payload);
  };

  const toggleDislike = () => {
    if (!currentProfile) return;
    const payload = {
      dislikedTeamId: currentProfile._id,
      dislikingTeamId: yourTeamProfile._id,
    };
    handleAction(`${serverIP}/like/saving-dislike-id`, payload);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!currentProfile) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No teams available</Text>
        <TouchableOpacity style={styles.newTeamButton} onPress={refreshYourTeam}>
        <Text style={styles.emptyText1}>Get new teams</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderCarouselItem = ({ item }) => {
    //  console.log(item, "PATH");
    return <Image source={item} style={styles.image} resizeMode="cover" />;
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      // onScroll={handleScroll}
      scrollEventThrottle={16}
      style={{ backgroundColor: "#EDEEF1" }}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.carouselContainer}>
          <Carousel
            loop={false}
            data={images}
            // autoPlay={true}
            renderItem={renderCarouselItem}
            width={width}
            height={654}
            //onSnapToItem={(index) => setCurrentProfileIndex(index)}
          />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{currentProfile?.name1},</Text>
            <Text style={styles.ageText}>{currentProfile?.age1}</Text>
            <View style={styles.divider} />
            <Text style={styles.nameText}>{currentProfile?.name2},</Text>
            <Text style={styles.ageText}>{currentProfile?.age2}</Text>
          </View>
          {/* <View style={styles.locationContainer}>
            <MaterialIcons
              name="location-on"
              size={18}
              color="white"
              style={styles.locationIcon}
            />
            <Text style={styles.locationText}>{currentProfile?.location}</Text>
          </View> */}
          <Text style={styles.descriptionText}>
            "{currentProfile?.user1Description}"
          </Text>
        </View>
      </View>

      <View style={styles.actionContainer1}>
        <TouchableOpacity style={styles.actionButton1} onPress={toggleDislike}>
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
        <TouchableOpacity style={styles.actionButton2} onPress={toggleHeart}>
          <View style={styles.heartButton}>
            <AntDesign name="heart" size={30} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      {currentProfile?.dynamicContent?.length > 0 ? (
        currentProfile.dynamicContent.map((content, index) => (
          <View key={index} style={styles.viewContainer}>
            <View style={styles.searchContainer}>
              {/* <Ionicons name="star" size={16} color="#FFFF66" /> */}
              <Text style={styles.searchText}>{content.label}</Text>
            </View>
            <Text style={styles.text}>{content.value}</Text>
          </View>
        ))
      ) : (
        // Show activity indicator while loading
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Loading content...</Text>
        </View>
      )}

      <View style={styles.singleBioContainer}>
        <Image
          source={{
            uri: currentProfile?.user1ProfilePic,
          }}
          style={styles.singleImage}
        />
        <View style={styles.bioDataContainer}>
          <View style={styles.singleNameContainer}>
            <Text style={styles.nameText1}>{currentProfile?.name1},</Text>
            <Text style={styles.ageText1}>{currentProfile?.age1}</Text>
          </View>
          <View style={styles.rowContainer}>
            {/* <View style={styles.iconContainer}>
              <MaterialIcons
                name="location-on"
                size={18}
                color="#121212"
                style={styles.locationIcon}
              />
              <Text style={styles.cell}>{currentProfile?.user1Place}</Text>
            </View> */}

            <View style={styles.iconContainer}>
              <SimpleLineIcons
                name="graduation"
                size={18}
                color="#121212"
                style={styles.locationIcon}
              />
              <Text style={styles.cell}>{currentProfile?.user1Occupation}</Text>
            </View>
          </View>

          <View style={styles.rowContainer}>
            {/* <View style={styles.iconContainer3}>
              <FontAwesome5
                name="ruler-vertical"
                size={18}
                color="#121212"
                style={styles.locationIcon}
              />
              <Text style={styles.cell}>{currentProfile?.user1Height}</Text>
            </View> */}
            <View style={styles.iconContainer}>
              <AntDesign
                name="hearto"
                size={17}
                color="#121212"
                style={styles.locationIcon}
              />
              <Text style={styles.cell}>{currentProfile?.user1gender}</Text>
            </View>
          </View>
          <Text style={styles.singleBioText}>
            {currentProfile?.user1Description}
          </Text>
        </View>
      </View>
      <View style={styles.singleBioContainer}>
        <Image
          source={{
            uri: currentProfile?.user2ProfilePic,
          }}
          style={styles.singleImage}
        />
        <View style={styles.bioDataContainer}>
          <View style={styles.singleNameContainer}>
            <Text style={styles.nameText1}>{currentProfile?.name2},</Text>
            <Text style={styles.ageText1}>{currentProfile?.age2}</Text>
          </View>
          <View style={styles.rowContainer}>
            {/* <View style={styles.iconContainer}>
              <MaterialIcons
                name="location-on"
                size={18}
                color="#121212"
                style={styles.locationIcon}
              />
              <Text style={styles.cell}>{currentProfile?.user2Place}</Text>
            </View> */}

            <View style={styles.iconContainer}>
              <SimpleLineIcons
                name="graduation"
                size={18}
                color="#121212"
                style={styles.locationIcon}
              />
              <Text style={styles.cell}>{currentProfile?.user2Occupation}</Text>
            </View>
          </View>

          <View style={styles.rowContainer}>
            {/* <View style={styles.iconContainer3}>
              <FontAwesome5
                name="ruler-vertical"
                size={18}
                color="#121212"
                style={styles.locationIcon}
              />
              <Text style={styles.cell}>155 cm</Text>
            </View> */}
            <View style={styles.iconContainer}>
              <AntDesign
                name="hearto"
                size={17}
                color="#121212"
                style={styles.locationIcon}
              />
              <Text style={styles.cell}>{currentProfile?.user2gender}</Text>
            </View>
          </View>
          <Text style={styles.singleBioText}>
            {currentProfile?.user2Description}
          </Text>
        </View>
      </View>

      <View style={styles.actionContainer2}>
        <TouchableOpacity style={styles.actionButton} onPress={toggleDislike}>
          <View style={styles.buttonContainer1}>
            <Text style={styles.buttonText}>Reject</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={toggleHeart}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Like</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // swipe: {
  //   position: absolute,
  // },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EDEEF1",
  },
  emptyText: {
    fontSize: 24,
    color: "#333",
    marginBottom: '2%'
  },
  emptyText1: {
    fontSize: 20,
    color: "#333",
  },
  newTeamButton:{
    margin: '3%',
    padding:'3%',
    backgroundColor: '#fffff7',
    borderRadius:10
  },
  image: {
    width: "92%",
    height: 600,
    alignSelf: "center",
    borderRadius: 12,
    marginRight: 3,
  },
  image1: {
    width: "92%",
    height: 600,
    alignSelf: "center",
    borderRadius: 12,
    marginRight: 3,
    marginVertical: 20,
  },
  textContainer: {
    position: "absolute",
    top: 410,
    left: 7,
    right: 0,
    bottom: 0,
    padding: 20,
    width: '90%'
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 2,
  },
  nameText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#EDEEF1",
    marginRight: 10,
  },
  ageText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#EDEEF1",
  },
  nameText1: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#121212",
    marginRight: 10,
    // lineHeight: 36.31,
  },
  ageText1: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#121212",
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
    marginRight: 3,
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
    gap: 20,
    top: "36%",
    marginBottom: "2%",
  },
  actionContainer2: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 20,
    paddingLeft: 20,
    // position: "absolute",
    // bottom: 10,
    // left: 0,
    // right: 0,
    marginVertical: 10,
  },
  actionButton1: { flex: 1, alignItems: "flex-end", marginHorizontal: 15 },
  buttonDisabled: {
    backgroundColor: "#9a73ef",
  },
  actionButton2: { flex: 1, alignItems: "flex-start", marginHorizontal: 15 },
  heartButton: {
    borderRadius: 999,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF3156",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
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
  viewContainer1: {
    backgroundColor: "#FFFFFF",
    marginTop: 40,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 6,
    paddingBottom: 13,
    width: '90%'
  },
  viewContainer: {
    backgroundColor: "#FFFFFF",
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 6,
    paddingBottom: 13,
    width: '90%'
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: "#FF3156",
    borderRadius: 35,
    paddingVertical: 13,
    paddingHorizontal: 10,
    alignItems: "center",
    width: "100%",
    height: 49,
  },
  buttonContainer1: {
    backgroundColor: "#6420AA",
    borderRadius: 35,
    paddingVertical: 13,
    paddingHorizontal: 10,
    alignItems: "center",
    width: "100%",
    height: 49,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    //fontWeight: "bold",
    // marginTop: 5,
  },
  loadingContainer: {
    //flex: 1,
    height: 600,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional: to add a semi-transparent background
    marginHorizontal: 20,
    borderRadius: 10,
  },

  loadingIndicator: {
    transform: [{ scale: 2 }], // Increase the size of the ActivityIndicator
  },
  // loadingContainer: {
  //   position: "absolute",
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   backgroundColor: "rgba(255, 255, 255, 0.8)",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   zIndex: 1000, // Ensure it's above other content
  // },
  singleImage: {
    height: 145,
    width: '40%',
    marginHorizontal: 10,
    marginTop: 15,
    borderRadius: 5,
  },
  singleBioContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginVertical: 10,
    marginHorizontal: 20,
    //   marginBottom: 10,
    borderRadius: 6,
    paddingBottom: 13,
  },
  singleNameContainer: {
    flex: 0.2,
    flexDirection: "row",
    // backgroundColor: "pink",
  },
  bioDataContainer: {
    flex: 1,
    flexDirection: "column",
    margin: 4,
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    //alignItems: "flex-end",
    //backgroundColor: "#ccc",
  },
  iconContainer: {
    flex: 0.8,
    flexDirection: "row",
    marginRight: 3,
    //  backgroundColor: "green",
  },
  iconContainer3: {
    flex: 0.8,
    flexDirection: "row",
    marginLeft: 4,
    marginRight: 3,
    //  backgroundColor: "green",
  },
  cell: {
    fontSize: 14, // Font size between 15 to 20
    marginBottom: 10,
    color: "#000000",
    marginRight: 2,
  },
  singleBioText: {
    fontSize: 14,
    color: "#000000",
    marginLeft: 3,
    lineHeight: 16.77,
  },
  imageContainer: {
    marginTop: 40,
  },
  carouselContainer: {
    marginVertical: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#454545",
  },
  // carouselImage: {
  //   width: viewportWidth - 60,
  //   height: 200,
  //   borderRadius: 10,
  // },
});

export default HomeScreen;
