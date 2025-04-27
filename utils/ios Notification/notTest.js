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



// // HomeScreen.js
// import React, { useEffect, useState, useRef } from 'react';
// import { View, Text, Button, Alert } from 'react-native';
// import * as Notifications from 'expo-notifications';
// import {
//   registerForPushNotificationsAsync,
//   sendPushNotification,
// } from './notification';

// export default function HomeScreen() {
//   const [expoToken, setExpoToken] = useState(null);
//   const notificationListener = useRef();
//   const responseListener = useRef();

//   useEffect(() => {
//     // Register for push notifications and get the token
//     registerForPushNotificationsAsync().then(token => {
//       if (token) {
//         setExpoToken(token);
//       } else {
//         console.log('❌ Failed to get Expo push token');
//       }
//     });

//     // Listener for notifications received while app is foregrounded
//     notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
//       console.log('📩 Notification received in foreground:', notification);
//     });

//     // Listener for when a user taps on a notification
//     responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
//       console.log('📲 User tapped notification:', response);
//     });

//     // Cleanup listeners on unmount
//     return () => {
//       if (notificationListener.current) {
//         Notifications.removeNotificationSubscription(notificationListener.current);
//       }
//       if (responseListener.current) {
//         Notifications.removeNotificationSubscription(responseListener.current);
//       }
//     };
//   }, []);

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>🚀 Push Notification Demo</Text>
//       <Button
//         title="Send Test Notification"
//         onPress={() => {
//           if (expoToken) {
//             sendPushNotification(
//               expoToken,
//               '🎉 Hello from HomeScreen!',
//               'This is a test push notification.',
//               { screen: 'HomeScreen' }
//             );
//           } else {
//             Alert.alert('Token not available', 'Push token is null or not generated.');
//           }
//         }}
//       />
//     </View>
//   );
// }
import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";

const PushNotificationSender = () => {
  const [message, setMessage] = useState("");

  const sendNotification = async () => {
    const payload = {
      token: "ExponentPushToken[KirPS7E66_tWvPRZrK2rhd]", // Replace with real token
      title: "Message from John",
      body: message,
      data: {
        type: "chat",
        chatId: "chat_abc123",
        senderId: "user_789",
      },
    };

    try {
      const response = await fetch("http://192.168.1.11:4002/notifications/send-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("📩 Push response:", result);
      Alert.alert("Success", "Notification sent!");
    } catch (error) {
      console.error("❌ Error sending push:", error);
      Alert.alert("Error", "Failed to send notification.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter message"
        value={message}
        onChangeText={setMessage}
        style={styles.input}
      />
      <Button title="Send Push Notification" onPress={sendNotification} />
    </View>
  );
};

export default PushNotificationSender;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
});
