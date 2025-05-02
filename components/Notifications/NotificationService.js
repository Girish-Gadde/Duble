import { useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Alert, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { serverIP } from "@/config";

export default function NotificationService() {
  const notificationListener = useRef(null);
  const responseListener = useRef(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        sendTokenToBackend(token); // Save token in backend
      }
    });

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification received:", notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("User tapped notification:", response);
      });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return null;
}

// ✅ Function to show a local notification (for testing)
export async function showLocalNotification(title, body, data = {}) {
  console.log('PUSH NOTIFICATION')
  await Notifications.scheduleNotificationAsync({
    content: { title, body, data },
    trigger: null,
  });
}

// ✅ Request push notification permissions & get Expo Token
async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    Alert.alert("Must use a physical device for push notifications.");
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    Alert.alert("Permission required", "Enable notifications in settings.");
    return null;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log("Expo Push Token:  ----> ", token);
  return token;
}

// ✅ Send token to backend
async function sendTokenToBackend(token) {
  try {
    const storedToken = await AsyncStorage.getItem("expoPushToken"); // Get saved token
    const userId = await AsyncStorage.getItem("userId"); // Get user ID

    if (!userId) {
      console.error("User ID not found. Cannot send token to backend.");
      return;
    }

    // if (storedToken === token) {
    //   console.log("Token is unchanged. Skipping API call.");
    //   return; // Avoid sending duplicate token
    // }

    await fetch(`${serverIP}/push-notification/save-expo-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, expoPushToken: token }),
    });

    await AsyncStorage.setItem("expoPushToken", token); // Save token locally
    console.log("Expo push token saved successfully.");
  } catch (error) {
    console.error("Failed to send token:", error);
  }
}

