import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import * as Sharing from 'expo-sharing';

export default function CreateTeam({ navigation }) {
  const [teamName, setTeamName] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [inviteLink, setInviteLink] = useState('');

  const createTeam = async () => {
    if (!teamName || !creatorName) {
      Alert.alert('Error', 'Please provide both Team Name and Your Name');
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.14:3000/create-team', {
        teamName,
        creatorName,
      });

      const { inviteLink } = response.data;
      setInviteLink(inviteLink);
      Alert.alert('Team Created', `Invite Link: ${inviteLink}`);
    } catch (error) {
      console.error('Error creating team:', error);
      Alert.alert('Error', 'Failed to create team');
    }
  };

  const shareInvite = async () => {
    if (!inviteLink) {
      Alert.alert('Error', 'Please generate an invite link first');
      return;
    }

    try {
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(inviteLink, {
          title: 'Invite Link',
          message: `Join my team using this link: ${inviteLink}`,
        });
        console.log('Shared successfully');
      } else {
        Alert.alert('Error', 'Sharing not available on this platform');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a Team</Text>

      <Text style={styles.label}>Your Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Your Name"
        value={creatorName}
        onChangeText={setCreatorName}
      />

      <Text style={styles.label}>Team Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Team Name"
        value={teamName}
        onChangeText={setTeamName}
      />

      <TouchableOpacity style={styles.button} onPress={createTeam}>
        <Text style={styles.buttonText}>Create Team</Text>
      </TouchableOpacity>

      {inviteLink ? (
        <View>
          <Text style={styles.inviteLink}>Invite Link: {inviteLink}</Text>
          <TouchableOpacity style={styles.button} onPress={shareInvite}>
            <Text style={styles.buttonText}>Share Invite Link</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('JoinTeam')}>
        <Text style={styles.buttonText}>Go to Join Team</Text>
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
  inviteLink: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 14,
  },
});
