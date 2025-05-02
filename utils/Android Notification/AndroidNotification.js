
import React, { useState, useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import axios from 'axios';

export default function App() {
  const [fcmPushToken, setFcmPushToken] = useState(null);  // Use FCM token instead of Expo token

  useEffect(() => {
    // Request permissions to show notifications
    Notifications.requestPermissionsAsync().then(({ status }) => {
      if (status === 'granted') {
        console.log('Notification permission granted');
      } else {
        console.log('Notification permission denied');
      }
    });

    // Listen for notifications received while app is in the foreground
    Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    // Listen for notifications opened by the user
    Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response:', response);
    });
  }, []);

  // Function to get FCM Push Token (instead of Expo push token)
  const getFcmPushToken = async () => {
    try {
      const { data } = await Notifications.getDevicePushTokenAsync();  // Get the FCM token here
      console.log('FCM Push Token:', data);
      setFcmPushToken(data);

      // Send the token to your backend
      const response = await axios.post('http://192.168.1.9:4002/firebase-android/register-device-token', {
        token: data,  // Send FCM token to the backend
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error getting FCM push token:', error);
    }
  };

  // Function to send test push notification
  const sendTestNotification = async () => {
    if (!fcmPushToken) {
      Alert.alert('Error', 'FCM push token is not available!');
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.9:4002/firebase-android/send-push-notification', {
        token: fcmPushToken,  // Use FCM token here
      });
      console.log(response.data);
      Alert.alert('Test notification sent');
    } catch (error) {
      console.error('Error sending test notification:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Get Device Token" onPress={getFcmPushToken} />
      <Button title="Send Test Notification" onPress={sendTestNotification} disabled={!fcmPushToken} />
    </View>
  );
}
