import React, { useEffect, useState, useContext, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Image, View } from "react-native";
import Teams from "./Teams";
import Likes from "./LikeScreens/Likes";
import Home from "./Home";
import Matches from "./Matches";
import Profile from "./Profile";
import HeaderTitleWithIcon from "../Icon-functions/HeaderTitle";
import { useSelector } from "react-redux";
import { LikeStack } from "./LikeScreens/LikeStack";
import HeaderTitleWithIcon1 from "../Icon-functions/HeaderTitle1";
import { ProfileStack } from "./ProfileScreens/ProfileStack";
import HomeScreen from "./ImageScreens/HomeScreen";
import Chat from "../Chat";
import { serverIP } from "../config";
import { UserContext } from "./Team Switch/UserContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { getFromAsyncStorage } from './Team Switch/storageUtils';
import { useUserContext } from './Team Switch/UserContext';
import Notification from './Team/TeamUpRequest/NotificationScreen'

const Tab = createBottomTabNavigator();

const HomeTab = ({ route, navigation }) => {
  //const navigation = useNavigation();
  // const { mobileNumber } = route.params;
  var index

  const { selectedTeamIndex, setSelectedTeamIndex } = useContext(UserContext);
 // const [selectedTeamIndex, setSelectedTeamIndex] = useState(null);
  console.log(selectedTeamIndex, 'Indexxxxxxxxxxxxxxxx')
  //index = selectedTeamIndex

  const [indexNo, setIndexNo] = useState(null);
  var index

  const { indexRef } = useUserContext();
  const displayIndex = useRef(indexRef.current); // Use ref to hold the current index value

  useEffect(() => {
    // Update the displayIndex whenever indexRef changes
    displayIndex.current = indexRef.current;
  }, [indexRef.current]);

  


  //const { activeIndex } = route.params;
  const mobileNumber = "6305148607";
  const [individualProfile, setIndividualProfile] = useState(null);
  const [profile, setProfile] = useState(null);
  const isEditVisible = useSelector((state) => state.showEditButtonAndBio);
  useEffect(() => {
    getUserId();
  }, []);

  //Load Team Index from async storage
  

  // useEffect(() => {
  //   const loadSelectedIndex = async () => {
  //     try {
  //       const savedIndex = await AsyncStorage.getItem('selectedTeamIndex');
  //       if (savedIndex !== null) {
  //         setSelectedTeamIndex(parseInt(savedIndex, 10));
  //         console.log("Loaded Selected Team Index from AsyncStorage:", savedIndex);
  //       }
  //     } catch (error) {
  //       console.error("Failed to load selected team index:", error);
  //     }
  //   };

  //   loadSelectedIndex();
  // }, []);
  //Load Team Index from async storage

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
      setIndividualProfile(responseData);
      //  setUserId(responseData.userId);
      console.log(responseData._id, "User ID");

      // Once the user ID is fetched, get the associated teams
      getYourTeam(responseData._id);
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
        throw new Error("Failed to fetch your team");
      }

      const responseData = await response.json();
      setProfile(responseData[displayIndex.current])
      console.log(responseData[displayIndex.current], "Your Team");
    } catch (error) {
      console.error("Failed to fetch your team:", error);
    }
  }

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
    navigation.navigate("TeamProfileStack", { navigation, profile });
  };
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
        <Tab.Screen
          name="Teams"
          component={Teams}
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
        {profile && (
          <Tab.Screen
            name="Likes"
            component={Notification}
            initialParams={{ navigation, yourTeamProfile: profile }}
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
        )}
        {profile && (
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            initialParams={{ navigation, yourTeamProfile: profile }}
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
        )}
        <Tab.Screen
          name="Matches"
          component={Matches}
          initialParams={{ navigation }}
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
            initialParams={{ navigation, profile: individualProfile }}
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
                <HeaderTitleWithIcon title="duble" iconName="menu" />
              ),
              // headerTitle: isEditVisible
              //   ? () => <HeaderTitleWithIcon title="duble" iconName="menu" />
              //   : null,
              headerTitleAlign: "center",
            }}
          />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default HomeTab;
