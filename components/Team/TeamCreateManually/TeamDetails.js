import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function JoinTeam({ route }) {
  const { teamName, otp } = route.params; // Extract teamName and otp from the route params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join Team</Text>
      <Text>Team Name: {teamName}</Text>
      <Text>Your OTP: {otp}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
