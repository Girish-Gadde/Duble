import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MatchScreen from "./MatchesScreens/MatchScreen";
//import ChatScreen from "./MatchesScreens/ChatScreen";
import HeaderTitleWithIcon1 from "../Icon-functions/HeaderTitle1";
import UnlikedMatch from "./MatchesScreens/UnlikedMatch";
import MatchedTeamProfile from "./MatchesScreens/MatchedTeamProfile";
import HeaderTitleWithIcon2 from "../Icon-functions/HeaderTitle2";
import ChatScreen from "../components/ChatScreens/ChatScreen";
const Stack = createStackNavigator();

const Matches = ({ route, navigation }) => {
  const { yourTeamProfile, refreshYourTeam } = route.params;
  return (
    <NavigationContainer independent="true">
      <Stack.Navigator initialRouteName="MatchScreen">
        <Stack.Screen
          name="MatchScreen"
          component={MatchScreen}
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
          name="UnlikedMatch"
          component={UnlikedMatch}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            headerTitle: () => (
              <HeaderTitleWithIcon2
                title="duble"
                iconName="swap-horiz"
                iconName1="menu"
              />
            ),
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="TeamProfile"
          component={MatchedTeamProfile}
          initialParams={{ navigation, refreshYourTeam }}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Matches;
