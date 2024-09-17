import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { serverIP } from '../../config';

const ChatListScreen = ({ navigation }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Manually hardcoded teamId
  const teamId = '66d6ee9e92e63ffe7c44f9ef';  // Replace with actual team ID

  useEffect(() => {
    const fetchRooms = async () => {
      if (!teamId) {
        console.warn('No team ID provided');
        alert('Please enter a team ID');
        return;
      }

      console.log('Fetching rooms for team ID:', teamId);

      try {
        const response = await axios.get(`${serverIP}/chat-room/api/rooms/${teamId}`);
        console.log('Fetched rooms data:', response.data);

        if (!response.data || response.data.length === 0) {
          console.warn('No rooms found for the provided team ID.');
          alert('No rooms found for the provided team ID.');
          setRooms([]);
        } else {
          setRooms(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        alert('Failed to fetch rooms');
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);  // Fetch rooms when component mounts

  const handleRoomPress = (room) => {
    const { roomId, teams } = room;
    // Find the team that matches the teamId and get its members
    const team = teams.find(t => t.teamId === teamId);
    const memberName = team && team.members && team.members.length > 0 ? team.members[0] : 'No member'; // Ensure members array is valid
    console.log('Room selected:', roomId);
    console.log('Members:', team ? team.members : 'No members');
    navigation.navigate('ChatScreen', { roomId, username: memberName });
  };

  const renderItem = ({ item }) => {
    console.log('Rendering room item:', item); // Debugging log

    // Ensure teams is an array before flattening its members
    const allMembers = Array.isArray(item.teams)
      ? item.teams.flatMap(team => team.members).join('   ')  // Adding spaces between names
      : 'No members available';

    return (
      <TouchableOpacity onPress={() => handleRoomPress(item)}>
        <View style={styles.roomContainer}>
          <Text style={styles.memberText}>{allMembers}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.roomId ? item.roomId.toString() : 'undefined'}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  roomContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  memberText: {
    fontSize: 14,
    marginVertical: 2,
    flexWrap: 'wrap',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatListScreen;
