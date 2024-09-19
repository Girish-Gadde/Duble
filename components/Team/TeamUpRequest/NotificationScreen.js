import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { serverIP } from '../../../config';

const AcceptInviteScreen = () => {

  

  const [invites, setInvites] = useState([]);
  const invitee = '66d6e8e49b889ada7a2c9fcf'; // Assuming the logged-in user is Rohit

  // Fetch the invites for the logged-in user
  useEffect(() => {
    const fetchInvites = async () => {
      try {
        const response = await axios.get(`${serverIP}/notification/get-invites/${invitee}`);
        setInvites(response.data.receivedRequests);
      } catch (error) {
        console.error('Error fetching invites:', error.response?.data || error.message);
      }
    };

    fetchInvites();
  }, []);

  // Accept the invite
  const acceptInvite = async (teamId) => {
    try {
      const response = await axios.post(`${serverIP}/notification/accept-invite`, {
        teamId,
        invitee
      });

      Alert.alert('Success', `Invite accepted! Team members: ${response.data.team.members.join(', ')}`);
      setInvites(invites.filter(invite => invite._id !== teamId)); // Remove invite after acceptance
    } catch (error) {
      console.error('Error accepting invite:', error.response?.data || error.message);
      Alert.alert('Error', error.response?.data?.error || 'Failed to accept invite.');
    }
  };

  // Reject the invite
  const rejectInvite = async (teamId) => {
    try {
      await axios.post(`${serverIP}/notification/reject-invite`, {
        teamId,
        invitee // Include invitee in the payload
      });
      Alert.alert('Invite rejected and team deleted!');
      setInvites(invites.filter(invite => invite._id !== teamId)); // Remove invite after rejection
    } catch (error) {
      console.error('Error rejecting invite:', error.response?.data || error.message);
      Alert.alert('Error', error.response?.data?.error || 'Failed to reject invite.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your Invitations</Text>
      
      {invites.length === 0 ? (
        <Text style={styles.noInvites}>No invites found</Text>
      ) : (
        invites.map((invite, index) => (
          <View key={index} style={styles.inviteCard}>
            <Text style={styles.inviteText}>Team: {invite.teamName}</Text>
            <Text style={styles.inviteText}>Inviter: {invite.inviter}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Accept" onPress={() => acceptInvite(invite._id)} />
              <Button title="Reject" color="red" onPress={() => rejectInvite(invite._id)} />
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: '20%',
    paddingHorizontal:'2%',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  noInvites: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
  },
  inviteCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  inviteText: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AcceptInviteScreen;
