import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const CreateTeamScreen = () => {
  const [teamName, setTeamName] = useState('');
  const [inviter, setInviter] = useState('');
  const [invitee, setInvitee] = useState('');
  const [age1, setAge1] = useState('');
  const [name1, setName1] = useState('');
  const [age2, setAge2] = useState('');
  const [name2, setName2] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [occupation, setOccupation] = useState('');
  const [place, setPlace] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const handleCreateTeam = async () => {
    if (!teamName || !inviter || !invitee) {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
      return;
    }

    try {
      const response = await axios.post('http://your-server-url/team/create-team', {
        teamName,
        inviter,
        invitee,
        age1,
        name1,
        age2,
        name2,
        gender,
        height,
        occupation,
        place,
        description,
        location,
      });

      if (response.data) {
        Alert.alert('Success', 'Team created and invite sent!');
      }
    } catch (error) {
      console.error('Error creating team:', error);
      Alert.alert('Error', 'An error occurred while creating the team. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Team Name"
        value={teamName}
        onChangeText={setTeamName}
        style={styles.input}
      />
      <TextInput
        placeholder="Inviter"
        value={inviter}
        onChangeText={setInviter}
        style={styles.input}
      />
      <TextInput
        placeholder="Invitee"
        value={invitee}
        onChangeText={setInvitee}
        style={styles.input}
      />
      <TextInput
        placeholder="Age 1"
        value={age1}
        onChangeText={setAge1}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Name 1"
        value={name1}
        onChangeText={setName1}
        style={styles.input}
      />
      <TextInput
        placeholder="Age 2"
        value={age2}
        onChangeText={setAge2}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Name 2"
        value={name2}
        onChangeText={setName2}
        style={styles.input}
      />
      <TextInput
        placeholder="Gender"
        value={gender}
        onChangeText={setGender}
        style={styles.input}
      />
      <TextInput
        placeholder="Height"
        value={height}
        onChangeText={setHeight}
        style={styles.input}
      />
      <TextInput
        placeholder="Occupation"
        value={occupation}
        onChangeText={setOccupation}
        style={styles.input}
      />
      <TextInput
        placeholder="Place"
        value={place}
        onChangeText={setPlace}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />
      <Button title="Create Team and Send Invite" onPress={handleCreateTeam} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
});

export default CreateTeamScreen;
