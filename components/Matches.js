import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MatchScreen from "./MatchesScreens/MatchScreen";
import ChatScreen from "./MatchesScreens/ChatScreen";
import HeaderTitleWithIcon1 from "../Icon-functions/HeaderTitle1";
import UnlikedMatch from "./MatchesScreens/UnlikedMatch";

const Stack = createStackNavigator();

const Matches = () => {
  return (
    <NavigationContainer independent="true">
      <Stack.Navigator initialRouteName="MatchScreen">
        <Stack.Screen
          name="MatchScreen"
          component={MatchScreen}
          options={{ headerShown: false }}
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
              <HeaderTitleWithIcon1
                title="duble"
                iconName="swap-horiz"
                iconName1="menu"
              />
            ),
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Matches;
