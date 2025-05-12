import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import TeamProfile from "./TeamProfile";
import TeamProfileDetails from "./TeamProfileDetails";
import HeaderTitleWithIcon2 from "@/Icon-functions/HeaderTitle2";
import HeaderTitleWithIcon1 from "@/Icon-functions/HeaderTitle1";
import { useSelector } from "react-redux";
import { Alert } from "react-native";

const Stack = createStackNavigator();

export const TeamProfileStack = ({ route, navigation }) => {
  const { dispatch,userName } = route.params;
  const profile = useSelector((state) => state.profile);
  const handleMenuClick = () => {
    // Dispatch action to toggle the state
    navigation.goBack();
    // dispatch(toggleEditButtonAndBio());
  };
  if (!profile) {
    Alert.alert(
      "No Team found",
      "Please create your team",
      [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("Teams");
          },
        },
      ],
      { cancelable: false }
    );
  }
  return (
      <Stack.Navigator initialRouteName="TeamProfile">
        <Stack.Screen
          name="TeamProfile"
          component={TeamProfile}
          initialParams={{ navigation, userName, profile }}
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
          initialParams={{ navigation, userName, dispatch }}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
  );
};
