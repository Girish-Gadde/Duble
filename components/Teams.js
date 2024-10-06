import React, { useEffect, useRef, useState, useContext } from "react";
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon1 from "react-native-vector-icons/Feather";
import Icon2 from "react-native-vector-icons/Octicons";
import CreateTeam from "./Team/TeamCreateManually/TeamInvite";
import JoinTeam from "./Team/TeamCreateManually/JoinTeam";

import { UserContext } from "./Team Switch/UserContext";
import { serverIP } from "@/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

//const serverIP = "http://192.168.1.10:4002";
//const userId = "66d6e8e49b889ada7a2c9fcf";

const { height } = Dimensions.get("window");

const profiles = [
  {
    id: 1,
    imageSource: require("../assets/profile-1.jpg"),
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
    singleImage1: require("../assets/image20.jpg"),
    singleImage2: require("../assets/image21.jpg"),
  },
  {
    id: 2,
    imageSource: require("../assets/profile-2.png"),
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
    imageSource: require("../assets/profile-3.png"),
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
  // {
  //   id: 4,
  //   imageSource: require("../assets/profile-4.png"),
  //   name1: "Shivani",
  //   age1: 23,
  //   name2: "Chandini",
  //   age2: 25,
  //   location: "10 km away",
  //   description:
  //     "We love to travel and experience new places, cultures, animals etc",
  //   ourStory:
  //     "We met while traveling solo in Europe and decided to explore the rest of the trip together",
  //   funDate:
  //     "Attending a cultural festival in a foreign country and trying out exotic foods",
  // },
  // Add more profiles as needed
];

const Teams = ({ route, navigation }) => {
  // Pop up modal code
  const { userId, refreshYourTeam } = route.params;
  console.log("USER ID ---->", userId);
  const [isPopup1Visible, setPopup1Visible] = useState(false);
  const [isPopup2Visible, setPopup2Visible] = useState(false);

  const openPopup1 = () => {
    setPopup1Visible(true);
  };

  const closePopup1 = () => {
    setPopup1Visible(false);
  };

  const openPopup2 = () => {
    setPopup2Visible(true);
  };

  const closePopup2 = () => {
    setPopup2Visible(false);
  };

  // Pop up modal code

  //Team Selection Code
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState("");
  const [tempSelection, setTempSelection] = useState(null);
  const { selectedTeamIndex, setSelectedTeamIndex } = useContext(UserContext);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await fetch(
        `${serverIP}/auth/get-your-team?userId=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch your team");
      }

      const responseData = await response.json();
      setTeams(responseData);
      setError("");
    } catch (err) {
      console.error("Error fetching team data:", err);
      setError("Please create your teams.");
    }
  };

  const handleTeamClick = (index) => {
    setTempSelection(index);
  };

  const handleConfirmSelection = async () => {
    if (tempSelection !== null) {
      setSelectedTeamIndex(tempSelection);
      await AsyncStorage.setItem(
        "selectedTeamIndex",
        selectedTeamIndex.toString()
      );
      setTempSelection(null);
      refreshYourTeam();
      navigation.navigate("Home");
    }
  };

  const RadioButton = ({ selected, temporary }) => (
    <View
      style={[
        styles.radioButton,
        selected
          ? styles.radioButtonSelected
          : temporary
          ? styles.radioButtonTemporary
          : styles.radioButtonDefault,
      ]}
    />
  );

  // Calculate 20% of screen height
  const screenHeight = Dimensions.get("window").height;
  const scrollContainerHeight = screenHeight * 0.3;

  //Team Selection Code

  // const [isModalVisible, setModalVisible] = useState(true);
  const translateY = useRef(new Animated.Value(height)).current;
  //const navigation = useNavigation();
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [showView, setShowView] = useState(true);

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: height * 0.32,
      useNativeDriver: true,
    }).start();
  }, []);

  const navigateToHomeScreen = () => {
    // setModalVisible(true);
    navigation.navigate("Home");
    setShowView(true);
  };

  const handleRadioButtonPress = (id) => {
    setSelectedProfileId(id);
  };

  const changeSwitchState = () => {
    console.log("EG");
    if (showView) {
      setShowView(false);
    } else {
      setShowView(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="none"
        onRequestClose={() => setModalVisible(true)}
      > */}
      <View style={styles.modalBackground}>
        <Animated.View
          style={[styles.animatedView, { transform: [{ translateY }] }]}
        >
          <TouchableOpacity
            style={styles.switchContainer}
            onPress={navigateToHomeScreen}
          >
            <Ionicons name={"shuffle"} size={20} color={"#45474B"} />
            <Text style={styles.title}>Switch Teams</Text>
          </TouchableOpacity>
          {showView ? (
            <View style={styles.profileView}>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: 50,
                  marginBottom: "5%",
                }}
              >
                <TouchableOpacity onPress={openPopup1}>
                  <View style={{ flexDirection: "row" }}>
                    <Ionicons
                      name="add"
                      size={20}
                      color="#FF3156"
                      // style={{ position: "relative", top: -118, right: 18 }}
                    />
                    <Text style={styles.createTeamBtnText}>
                      Create New Team
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={openPopup2}>
                  <View style={{ flexDirection: "row" }}>
                    <Ionicons
                      name="add"
                      size={20}
                      color="#FF3156"
                      // style={{ position: "relative", top: -118, right: 18 }}
                    />
                    <Text style={styles.createTeamBtnText}>Join Team</Text>
                  </View>
                </TouchableOpacity>
              </TouchableOpacity>

              <View style={styles.containerPopup}>
                {/* Button to open first popup */}

                {/* First Popup */}
                <Modal
                  transparent={true}
                  visible={isPopup1Visible}
                  animationType="slide"
                  onRequestClose={closePopup1}
                >
                  <View style={styles.popupContainer}>
                    <View style={styles.popup}>
                      <TouchableOpacity
                        style={styles.closeButton}
                        onPress={closePopup1}
                      >
                        <Text style={styles.closeButtonText}>X</Text>
                      </TouchableOpacity>
                      <View>
                        <CreateTeam />
                      </View>
                    </View>
                  </View>
                </Modal>

                {/* Second Popup */}
                <Modal
                  transparent={true}
                  visible={isPopup2Visible}
                  animationType="slide"
                  onRequestClose={closePopup2}
                >
                  <View style={styles.popupContainer}>
                    <View style={styles.popup}>
                      <TouchableOpacity
                        style={styles.closeButton}
                        onPress={closePopup2}
                      >
                        <Text style={styles.closeButtonText}>X</Text>
                      </TouchableOpacity>
                      <JoinTeam />
                    </View>
                  </View>
                </Modal>
              </View>

              <View style={styles.containerTeam}>
                {error ? (
                  <Text style={styles.errorText}>{error}</Text>
                ) : (
                  <View style={[styles.scrollContainer, { height: "53%" }]}>
                    <ScrollView
                      showsVerticalScrollIndicator={true}
                      contentContainerStyle={styles.scrollContent} // Keep contents aligned at top
                    >
                      <View style={styles.itemsContainer}>
                        {teams.length > 0 ? (
                          teams.map((team, index) => (
                            <TouchableOpacity
                              key={index.toString()}
                              style={styles.teamItemWrapper}
                              onPress={() => handleTeamClick(index)}
                            >
                              <Image
                                source={{
                                  uri: "https://images.pexels.com/photos/5642024/pexels-photo-5642024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                                }} // Add the image to the item
                                style={styles.itemImage}
                              />
                              <View style={styles.teamItemTeam}>
                                <Text style={styles.teamTextTeam}>
                                  {team.name1} and {team.name2}
                                </Text>
                                <RadioButton
                                  selected={selectedTeamIndex === index}
                                  temporary={tempSelection === index}
                                />
                              </View>
                            </TouchableOpacity>
                          ))
                        ) : (
                          <Text style={styles.noTeamsTextTeam}>
                            No teams available.
                          </Text>
                        )}
                      </View>
                    </ScrollView>
                  </View>
                )}
              </View>

              {/* {profiles.map((profile) => (
                <View key={profile.id} style={styles.profileContainer}>
                  <Image
                    source={profile.imageSource}
                    style={styles.profileImage}
                  />
                  <View style={styles.profileDetails}>
                    <Text style={styles.nameContainer}>
                      {profile.name1} & {profile.name2}
                    </Text>
                    <View style={styles.notifView}>
                      <View
                        style={{
                          position: "relative",
                          top: 5,
                          right: 2,
                          backgroundColor: "#FF3156",
                          borderRadius: 6,
                          width: 6,
                          height: 6,
                        }}
                      />
                      <Text style={styles.profileText}>
                        4 new notifications
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.radioButtonContainer}
                    onPress={() => handleRadioButtonPress(profile.id)}
                  >
                    <View style={styles.radioButton}>
                      {selectedProfileId === profile.id && (
                        <View style={styles.radioButtonSelected} />
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              ))} */}
            </View>
          ) : (
            <View style={styles.newTeamContainer}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={changeSwitchState}
              >
                <Ionicons name="chevron-back" size={20} color="#121212" />
                <Text style={styles.backButtonText}>Create New Team</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.textInput}
                placeholder="https://randomlink.com"
                defaultValue="https://randomlink.com"
              />
            </View>
          )}
          {/* <Text style={styles.teamsText}>No teams yet :(</Text> */}
          <View style={styles.actionContainer2}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={navigateToHomeScreen}
            >
              <View style={styles.buttonContainer1}>
                <Text style={styles.buttonText}>Back</Text>
              </View>
            </TouchableOpacity>
            {showView ? (
              <TouchableOpacity
                onPress={handleConfirmSelection}
                style={styles.actionButton}
              >
                <View style={styles.buttonContainer2}>
                  <Text style={styles.buttonText}>Switch</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.buttonContainer2}>
                  <Text style={styles.buttonText}>Share</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      </View>
      {/* </Modal> */}

      {/* </Modal> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    //alignItems: "center",
    backgroundColor: "#EDEEF1",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#B6D0E2",
    // marginTop: 55,
  },
  animatedView: {
    height: height * 0.45, // 40% of the screen height
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
    //borderWidth: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: "500",
    marginLeft: 10,
    marginTop: 2,
    color: "#45474B",
    lineHeight: 18.15,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    //backgroundColor: "#ccc",
    borderRadius: 5,
    position: "absolute",
    top: -55,
    left: 25,
  },
  createTeamBtnText: {
    fontSize: 16,
    color: "#FF3156",
    marginLeft: 5,
    textDecorationLine: "underline",
    // position: "relative",
    // top: -120,
    // right: 20,
  },
  actionContainer2: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 20,
    paddingLeft: 8,
    position: "absolute",
    bottom: "2%",
    // left: 0,
    // right: 0,
    marginTop: 4,
    marginBottom: 3,
    //backgroundColor: "#ccc",
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 10,
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
  buttonContainer2: {
    backgroundColor: "#FF3156",
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
  switchContainer: {
    flex: 0.1,
    flexDirection: "row",
    alignSelf: "flex-start",
    // backgroundColor: "pink",
    width: "40%",
  },
  teamsText: {
    fontSize: 20,
    fontWeight: "400",
    lineHeight: 23.96,
    color: "#757A84",
    position: "absolute",
    bottom: 100,
  },
  headerProfile: {
    flexDirection: "column",
    width: 123,
  },
  nameContainer: {
    // marginRight: 0,
    fontSize: 18,
    color: "#121212",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 35,
  },
  matchTextContainer: {
    fontSize: 12,
  },
  icon: {
    backgroundColor: "#fff",
    borderRadius: 12,
    color: "#000",
    marginHorizontal: 5,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    margin: 5,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 55.87,
    marginHorizontal: 10,
    position: "relative",
    bottom: 5,
  },
  profileDetails: {
    // marginLeft: 10,
    marginRight: 100,
    position: "relative",
    bottom: 6,
  },
  profileText: {
    color: "#212121",
    fontSize: 12,
  },
  profileView: {
    // backgroundColor: "#ccc",
    position: "absolute",
    top: "20%",
  },
  notifView: {
    flexDirection: "row",
  },
  radioButtonContainer: {
    marginRight: 10,
  },
  radioButton: {
    height: 18,
    width: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#45474B",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    height: 12,
    width: 12,
    borderRadius: 5,
    backgroundColor: "#FF3156",
  },
  newTeamContainer: {
    flexDirection: "column",
    //  alignItems: "center",
    padding: 10,
    marginTop: 20,
    justifyContent: "space-between",
    position: "absolute",
    top: 40,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonText: {
    marginLeft: 2,
    fontSize: 22,
    color: "#121212",
  },
  textInput: {
    width: 300,
    height: 84,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginLeft: 30,
    marginVertical: 25,
    color: "#0000FF",
  },

  // Team Styling
  containerTeam: {
    flex: 1,
  },
  scrollContainer: {
    // Constrains the height to 20% of screen height
    overflow: "hidden",
  },
  scrollContent: {
    justifyContent: "flex-start", // Align items to the top
  },
  itemsContainer: {
    paddingBottom: 20, // Add space at the bottom
  },
  headingTeam: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  teamItemWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: "4%",
  },
  teamItemTeam: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
    flex: 1,
  },
  itemImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  teamTextTeam: {
    fontSize: 18,
    fontWeight: "500",
    flexShrink: 1,
  },
  noTeamsTextTeam: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 20,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#444",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    backgroundColor: "#FF3156",
  },
  radioButtonTemporary: {
    backgroundColor: "green",
  },
  radioButtonDefault: {
    backgroundColor: "transparent",
  },
  // Pop up styling

  containerPopup: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  openButton: {
    backgroundColor: "#007bff",
    padding: 15,
    margin: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  popupContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  popup: {
    height: height * 0.6,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    // backgroundColor: '#ff0000',
    borderRadius: 15,
    padding: 5,
  },
  closeButtonText: {
    color: "black",
    fontWeight: "bold",
  },
  popupText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 40,
  },
  itemImage: {
    width: 30, // Adjust size as needed
    height: 30,
    borderRadius: 25, // Makes the image round
    // Space between image and text
  },
  itemContainer: {
    flexDirection: "row", // Align items horizontally
    alignItems: "center", // Center items vertically
    padding: 10,
  },
});

export default Teams;
