import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import TeamProfile from "./TeamProfile";
import TeamProfileDetails from "./TeamProfileDetails";

const Stack = createStackNavigator();

export const TeamProfileStack = ({ navigation }) => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="TeamProfile">
        <Stack.Screen
          name="TeamProfile"
          component={TeamProfile}
          initialParams={{ navigation }}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TeamProfileDetails"
          component={TeamProfileDetails}
          initialParams={{ navigation }}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
