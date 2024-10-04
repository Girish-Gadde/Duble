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
import DOBScreen from "./Login Screens/DOBScreen";
import LocationScreen from "./Login Screens/LocationScreen";
import PictureScreen from "./Login Screens/PictureScreen";
import SetUpScreen from "./Login Screens/SetUpScreen";
import { TeamProfileStack } from "./components/Team/TeamProfileStack";
import PhoneLogin1 from "./Login Screens/PhoneLogin1";
import Chat from "./Chat";
import { UserProvider } from "./components/Team Switch/UserContext";
import Notification from "./components/Team/TeamUpRequest/NotificationScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState("HomeTab");
  useEffect(() => {
    const checkMobileNumber = async () => {
      try {
        const mobileNumber = await AsyncStorage.getItem("mobileNumber");
        // Check if mobileNumber is not null and a string
        if (mobileNumber && typeof mobileNumber === "string") {
          console.log(mobileNumber, "Mobile No..");
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
              name="DOBScreen"
              component={DOBScreen}
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
              name="SetUpScreen"
              component={SetUpScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HomeTab"
              component={HomeTab}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TeamProfileStack"
              component={TeamProfileStack}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
            <Stack.Screen
              name="NotificationScreen"
              component={Notification}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </Provider>
  );
}
