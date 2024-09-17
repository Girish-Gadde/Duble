// Just for references

import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { UserContext } from '../TeamSwitch/UserContext';

const CreateTeamScreen = () => {
  const [teamName, setTeamName] = useState('');
  const [inviter, setInviter] = useState(''); // Assuming you get this from logged-in user
  const [invitee, setInvitee] = useState('');

  const { username } = useContext(UserContext);
  console.log('User Name ------>', username)

  const createTeam = async () => {
    try {
      const response = await axios.post('http://172.20.10.5:3000/create-team', {
        teamName,
        inviter,
        invitee
      });

      Alert.alert('Success', 'Team created successfully!');
      setTeamName('');
      setInvitee('');
    } catch (error) {
      console.error('Error creating team:', error.response?.data || error.message);
      Alert.alert('Error', error.response?.data?.error || 'Failed to create team.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a Team</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter team name"
        value={teamName}
        onChangeText={setTeamName}
      />
      <TextInput
        style={styles.input}
        placeholder="Your name"
        value={inviter}
        onChangeText={setInviter}
      />
      <TextInput
        style={styles.input}
        placeholder="Invitee's name"
        value={invitee}
        onChangeText={setInvitee}
      />
      <Button title="Create Team" onPress={createTeam} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});

export default CreateTeamScreen;
