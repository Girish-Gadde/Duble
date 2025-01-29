import React, { useState } from 'react';
import { TextInput, View, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const OTPForm = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [serviceSid, setServiceSid] = useState(true);
  const [error, setError] = useState('');

  // Send OTP function
  const sendOTP = async () => {
    if (!phone) {
      setError('Phone number is required');
      return;
    }
    try {
      const response = await axios.post('http://192.168.1.12:4002/auth/send-otp', { phone });
      setServiceSid(response.data.serviceSid);
      setError('');
      alert('OTP sent to your phone!');
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError('Failed to send OTP');
    }
  };

  // Verify OTP function
  const verifyOTP = async () => {
    
    if (!otp || !serviceSid) {
      setError('OTP and Service SID are required');
      return;
    }
    try {
      const response = await axios.post('http://192.168.1.12:4002/auth/verify-otp', {
        phone,
        otp,
        serviceSid,
      });
      alert(response.data.message);
      setError('');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('Failed to verify OTP');
    }
  };

  return (
    <View style={styles.container}>
      {/* Send OTP */}
      {!serviceSid ? (
        <View>
          <Text>Phone Number:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          {error && <Text style={styles.error}>{error}</Text>}
          <Button title="Send OTP" onPress={sendOTP} />
        </View>
      ) : (
        // Verify OTP
        <View>
          <Text>OTP:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
          />
          {error && <Text style={styles.error}>{error}</Text>}
          <Button title="Verify OTP" onPress={verifyOTP} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default OTPForm;
