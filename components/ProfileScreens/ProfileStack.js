import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ProfileScreen1 from "./ProfileScreen1";
import ProfileDetails from "./ProfileDetails";
import PromptScreen from "./PromptScreen";

const Stack = createStackNavigator();

export const ProfileStack = ({ route, navigation }) => {
  const { profile, refreshYourInidividualProfile, dispatch, logOut } = route.params;
  // console.log(profile, "INDIVIDUAL PROFILE");
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="ProfileScreen1">
        <Stack.Screen
          name="ProfileScreen1"
          component={ProfileScreen1}
          initialParams={{ navigation, profile, logOut }}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileDetails"
          component={ProfileDetails}
          initialParams={{ navigation, profile, refreshYourInidividualProfile, dispatch, logOut }}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PromptScreen"
          component={PromptScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
