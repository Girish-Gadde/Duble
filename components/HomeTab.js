import React, { useEffect, useState, useContext, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ActivityIndicator, Alert, Image, Text, View } from "react-native";
import Teams from "./Teams";
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
import Notification from "../components/Team/TeamUpRequest/NotificationScreen";
import { setIndividualProfile, setProfile, setTeams } from "./Redux/Actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io } from "socket.io-client";
import parseErrorStack from "react-native/Libraries/Core/Devtools/parseErrorStack";

const Tab = createBottomTabNavigator();

const socket = io(serverIP);

const HomeTab = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { selectedTeamIndex, setSelectedTeamIndex } = useContext(UserContext);
  const [userId, setUserId] = useState(null);
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

  //  const { mobileNumber } = route.params;
  const mobileNumber = "6305148607";
  const individualProfile = useSelector((state) => state.individualProfile);
  const profile = useSelector((state) => state.profile);
  const teams = useSelector((state) => state.teams);
  //const [individualProfile, setIndividualProfile] = useState(null);
  //const [profile, setProfile] = useState(null);
  const isEditVisible = useSelector((state) => state.showEditButtonAndBio);
  useEffect(() => {
    socket.emit("register", mobileNumber);

    // Listen for 'teamCreated' event
    socket.on("teamCreated", (data) => {
      console.log("TEAM-MSG");
      Alert.alert(data.message);
    });
    getUserId();
  }, []);

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
      console.log(responseData._id, "User ID");
      setUserId(responseData._id);
      // const userId = responseData._id;
      await AsyncStorage.setItem("userId", responseData._id);
      // Once the user ID is fetched, get the associated teams
      getYourTeam(responseData._id);
      fetchTeams(responseData._id);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch user ID:", error);
    }
  }

  async function getYourTeam(userId) {
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
      console.log(savedIndex, responseData, "SAVED-7");
      //setProfile(responseData[displayIndex.current]);
      dispatch(setProfile(responseData[savedIndex]));
    } catch (error) {
      console.error("Failed to fetch your team:", error);
    }
  }

  async function getYourIndividualTeam(userId) {
    try {
      const response = await fetch(
        `${serverIP}/auth/get-your-individual-team?userId=${userId}`,
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
      const savedIndex = await AsyncStorage.getItem("selectedTeamIndex");
      console.log(savedIndex, "SAVED");
      setSelectedTeamIndex(savedIndex);
      dispatch(setIndividualProfile(responseData));
    } catch (error) {
      console.error("Failed to fetch your team:", error);
    }
  }

  useEffect(() => {
    refreshYourTeam();
  }, [selectedTeamIndex]);

  const refreshYourTeam = async () => {
    const userId = await AsyncStorage.getItem("userId");
    await getYourTeam(userId);
  };

  const refreshYourInidividualTeam = async () => {
    const userId = await AsyncStorage.getItem("userId");
    await getYourIndividualTeam(userId);
  };

  const fetchTeams = async (userId) => {
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
      console.log(responseData, "YOUR_TEAMS");
      dispatch(setTeams(responseData));
      setError("");
    } catch (err) {
      console.error("Error fetching team data:", err);
      setError("Please create your teams.");
    }
  };

  // async function getYourTeam() {
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
              height: "12%",
              justifyContent: "center",
              //marginBottom: 10,
            },
            null,
          ],
        }}
      >
        {teams && (
          <Tab.Screen
            name="Teams"
            component={Teams}
            initialParams={{
              navigation,
              userId,
              refreshYourTeam,
              mobileNumber,
              dispatch,
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
                <HeaderTitleWithIcon1
                  title="duble"
                  iconName="swap-horiz"
                  iconName1="menu"
                /> // Use the HeaderTitleWithIcon component
              ),
              headerTitleAlign: "center",
            }}
          />
        )}

        <Tab.Screen
          name="Likes"
          component={LikeStack}
          initialParams={{
            navigation,
            yourTeamProfile: profile,
            refreshYourTeam,
          }}
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
            headerShown: false,
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
          component={Matches}
          initialParams={{
            navigation,
            yourTeamProfile: profile,
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
            headerShown: false,
          }}
        />

        {individualProfile && (
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
        )}
        {profile && (
          <Tab.Screen
            name="HiddenScreen"
            component={Notification}
            options={{ tabBarButton: () => null, headerShown: false }} // This hides the tab from the tab bar
          />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default HomeTab;
