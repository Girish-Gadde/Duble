import React, { useEffect, useState, useContext, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  CommonActions,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Teams from "./TeamUp";
import Likes from "./LikeScreens/Likes";
import Home from "./Home";
import Matches from "./Matches";
import Profile from "./Profile";
import HeaderTitleWithIcon from "../Icon-functions/HeaderTitle";
import { useDispatch, useSelector } from "react-redux";
import { LikeStack } from "./LikeScreens/LikeStack";
import HeaderTitleWithIcon1 from "../Icon-functions/HeaderTitle1";
import { ProfileStack } from "./ProfileScreens/ProfileStack";
import HomeScreen from "./ImageScreens/HomeScreen";
import Chat from "../Chat";
import { serverIP } from "@/config";
import { UserContext } from "./Team Switch/UserContext";
import { useUserContext } from "./Team Switch/UserContext";
import ChatNavigation from "../components/ChatScreens/ChatNavigation";
import Notification from "../components/Team/TeamUpRequest/Notification";
import { setIndividualProfile, setProfile, setTeams } from "./Redux/Actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io } from "socket.io-client";
import parseErrorStack from "react-native/Libraries/Core/Devtools/parseErrorStack";
import Ionicons4 from "react-native-vector-icons/Ionicons";
import { TeamProfileStack } from "./Team/TeamProfileStack";

import ChatScreen from "../components/ChatScreens/ChatScreen";

const Tab = createBottomTabNavigator();

const socket = io(serverIP);

const HomeTab = ({ route, navigation }) => {
  const { mobileNumber } = route.params;
  /// const mobileNumber = "6305148607";
  const dispatch = useDispatch();
  const { selectedTeamIndex, setSelectedTeamIndex } = useContext(UserContext);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // const [selectedTeamIndex, setSelectedTeamIndex] = useState(null);
  console.log(selectedTeamIndex, "Indexxxxxxxxxxxxxxxx");
  //index = selectedTeamIndex

  const [indexNo, setIndexNo] = useState(null);
  var index;

  const { indexRef } = useUserContext();
  const displayIndex = useRef(indexRef.current); // Use ref to hold the current index value

  // useEffect(() => {
  //   // Update the displayIndex whenever indexRef changes
  //   displayIndex.current = indexRef.current;
  // }, [indexRef.current]);

  //const navigation = useNavigation();

  const individualProfile = useSelector((state) => state.individualProfile);
  const profile = useSelector((state) => state.profile);
  const teams = useSelector((state) => state.teams);
  //const [individualProfile, setIndividualProfile] = useState(null);
  //const [profile, setProfile] = useState(null);
  const isEditVisible = useSelector((state) => state.showEditButtonAndBio);
  useEffect(() => {
    socket.emit("register", userId);

    // Listen for 'teamCreated' event
    socket.on("teamCreated", async (data) => {
      console.log("TEAM-MSG");
      const userId = await AsyncStorage.getItem("userId");
      fetchTeams(userId);
      // getUserId();
      //   getYourIndividualProfile(userId);
      Alert.alert(data.message);
    });

    socket.on("teamUpRequest", async (data) => {
      const userId = await AsyncStorage.getItem("userId");
      getYourIndividualProfile(userId);
      Alert.alert(data.message);
    });

    socket.on("teamLikedNotification", async (data) => {
      console.log("COME");
      //refreshYourTeam();
      refreshYourSelectedTeam()
      //   Alert.alert(data.message);
    });
    getUserId();
  }, [userId]);

  async function getUserId() {
    try {
      const response = await fetch(
        `${serverIP}/auth/get-user-id?mobileNumber=${mobileNumber}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user ID");
      }

      const responseData = await response.json();
      // setIndividualProfile(responseData);
      dispatch(setIndividualProfile(responseData));
      //  setUserId(responseData.userId);
      console.log(responseData._id,responseData.name, "User ID");
      setUserId(responseData._id);
      setUserName(responseData.name);
      // const userId = responseData._id;
      await AsyncStorage.setItem("userId", responseData._id);
      // Once the user ID is fetched, get the associated teams
      getYourTeams(responseData._id);
      //fetchTeams(responseData._id);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch user ID:", error);
    }
  }

  async function getYourTeams(userId) {
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
        //throw new Error("Failed to fetch your team-1");
        Alert.alert(
          "No Teams found",
          "Please create your teams.",
          [
            {
              text: "OK",
              onPress: () => {
                //navigation.navigate("Teams");
              },
            },
          ],
          { cancelable: false }
        );
      }

      const responseData = await response.json();
      const savedIndex = await AsyncStorage.getItem("selectedTeamIndex");
      // console.log(savedIndex, responseData, "SAVED-7");
      //setProfile(responseData[displayIndex.current]);
      dispatch(setTeams(responseData));
      dispatch(setProfile(responseData[savedIndex]));
    } catch (error) {
      console.error("Failed to fetch your team:", error);
    }
  }

  async function getYourIndividualProfile(userId) {
    try {
      const response = await fetch(
        `${serverIP}/auth/get-your-individual-profile?userId=${userId}`,
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
      //setProfile(responseData[displayIndex.current]);
      //  const savedIndex = await AsyncStorage.getItem("selectedTeamIndex");
      // setSelectedTeamIndex(savedIndex);
      dispatch(setIndividualProfile(responseData));
    } catch (error) {
      console.error("Failed to fetch your team:", error);
    }
  }

  async function getYourSelectedTeam(teamId) {
    console.log(teamId, 'ID------>>>>>>')
    try {
      const response = await fetch(
        `${serverIP}/auth/get-your-selected-team?teamId=${teamId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        //throw new Error("Failed to fetch your team-1");
        Alert.alert(
          "Your selected team updation failed",
          "Press Ok",
          [
            {
              text: "OK",
              onPress: () => {
                //navigation.navigate("Teams");
              },
            },
          ],
          { cancelable: true }
        );
      }

      const responseData = await response.json();
      //const savedIndex = await AsyncStorage.getItem("selectedTeamIndex");
     // dispatch(setTeams(responseData));
      dispatch(setProfile(responseData));
      console.log(responseData, 'Your Selected Team-------->>>>>>>')
    } catch (error) {
      console.error("Failed to fetch your team:", error);
    }
  }

  useEffect(() => {
    refreshYourTeam();
  }, [selectedTeamIndex]);

  const refreshYourTeam = async () => {
    const userId = await AsyncStorage.getItem("userId");
    await getYourTeams(userId);
  };

  const refreshYourSelectedTeam = () => {
    if(profile){
      getYourSelectedTeam(profile._id)
    }
  };


  const refreshYourInidividualTeam = async () => {
    const userId = await AsyncStorage.getItem("userId");
    await getYourIndividualProfile(userId);
  };

  const fetchTeams = async (userId) => {
    console.log(userId, "USEER---IDD");
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
      //    console.log(responseData, "YOUR_TEAMS");
      dispatch(setTeams(responseData));
      // Set the index to the last added team (last in the list)
      const lastTeamIndex = responseData.length - 1;
      setSelectedTeamIndex(lastTeamIndex);
      await AsyncStorage.setItem(
        "selectedTeamIndex",
        JSON.stringify(lastTeamIndex)
      );
      dispatch(setProfile(responseData[lastTeamIndex]));

      setError("");
    } catch (err) {
      console.error("Error fetching team data:", err);
      setError("Please create your teams.");
    }
  };

  // async function getYourTeams() {
  //   try {
  //     const response = await fetch(
  //       `${serverIP}/auth/get-your-team?mobileNumber=${mobileNumber}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch your team");
  //     }

  //     const responseData = await response.json();
  //     setProfile(responseData);
  //     console.log(responseData, "Your Team");
  //   } catch (error) {
  //     console.error("Failed to fetch your team:", error);
  //     //Alert.alert("Fetch Failed", "Failed to fetch data, please try again.");
  //   }
  // }
  const navigateToTeamProfile = () => {
    if (profile) {
      navigation.navigate("TeamProfileStack", {
        navigation,
        profile,
        userName,
        dispatch,
      });
    } else {
      Alert.alert(
        "No Team found",
        "Please create your team",
        [
          {
            text: "OK",
            onPress: () => {
              //navigation.navigate("Teams");
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  const navigateToNotifScreen = () => {
    if (individualProfile) {
      navigation.navigate("Notifications1", {
        navigation,
        individualProfile,
      });
    }
  };


  const navigateToChatScreen = (roomId, username, teaMembers, imageUrl)=>{
    console.log("Navigating to Chat with:", roomId, username, teaMembers, imageUrl);
    navigation.navigate("Chat", { roomId, username, teaMembers, imageUrl });
  }

  if (loading) {
    // Show loading indicator while data is being fetched
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FF3156" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: "#FF3156",
          tabBarInactiveTintColor: "black",
          tabBarItemStyle: {
            justifyContent: "center",
          },
          tabBarLabelStyle: {
            fontWeight: "bold",
          },
          tabBarStyle: [
            {
              backgroundColor: "#EDEEF1",
              display: "flex",
              paddingHorizontal: 12,
              paddingVertical: 20,
              height: "13%",
              justifyContent: "center",
              //marginBottom: 10,
            },
            null,
          ],
        }}
      >
        <Tab.Screen
          name="Teams"
          component={Teams}
          initialParams={{
            navigation,
            userId,
            refreshYourTeam,
            mobileNumber,
            userName,
            dispatch,
            fetchTeams,
            error,
          }}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <View style={{ position: "relative" }}>
                <Ionicons
                  name={focused ? "shuffle" : "shuffle"}
                  size={size}
                  color={color}
                />

                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    backgroundColor: "#FF3156",
                    borderRadius: 6,
                    width: 8,
                    height: 8,
                  }}
                />
              </View>
            ),
            tabBarLabelStyle: {
              marginBottom: 20, // Adjust as needed to decrease the gap
              fontWeight: "bold",
            },
            headerTitle: () => (
              <HeaderTitleWithIcon
                title="duble"
                iconName="menu"
                navigateToTeamProfile={navigateToTeamProfile}
                //navigateToNotifScreen={navigateToNotifScreen}
              /> // Use the HeaderTitleWithIcon component
            ),
            headerTitleAlign: "center",
          }}
        />

        <Tab.Screen
          name="Likes"
          component={LikeStack}
          initialParams={{
            navigation,
            yourTeamProfile: profile,
            userName,
            refreshYourTeam,
          }}
          listeners={({ navigation }) => ({
            focus: () => {
              console.log("TARGET");
              const state = navigation.getState();
              const activeRoute = state.routes[state.index].state
                ? state.routes[state.index].state.routes[
                    state.routes[state.index].state.index
                  ].name
                : null;

              if (
                ["LikedProfile", "LikedMatch", "LikedChat"].includes(
                  activeRoute
                )
              ) {
                navigation.goBack(); // Navigate back to LikeScreen1
              }
            },
          })}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <View style={{ position: "relative" }}>
                <Ionicons
                  name={focused ? "heart" : "heart-outline"}
                  size={size}
                  color={color}
                />
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    backgroundColor: "#FF3156",
                    borderRadius: 6,
                    width: 8,
                    height: 8,
                  }}
                />
              </View>
            ),
            tabBarLabelStyle: {
              marginBottom: 20, // Adjust as needed to decrease the gap
              fontWeight: "bold",
            },
            headerTitle: () => (
              <HeaderTitleWithIcon
                title="duble"
                iconName="swap-horiz"
                navigateToTeamProfile={navigateToTeamProfile}
              /> // Use the HeaderTitleWithIcon component
            ),
            headerTitleAlign: "center",
          }}
        />

        <Tab.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{
            navigation,
            yourTeamProfile: profile,
            refreshYourTeam,
            dispatch,
          }}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "logo-twitter" : "logo-twitter"}
                size={size}
                color={color}
              />
              // <Image
              //   source={require("../assets/Vector.jpg")} // Replace with your image source
              //   style={{
              //     width: 22,
              //     height: 22,
              //     borderRadius: 0,
              //     marginLeft: 2,
              //   }}
              // />
            ),
            tabBarLabelStyle: {
              marginBottom: 20, // Adjust as needed to decrease the gap
              fontWeight: "bold",
            },
            headerTitle: () => (
              <HeaderTitleWithIcon
                title="duble"
                iconName="swap-horiz"
                navigateToTeamProfile={navigateToTeamProfile}
              /> // Use the HeaderTitleWithIcon component
            ),
            headerTitleAlign: "center",
          }}
        />

        <Tab.Screen
          name="Matches"
          component={(props) => (
            <Matches {...props} onRoomSelect={navigateToChatScreen} />
          )}
          initialParams={{
            navigation,
            yourTeamProfile: profile,
            userName,
            refreshYourTeam,
            dispatch,
          }}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <View style={{ position: "relative" }}>
                <Ionicons
                  name={
                    focused
                      ? "chatbubble-ellipses-outline"
                      : "chatbubble-ellipses-outline"
                  }
                  size={size}
                  color={color}
                />
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    backgroundColor: "#FF3156",
                    borderRadius: 6,
                    width: 8,
                    height: 8,
                  }}
                />
              </View>
            ),
            tabBarLabelStyle: {
              marginBottom: 20, // Adjust as needed to decrease the gap
              fontWeight: "bold",
            },
            headerTitle: () => (
              <HeaderTitleWithIcon
                title="duble"
                iconName="swap-horiz"
                navigateToTeamProfile={navigateToTeamProfile}
              /> // Use the HeaderTitleWithIcon component
            ),
            headerTitleAlign: "center",
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileStack}
          initialParams={{
            navigation,
            profile: individualProfile,
            dispatch,
          }}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={size}
                color={color}
              />
            ),
            tabBarLabelStyle: {
              marginBottom: 20, // Adjust as needed to decrease the gap
              fontWeight: "bold",
            },
            headerTitle: () => (
              <HeaderTitleWithIcon
                title="duble"
                iconName="menu"
                navigateToTeamProfile={navigateToTeamProfile}
              />
            ),
            // headerTitle: isEditVisible
            //   ? () => <HeaderTitleWithIcon title="duble" iconName="menu" />
            //   : null,
            headerTitleAlign: "center",
          }}
        />

        <Tab.Screen
          name="Team Profile"
          component={TeamProfileStack}
          initialParams={{
            navigation,
            profile,
            dispatch,
          }}
          options={({ navigation }) => ({
            tabBarButton: () => null, // Hide the tab from the tab bar
            headerTitleAlign: "center",
            // headerShown: true, // Enable the header
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginLeft: 10 }}
              >
                <Ionicons4 name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
            ),
          })}
        />

        <Tab.Screen
          name="Notifications"
          component={Notification}
          initialParams={{
            navigation,
            individualProfile,
          }}
          options={({ navigation }) => ({
            tabBarButton: () => null, // Hide the tab from the tab bar
            headerTitleAlign: "center",
            // headerShown: true, // Enable the header
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginLeft: 10 }}
              >
                <Ionicons4 name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
            ),
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default HomeTab;
