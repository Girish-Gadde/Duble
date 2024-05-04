import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Home from "./components/Home";
import Likes from "./components/Likes";
import Teams from "./components/Teams";
import Matches from "./components/Matches";
import Profile from "./components/Profile";
import HeaderTitleWithIcon from "./Icon-functions/HeaderTitle";
import { Image, View } from "react-native";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <NavigationContainer>
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
              height: 80,
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
          }}
        />
        <Tab.Screen
          name="Likes"
          component={Likes}
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
          }}
        />
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "logo-twitter" : "logo-twitter"}
                size={size}
                color={color}
              />
              // <Image
              //   source={require("./assets/duble-icon.jpeg")} // Replace with your image source
              //   style={{
              //     width: 26,
              //     height: 26,
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
              <HeaderTitleWithIcon title="duble" iconName="logo-twitter" /> // Use the HeaderTitleWithIcon component
            ),
            headerTitleAlign: "center",
          }}
        />
        <Tab.Screen
          name="Matches"
          component={Matches}
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
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
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
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabNavigator;
