import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MatchScreen from "./MatchesScreens/MatchScreen";
import HeaderTitleWithIcon1 from "../Icon-functions/HeaderTitle1";
import UnlikedMatch from "./MatchesScreens/UnlikedMatch";
import MatchedTeamProfile from "./MatchesScreens/MatchedTeamProfile";
import HeaderTitleWithIcon2 from "../Icon-functions/HeaderTitle2";
import { menuClickAction, menuClickAction1 } from "./Redux/Actions";
import ChatScreen from "./ChatScreens/ChatScreen";
const Stack = createStackNavigator();

const Matches = ({ route, navigation, onRoomSelect }) => {
  const { yourTeamProfile, userName, refreshYourTeam, dispatch } = route.params;
  const handleMenuClick = () => {
    console.log("DF");
    dispatch(menuClickAction());
    //navigation.navigate("LikeScreen1");
  };

  return (
    <NavigationContainer independent="true">
      <Stack.Navigator initialRouteName="MatchScreen">
        <Stack.Screen
          name="MatchScreen"
          component={(props) => (
            <MatchScreen 
            {...props} 
            onRoomSelect={onRoomSelect}
            />
          )}
          initialParams={{ yourTeamProfile, userName, navigation, dispatch, refreshYourTeam }}
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
          name="UnlikedMatch"
          component={UnlikedMatch}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          initialParams={{ navigation, refreshYourTeam }}
          options={{ headerShown: false }}
          // options={{
          //   headerTitle: () => (
          //     <HeaderTitleWithIcon2
          //       title="duble"
          //       iconName="swap-horiz"
          //       iconName1="arrow-back"
          //       handleMenuClick={handleMenuClick}
          //     />
          //   ),
          //   headerTitleAlign: "center",
          //   headerLeft: () => null,
          // }}
        />
        <Stack.Screen
          name="TeamProfile"
          //component={MatchedTeamProfile}
          component={(props) => (
            <MatchedTeamProfile 
            {...props} 
            onRoomSelect={onRoomSelect}
            />
          )}
          initialParams={{ navigation, refreshYourTeam }}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Matches;
