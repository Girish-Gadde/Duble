import React, { useEffect, useState } from "react";
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
import { serverIP } from "@/config";

const Tab = createBottomTabNavigator();

const HomeTab = () => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState(null);
  const isEditVisible = useSelector((state) => state.showEditButtonAndBio);
  useEffect(() => {
    getYourTeam();
  }, []);

  const teamId = "66d302ecccbcf6fd4a2b7953";

  async function getYourTeam() {
    try {
      const response = await fetch(
        `${serverIP}/auth/get-your-team?teamId=${teamId}`,
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
      setProfile(responseData);
      console.log(responseData, "Your Team");
    } catch (error) {
      console.error("Failed to fetch your team:", error);
      //Alert.alert("Fetch Failed", "Failed to fetch data, please try again.");
    }
  }
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
              height: "10%",
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
        <Tab.Screen
          name="Likes"
          component={LikeStack}
          initialParams={{ navigation }}
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
          component={Chat}
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
        <Tab.Screen
          name="Profile"
          component={ProfileStack}
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
          //initialParams={{ navigation }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default HomeTab;
