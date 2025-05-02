
// import * as Notifications from 'expo-notifications';
// import * as Device from 'expo-device';
// import { Platform, Alert } from 'react-native';

// // Set how notifications are handled when received
// Notifications.setNotificationHandler({
//   handleNotification: async () => {
//     const suppressScreens = ['NotTest']; // Add screen names where alert should be suppressed

//     const currentScreen = global.currentScreen || 'Unknown';
//     console.log('🔔 Incoming notification on screen:', currentScreen);

//     if (suppressScreens.includes(currentScreen)) {
//       console.log('🔕 Notification suppressed on screen:', currentScreen);
//       return {
//         shouldShowAlert: false,
//         shouldPlaySound: false,
//         shouldSetBadge: false,
//       };
//     }

//     return {
//       shouldShowAlert: true,
//       shouldPlaySound: true,
//       shouldSetBadge: false,
//     };
//   },
// });

// // Register for push notifications and get Expo token
// export async function registerForPushNotificationsAsync(): Promise<string | null> {
//   let token;

//   if (Device.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;

//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }

//     if (finalStatus !== 'granted') {
//       Alert.alert('Permission denied', 'Enable push notifications to receive updates.');
//       return null;
//     }

//     token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log('🔔 Expo Push Token:', token);
//   } else {
//     Alert.alert('Must use a physical device for push notifications');
//     return null;
//   }

//   if (Platform.OS === 'android') {
//     await Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   return token;
// }

// // Send a push notification
// export async function sendPushNotification(
//   token: string,
//   title: string,
//   body: string,
//   data: Record<string, any> = {}
// ): Promise<void> {
//   if (!token) {
//     console.log('🚫 Cannot send notification: token is null');
//     return;
//   }

//   console.log('📦 Sending notification to token:', token);

//   const message = {
//     to: token,
//     sound: 'default',
//     title,
//     body,
//     data,
//   };

//   try {
//     const res = await fetch('https://exp.host/--/api/v2/push/send', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Accept-encoding': 'gzip, deflate',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(message),
//     });

//     const json = await res.json();
//     console.log('✅ Notification response:', JSON.stringify(json, null, 2));
//   } catch (error) {
//     console.error('❌ Failed to send push notification:', error);
//   }
// }


import React, { useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import { useNavigationState } from '@react-navigation/native';  // React Navigation hook for tracking the screen
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

// Set up notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => {
    const suppressScreens = ['Chat']; // Add screen names where alert should be suppressed

    // Get the current screen from the global state (or navigation context)
    const currentScreen = global.currentScreen || 'Unknown'; // Fallback to 'Unknown' if not set
    console.log('🔔 Incoming notification on screen:', currentScreen);

    if (suppressScreens.includes(currentScreen)) {
      console.log('🔕 Notification suppressed on screen:', currentScreen);
      return {
        shouldShowAlert: false,
        shouldPlaySound: false,
        shouldSetBadge: false,
      };
    }

    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    };
  },
});

// Register for push notifications and get Expo token
export async function registerForPushNotificationsAsync(): Promise<string | null> {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      Alert.alert('Permission denied', 'Enable push notifications to receive updates.');
      return null;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('🔔 Expo Push Token ---->:', token);
  } else {
    Alert.alert('Must use a physical device for push notifications');
    return null;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

// Add this below your other exports in the notification file
export async function showLocalNotification(title: string, body: string, data: Record<string, any> = {}) {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
      },
      trigger: null, // fire immediately
    });
  } catch (error) {
    console.error('❌ Failed to show local notification:', error);
  }
}


// Send a push notification
export async function sendPushNotification(
  token: string,
  title: string,
  body: string,
  data: Record<string, any> = {}
): Promise<void> {
  if (!token) {
    console.log('🚫 Cannot send notification: token is null');
    return;
  }

  console.log('📦 Sending notification to token:', token);

  const message = {
    to: token,
    sound: 'default',
    title,
    body,
    data,
  };

  try {
    const res = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    const json = await res.json();
    console.log('✅ Notification response:', JSON.stringify(json, null, 2));
  } catch (error) {
    console.error('❌ Failed to send push notification:', error);
  }
}

// Track the current screen name and update global.currentScreen
const ScreenTracker = () => {
  const currentScreen = useNavigationState((state) => state.routes[state.index].name);

  // Update the global.currentScreen whenever the screen changes
  useEffect(() => {
    global.currentScreen = currentScreen;  // You can also use a state management library like Context API if preferred
    console.log('Current screen updated to:', currentScreen);
  }, [currentScreen]);

  return null; // This component doesn't render anything, it's only used to track the screen
};

export default ScreenTracker;
