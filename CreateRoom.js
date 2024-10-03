import React from 'react';
import { View, Button, Alert } from 'react-native';

const CreateChatRoom = () => {
  // Function to make the API call
  const createChatRoom = async () => {
    const url = 'https://duble-api-277cfc5cb720.herokuapp.com/chat-room/api/match';

    // Hardcoded data as per your structure
    const requestData = {
      teamA: {
        teamId: 'Team PUBG',
        members: ['member1', 'member2'],
      },
      teamB: {
        teamId: 'Team BGMI',
        members: ['member3', 'member4'],
      },
    };

    try {
      // POST request using fetch API
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData), // Convert requestData to JSON
      });

      // Handling the response
      if (response.ok) {
        const responseData = await response.json();
        Alert.alert('Success', 'Chat room created successfully');
        console.log('Response Data:', responseData); // You can use this data in your UI if needed
      } else {
        Alert.alert('Error', 'Failed to create chat room');
        console.log('Error:', response.status);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while creating the chat room');
      console.error('Error:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Create Chat Room" onPress={createChatRoom} />
    </View>
  );
};

export default CreateChatRoom;
