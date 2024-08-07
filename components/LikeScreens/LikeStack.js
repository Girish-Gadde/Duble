import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Likes from "./Likes";
import LikedProfile from "./LikedProfile";
import LikedMatch from "./LikedMatch";
import LikedChat from "./LikedChat";
import MatchedTeamProfile from "../MatchesScreens/MatchedTeamProfile";

const Stack = createStackNavigator();

export const LikeStack = ({ navigation }) => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="LikeScreen1">
        <Stack.Screen
          name="LikeScreen1"
          component={Likes}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LikedProfile"
          component={LikedProfile}
          ///options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LikedMatch"
          component={LikedMatch}
          initialParams={{ navigation }}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LikedChat"
          component={LikedChat}
          initialParams={{ navigation }}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TeamProfile"
          component={MatchedTeamProfile}
          initialParams={{ navigation }}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
