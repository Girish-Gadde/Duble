import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Likes from "./Likes";
import LikedProfile from "./LikedProfile";

const Stack = createStackNavigator();

export const LikeStack = () => {
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
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
