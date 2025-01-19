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
import { useDispatch } from "react-redux";
import { menuClickAction } from "../Redux/Actions";
import ChatScreen from "../ChatScreens/ChatScreen";

const Stack = createStackNavigator();

export const LikeStack = ({ route, navigation }) => {
  const { yourTeamProfile,userName, refreshYourTeam } = route.params;
  const dispatch = useDispatch();
  const handleMenuClick = () => {
    dispatch(menuClickAction());
    //navigation.navigate("LikeScreen1");
  };
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="LikeScreen1">
        <Stack.Screen
          name="LikeScreen1"
          component={Likes}
          initialParams={{ yourTeamProfile, navigation }}
          options={{
            headerShown: false,
            // headerTitle: () => (
            //   <HeaderTitleWithIcon1
            //     title="duble"
            //     iconName="swap-horiz"
            //     iconName1="menu"
            //   /> // Use the HeaderTitleWithIcon component
            // ),
            // headerTitleAlign: "center",
            // headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="LikedProfile"
          component={LikedProfile}
          initialParams={{ handleMenuClick, refreshYourTeam }}
          options={{
            headerTitle: () => (
              <HeaderTitleWithIcon2
                title="duble"
                iconName="swap-horiz"
                iconName1="arrow-back"
                handleMenuClick={handleMenuClick}
              /> // Use the HeaderTitleWithIcon component
            ),
            headerTitleAlign: "center",
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="LikedMatch"
          component={LikedMatch}
          initialParams={{ navigation,userName, refreshYourTeam }}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LikedChat"
          component={ChatScreen}
          initialParams={{ navigation }}
           options={{ headerShown: false }}
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
