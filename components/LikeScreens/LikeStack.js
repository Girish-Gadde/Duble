import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Likes from "./Likes";
import LikedProfile from "./LikedProfile";
import LikedMatch from "./LikedMatch";
import LikedChat from "./LikedChat";
import MatchedTeamProfile from "../MatchesScreens/MatchedTeamProfile";
import HeaderTitleWithIcon1 from "../../Icon-functions/HeaderTitle1";
import HeaderTitleWithIcon2 from "../../Icon-functions/HeaderTitle2";

const Stack = createStackNavigator();

export const LikeStack = ({ route, navigation }) => {
  const { yourTeamProfile } = route.params;
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="LikeScreen1">
        <Stack.Screen
          name="LikeScreen1"
          component={Likes}
          initialParams={{ yourTeamProfile, navigation }}
          options={{
            headerTitle: () => (
              <HeaderTitleWithIcon1
                title="duble"
                iconName="swap-horiz"
                iconName1="menu"
              /> // Use the HeaderTitleWithIcon component
            ),
            headerTitleAlign: "center",
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="LikedProfile"
          component={LikedProfile}
          options={{
            headerTitle: () => (
              <HeaderTitleWithIcon2
                title="duble"
                iconName="swap-horiz"
                iconName1="arrow-back"
              /> // Use the HeaderTitleWithIcon component
            ),
            headerTitleAlign: "center",
            headerLeft: () => null,
          }}
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
