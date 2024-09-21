import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { serverIP } from '@/config';

// Replace 'YourHardcodedName' with your hardcoded value
const HARD_CODED_NAME = 'Prashik';

export default function JoinTeam({ navigation }) {
  const route = useRoute();
  const [teamName, setTeamName] = useState('');
  const [otp, setOtp] = useState('');

  useEffect(() => {
    if (route.params?.inviteLink) {
      const { inviteLink } = route.params;
      const urlParams = new URLSearchParams(inviteLink.split('?')[1]);
      setTeamName(urlParams.get('teamName') || '');
      setOtp(urlParams.get('otp') || '');
    }
  }, [route.params?.inviteLink]);

  const joinTeam = async () => {
    if (!teamName || !otp) {
      Alert.alert('Error', 'Please provide team name and OTP');
      return;
    }

    try {
      const response = await axios.post(`${serverIP}/team/join-team`, {
        teamName,
        otp,
        newMemberName: HARD_CODED_NAME, // Use the hardcoded value here
      });

      if (response.data.message) {
        Alert.alert('Success', response.data.message);
        //navigation.navigate('CreateTeam'); // Navigate back to Create Team screen
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

      <TouchableOpacity style={styles.button} onPress={joinTeam}>
        <Text style={styles.buttonText}>Join Team</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: '10%',
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
    backgroundColor: '#FF3156',
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
