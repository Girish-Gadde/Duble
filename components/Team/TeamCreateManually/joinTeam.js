
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { UserContext } from '../TeamSwitch/UserContext';

export default function JoinTeam({ navigation }) {
  const route = useRoute();
  const [teamName, setTeamName] = useState('');
  const [otp, setOtp] = useState('');
  const [newMemberName, setNewMemberName] = useState('');
  const { username } = useContext(UserContext);
  console.log('User Name ------>', username)

  useEffect(() => {
    if (route.params?.inviteLink) {
      const { inviteLink } = route.params;
      const urlParams = new URLSearchParams(inviteLink.split('?')[1]);
      setTeamName(urlParams.get('teamName') || '');
      setOtp(urlParams.get('otp') || '');
    }
  }, [route.params?.inviteLink]);

  const joinTeam = async () => {
    if (!teamName || !otp || !newMemberName) {
      Alert.alert('Error', 'Please provide team name, OTP, and your name');
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.9:3000/join-team', {
        teamName,
        otp,
        newMemberName,
      });

      if (response.data.message) {
        Alert.alert('Success', response.data.message);
        navigation.navigate('CreateTeam'); // Navigate back to Create Team screen
      } else if (response.data.error) {
        if (response.data.error === 'Team already has two members') {
          Alert.alert('Team Full', 'This team is already full. Please try joining another team.');
        } else {
          Alert.alert('Error', response.data.error);
        }
      }
    } catch (error) {
      console.error('Error joining team:', error);
      Alert.alert('Error', 'Failed to join team. Please check your details and try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join a Team</Text>

      <Text style={styles.label}>Team Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Team Name"
        value={teamName}
        onChangeText={setTeamName}
      />

      <Text style={styles.label}>OTP</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
      />

      <Text style={styles.label}>Your Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Your Name"
        value={newMemberName}
        onChangeText={setNewMemberName}
      />

      <TouchableOpacity style={styles.button} onPress={joinTeam}>
        <Text style={styles.buttonText}>Join Team</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DubleStart')}>
        <Text style={styles.buttonText}>Go to Create Team</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
