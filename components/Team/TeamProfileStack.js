import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import TeamProfile from "./TeamProfile";
import TeamProfileDetails from "./TeamProfileDetails";
import HeaderTitleWithIcon2 from "@/Icon-functions/HeaderTitle2";
import HeaderTitleWithIcon1 from "@/Icon-functions/HeaderTitle1";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

export const TeamProfileStack = ({ route, navigation }) => {
  const { dispatch } = route.params;
  const profile = useSelector((state) => state.profile);
  const handleMenuClick = () => {
    // Dispatch action to toggle the state
    navigation.goBack();
    // dispatch(toggleEditButtonAndBio());
  };
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="TeamProfile">
        <Stack.Screen
          name="TeamProfile"
          component={TeamProfile}
          initialParams={{ navigation, profile }}
          options={{
            // headerTitle: () => (
            //   <HeaderTitleWithIcon2
            //     title="duble"
            //     iconName="swap-horiz"
            //     iconName1="arrow-back"
            //     handleMenuClick={handleMenuClick}
            //   /> // Use the HeaderTitleWithIcon component
            // ),
            headerShown: false,
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="TeamProfileDetails"
          component={TeamProfileDetails}
          initialParams={{ navigation, dispatch }}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
