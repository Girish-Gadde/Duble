import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  MaterialIcons,
  Ionicons,
  SimpleLineIcons,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import Carousel from "react-native-reanimated-carousel";
import { serverIP } from "@/config";
import { useSelector } from "react-redux";

const width = Dimensions.get("window").width;

const LikedProfile = ({ route, navigation }) => {
  const { profile, yourTeamProfile, refreshYourTeam, handleMenuClick } =
    route.params;
  // console.log(profile, yourTeamProfile, "NAME");
  const menuClicked = useSelector((state) => state.menuClicked);
  const [isHeartActive, setIsHeartActive] = useState(false);
  const [showIcons, setShowIcons] = useState(true);
  const [images, setImages] = useState([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  //const navigation = useNavigation();
  useEffect(() => {
    if (menuClicked) {
      navigation.goBack(); // Go back when menuClicked is true
    }
  }, [menuClicked, navigation]);

  useEffect(() => {
    const formattedImages = (profile.selectedImages || []).map((imagePath) => ({
      uri: `${imagePath}`,
    }));
    setImages(formattedImages);
  }, []);

  const toggleHeart = async () => {
    setIsHeartActive(!isHeartActive);
    try {
      // Make the request to the backend to update matchIDs
      const response = await fetch(`${serverIP}/match/natch-to-team`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likedTeamId: profile._id, // The team that has liked you
          likingTeamId: yourTeamProfile._id, // Your team profile
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Match updated successfully:", result);
        // Optionally, navigate to the "LikedMatch" screen with the profile data
        await refreshYourTeam();
        navigation.navigate("LikedMatch", { profile, yourTeamProfile });
      } else {
        console.error("Failed to update match:", result.message);
      }
    } catch (error) {
      console.error("Error making request:", error);
    }
  };

  const handleScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const show = currentOffset <= 0;

    if (show !== showIcons) {
      setShowIcons(show);
    }
  };

  const toggleDislike = async () => {
    // setIsDislikeActive(!isDislikeActive);
    // updateCurrentIndex(
    //   currentProfileIndex < profiles.length - 1 ? currentProfileIndex + 1 : 0
    // );

    const dislikedTeamId = profile._id; // The team being disliked
    const dislikingTeamId = yourTeamProfile._id; // The user's team profile

    try {
      const response = await fetch(`${serverIP}/like/saving-dislike-id`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dislikedTeamId, dislikingTeamId }),
      });

      if (!response.ok) {
        throw new Error("Failed to update dislike status");
      }
      await refreshYourTeam();
      navigation.goBack();
      //removeProfile();
    } catch (error) {
      console.error("Error updating dislike status:", error);
    }
  };

  const renderCarouselItem = ({ item }) => {
    return <Image source={item} style={styles.image} resizeMode="cover" />;
  };

  // const images = [
  //   profile.imageSource,
  //   profile.imageSource1,
  //   profile.imageSource2,
  //   profile.imageSource3,
  // ];

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      style={{ backgroundColor: "#EDEEF1" }}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.carouselContainer}>
          <Carousel
            loop={false}
            data={images}
            renderItem={renderCarouselItem}
            width={width}
            height={654}
            //onSnapToItem={(index) => setCurrentProfileIndex(index)}
          />
        </View>
        <View style={styles.likedView}>
          <Icon name="heart" size={18} color="#fff" />
          <Text style={styles.likedText}>Likes you</Text>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{profile.name1},</Text>
            <Text style={styles.ageText}>{profile.age1}</Text>
            <View style={styles.divider} />
            <Text style={styles.nameText}>{profile.name2},</Text>
            <Text style={styles.ageText}>{profile.age2}</Text>
          </View>
          {/* <View style={styles.locationContainer}>
            <MaterialIcons
              name="location-on"
              size={18}
              color="white"
              style={styles.locationIcon}
            />
            <Text style={styles.locationText}>{profile.location}</Text>
          </View> */}
          <Text style={styles.descriptionText}>
            "{profile.user1Description}""
          </Text>
        </View>

        <View style={styles.actionContainer1}>
          <TouchableOpacity
            style={styles.actionButton1}
            onPress={toggleDislike}
          >
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
            <View
              style={[
                styles.heartButton,
                { backgroundColor: isHeartActive ? "#FF3156" : "#FF3156" },
              ]}
            >
              <AntDesign name="heart" size={30} color="white" />
            </View>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.viewContainer1}>
          <View style={styles.searchContainer}>
            <Text style={styles.searchText}>🔍 Our Story</Text>
          </View>
          <Text style={styles.text}>{profile.ourStory}</Text>
        </View>
        <View style={styles.viewContainer}>
          <View style={styles.searchContainer}>   
            <Text style={styles.searchText}>🌟 Our Idea of a Fun Date</Text>
          </View>
          <Text style={styles.text}>{profile.funDate}</Text>
        </View> */}
        {profile.dynamicContent?.length > 0 ? (
          profile.dynamicContent.map((content, index) => (
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
              uri: profile.user1ProfilePic,
            }}
            style={styles.singleImage}
          />
          <View style={styles.bioDataContainer}>
            <View style={styles.singleNameContainer}>
              <Text style={styles.nameText1}>{profile.name1},</Text>
              <Text style={styles.ageText1}>{profile.age1}</Text>
            </View>
            <View style={styles.rowContainer}>
              {/* <View style={styles.iconContainer}>
                <MaterialIcons
                  name="location-on"
                  size={18}
                  color="#121212"
                  style={styles.locationIcon}
                />
                <Text style={styles.cell}>{profile.user1Place}</Text>
              </View> */}

              <View style={styles.iconContainer}>
                <SimpleLineIcons
                  name="graduation"
                  size={18}
                  color="#121212"
                  style={styles.locationIcon}
                />
                <Text style={styles.cell}>{profile.user1Occupation}</Text>
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
                <Text style={styles.cell}>{profile.user1Height}</Text>
              </View> */}
              <View style={styles.iconContainer}>
                <AntDesign
                  name="hearto"
                  size={17}
                  color="#121212"
                  style={styles.locationIcon}
                />
                <Text style={styles.cell}>{profile.user1gender}</Text>
              </View>
            </View>
            <Text style={styles.singleBioText}>{profile.user1Description}</Text>
          </View>
        </View>
        <View style={styles.singleBioContainer}>
          <Image
            source={{
              uri: profile.user2ProfilePic,
            }}
            style={styles.singleImage}
          />
          <View style={styles.bioDataContainer}>
            <View style={styles.singleNameContainer}>
              <Text style={styles.nameText1}>{profile.name2},</Text>
              <Text style={styles.ageText1}>{profile.age2}</Text>
            </View>
            <View style={styles.rowContainer}>
              {/* <View style={styles.iconContainer}>
                <MaterialIcons
                  name="location-on"
                  size={18}
                  color="#121212"
                  style={styles.locationIcon}
                />
                <Text style={styles.cell}>{profile.user2Place}</Text>
              </View> */}

              <View style={styles.iconContainer}>
                <SimpleLineIcons
                  name="graduation"
                  size={18}
                  color="#121212"
                  style={styles.locationIcon}
                />
                <Text style={styles.cell}>{profile.user2Occupation}</Text>
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
                <Text style={styles.cell}>{profile.user2gender}</Text>
              </View>
            </View>
            <Text style={styles.singleBioText}>{profile.user2Description}</Text>
          </View>
        </View>
      </View>
      <View style={styles.actionContainer2}>
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Reject</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={toggleHeart}>
          <View
            style={[
              styles.buttonContainer,
              { backgroundColor: isHeartActive ? "#FF3156" : "#FF3156" },
            ]}
          >
            <Text style={styles.buttonText}>Like</Text>
          </View>
        </TouchableOpacity>
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
    top: 410,
    left: 7,
    right: 0,
    bottom: 0,
    padding: 20,
    width: "90%"
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
    marginVertical: 10,
     width: "98%"
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
    marginTop: 45,
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
    marginHorizontal: 12,
  },
  buttonContainer: {
    backgroundColor: "#6420AA",
    borderRadius: 35,
    paddingVertical: 13,
    paddingHorizontal: 10,
    alignItems: "center",
    width: 165,
    height: 49,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    //fontWeight: "bold",
    // marginTop: 5,
  },
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
  likedView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FF3156",
    width: 124,
    height: 29,
    borderRadius: 48,
    paddingHorizontal: 15,
    paddingVertical: 5,
    position: "absolute",
    top: 23,
    left: 131,
  },
  likedText: {
    color: "#EDEEF1",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 19.36,
  },
  carouselContainer: {
    marginVertical: 10,
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
});

export default LikedProfile;
