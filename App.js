import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//import Login from '../Login Screens/Login'
import ProfileDetails from "./components/ProfileScreens/ProfileDetails";
import { Provider } from "react-redux";
import store from "./components/Store";
import HomeTab from "./components/HomeTab";
import ProfileScreen1 from "./components/ProfileScreens/ProfileScreen1";
import DubleStart from "./Login Screens/DubleStart";
import Login from "./Login Screens/Login";
import PhoneLogin from "./Login Screens/PhoneLogin";
import OTPScreen from "./Login Screens/OTPScreen";
import VerifyScreen from "./Login Screens/VerifyScreen";
import NameScreen from "./Login Screens/NameScreen";
import GenderScreen from "./Login Screens/GenderScreen";
import DOBScreen from "./Login Screens/DOBScreen";
import JobScreen from "./Login Screens/JobScreen";
import LocationScreen from "./Login Screens/LocationScreen";
import PictureScreen from "./Login Screens/PictureScreen";
import InviteUser from "./Login Screens/InviteUser";
import SetUpScreen from "./Login Screens/SetUpScreen";
import { TeamProfileStack } from "./components/Team/TeamProfileStack";
import PhoneLogin1 from "./Login Screens/PhoneLogin1";
import Chat from "./Chat";
import { UserProvider } from "./components/Team Switch/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Text, View } from "react-native";
import Notification from "./components/Team/TeamUpRequest/Notification";
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);
  const [mobileNumber, setMobileNumber] = useState(null);
  useEffect(() => {
    const checkMobileNumber = async () => {
      await AsyncStorage.removeItem("selectedTeamIndex");
      await AsyncStorage.removeItem("mobileNumber");
      try {
        const mobileNo = await AsyncStorage.getItem("mobileNumber");
        // Check if mobileNumber is not null and a string
        if (mobileNo && typeof mobileNo === "string") {
          console.log(mobileNo, "Mobile No..");
          setMobileNumber(mobileNo);
          setInitialRoute("HomeTab");
        } else {
          setInitialRoute("DubleStart");
        }
      } catch (error) {
        console.error("Failed to check mobile number in AsyncStorage:", error);
        setInitialRoute("DubleStart"); // Default to DubleStart on error
      }
    };

    checkMobileNumber();
  }, []);

  

  if (!initialRoute) {
    // Show loading indicator while data is being fetched
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FF3156" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Provider store={store}>
      <UserProvider>
        <NavigationContainer independent={true}>
          <Stack.Navigator initialRouteName={initialRoute}>
            {/* You can add your screens here */}
            {/* <Stack.Screen
              name="HomeTab"
              component={HomeTab}
              options={{ headerShown: false }}
            /> */}
            <Stack.Screen
              name="DubleStart"
              component={DubleStart}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PhoneLogin"
              component={PhoneLogin}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PhoneLogin1"
              component={PhoneLogin1}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OTPScreen"
              component={OTPScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="VerifyScreen"
              component={VerifyScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NameScreen"
              component={NameScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="GenderScreen"
              component={GenderScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DOBScreen"
              component={DOBScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="JobScreen"
              component={JobScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LocationScreen"
              component={LocationScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PictureScreen"
              component={PictureScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="InviteUser"
              component={InviteUser}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SetUpScreen"
              component={SetUpScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HomeTab"
              component={HomeTab}
              initialParams={{
                mobileNumber,
              }}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TeamProfileStack"
              component={TeamProfileStack}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
            <Stack.Screen
              name="Notifications1"
              component={Notification}
              options={{ headerTitleAlign: "center" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </Provider>
  );
}
