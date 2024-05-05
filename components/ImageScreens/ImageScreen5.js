import React, { useMemo, useRef, useState } from "react";
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
import TinderCard from "react-tinder-card";

const profiles = [
  {
    id: 1,
    imageSource: require("../../assets/capture1.png"),
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
    ourStory: "We met at a coffee shop and bonded over our love for cats",
    funDate: "Visiting a cat café and having a cat-themed movie marathon",
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
    ourStory:
      "We met at a hiking event and instantly clicked while exploring nature",
    funDate: "Going on a spontaneous road trip to explore new hiking trails",
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
    ourStory:
      "We met while traveling solo in Europe and decided to explore the rest of the trip together",
    funDate:
      "Attending a cultural festival in a foreign country and trying out exotic foods",
  },
  // Add more profiles as needed
];

const ImageScreen5 = () => {
  const [isHeartActive, setIsHeartActive] = useState(false);
  const [showIcons, setShowIcons] = useState(true);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(
    profiles.length - 1
  );
  const navigation = useNavigation();
  const [lastDirection, setLastDirection] = useState();
  const currentIndexRef = useRef(currentProfileIndex);

  const childRefs = useMemo(
    () =>
      Array(profiles.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentProfileIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentProfileIndex < profiles.length - 1;

  const canSwipe = currentProfileIndex >= 0;

  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir) => {
    if (canSwipe && currentProfileIndex < profiles.length) {
      await childRefs[currentProfileIndex].current.swipe(dir); // Swipe the card!
    }
  };
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentProfileIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

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

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      style={{ backgroundColor: "#EDEEF1" }}
    >
      {profiles.map((character, index) => (
        <TinderCard
          ref={childRefs[index]}
          //className="swipe"
          style={styles.swipe}
          key={character.name1}
          onSwipe={(dir) => swiped(dir, character.name1, index)}
          onCardLeftScreen={() => outOfFrame(character.name1, index)}
        >
          <View style={styles.profileContainer}>
            <Image
              source={character.imageSource}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.textContainer}>
              <View style={styles.nameContainer}>
                <Text style={styles.nameText}>{character.name1},</Text>
                <Text style={styles.ageText}>{character.age1}</Text>
                <View style={styles.divider} />
                <Text style={styles.nameText}>{character.name2},</Text>
                <Text style={styles.ageText}>{character.age2}</Text>
              </View>
              <View style={styles.locationContainer}>
                <MaterialIcons
                  name="location-on"
                  size={18}
                  color="white"
                  style={styles.locationIcon}
                />
                <Text style={styles.locationText}>{character.location}</Text>
              </View>
              <Text style={styles.descriptionText}>
                "{character.description}""
              </Text>
            </View>
            {showIcons ? (
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
                  onPress={() => swipe("right")}
                >
                  <View
                    style={[
                      styles.heartButton,
                      {
                        backgroundColor: isHeartActive ? "#00b300" : "#FF3156",
                      },
                    ]}
                  >
                    <AntDesign name="heart" size={30} color="white" />
                  </View>
                </TouchableOpacity>
              </View>
            ) : null}

            <View style={styles.viewContainer}>
              <View style={styles.searchContainer}>
                <Ionicons name="search" size={16} color="#454545" />
                <Text style={styles.searchText}>Our Story</Text>
              </View>
              <Text style={styles.text}>{character.ourStory} </Text>
            </View>
            <View style={styles.viewContainer}>
              <View style={styles.searchContainer}>
                <Ionicons name="star" size={16} color="#FFFF66" />
                <Text style={styles.searchText}>Our Idea of a Fun Date</Text>
              </View>
              <Text style={styles.text}>{character.funDate} </Text>
            </View>
            {/* <div
              style={{ backgroundImage: 'url(' + character.url + ')' }}
              className='card'
            >
              <h3>{character.name}</h3>
            </div> */}
          </View>
        </TinderCard>
      ))}

      <View style={styles.actionContainer2}>
        <TouchableOpacity style={styles.actionButton} onPress={() => goBack()}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Reject</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => swipe("right")}
        >
          <View
            style={[
              styles.buttonContainer,
              { backgroundColor: isHeartActive ? "#00b300" : "#FF3156" },
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
  swipe: {
    //position: "absolute",
    backgroundColor: "#EDEEF1",
  },
  profileContainer: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#EDEEF1",
  },
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
    position: "absolute",
    top: 550,
    left: 0,
    right: 0,
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
  viewContainer: {
    backgroundColor: "#FFFFFF",
    marginTop: 40,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 6,
    paddingBottom: 13,
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
});

export default ImageScreen5;
