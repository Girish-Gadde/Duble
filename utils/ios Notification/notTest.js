// import React, { useEffect, useState, useRef } from 'react';
// import { View, Text, Button } from 'react-native';
// import {
//   registerForPushNotificationsAsync,
//   sendPushNotification,
// } from './notification';
// import * as Notifications from 'expo-notifications';

// export default function HomeScreen() {
//   const [expoToken, setExpoToken] = useState(null);
//   const notificationListener = useRef();
//   const responseListener = useRef();

//   useEffect(() => {
//     // Register and get push token
//     registerForPushNotificationsAsync().then(token => {
//       if (token) setExpoToken(token);
//     });

//     // Listener when notification is received
//     notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
//       console.log('📩 Notification received in foreground:', notification);
//     });

//     // Listener when user taps on notification
//     responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
//       console.log('📲 User tapped notification:', response);
//     });

//     return () => {
//       Notifications.removeNotificationSubscription(notificationListener.current);
//       Notifications.removeNotificationSubscription(responseListener.current);
//     };
//   }, []);

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Push Notification Demo</Text>
//       <Button
//         title="Send Test Notification"
//         onPress={() =>
//           sendPushNotification(
//             expoToken,
//             '🎉 Hello from HomeScreen!',
//             'This is a test push notification.',
//             { screen: 'HomeScreen' }
//           )
//         }
//       />
//     </View>
//   );
// }



// HomeScreen.js
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import {
  registerForPushNotificationsAsync,
  sendPushNotification,
} from './notification';

export default function HomeScreen() {
  const [expoToken, setExpoToken] = useState(null);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // Register for push notifications and get the token
    registerForPushNotificationsAsync().then(token => {
      if (token) {
        setExpoToken(token);
      } else {
        console.log('❌ Failed to get Expo push token');
      }
    });

    // Listener for notifications received while app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('📩 Notification received in foreground:', notification);
    });

    // Listener for when a user taps on a notification
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('📲 User tapped notification:', response);
    });

    // Cleanup listeners on unmount
    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>🚀 Push Notification Demo</Text>
      <Button
        title="Send Test Notification"
        onPress={() => {
          if (expoToken) {
            sendPushNotification(
              expoToken,
              '🎉 Hello from HomeScreen!',
              'This is a test push notification.',
              { screen: 'HomeScreen' }
            );
          } else {
            Alert.alert('Token not available', 'Push token is null or not generated.');
          }
        }}
      />
    </View>
  );
}
