import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TouchableOpacity, Alert } from 'react-native';
import Checkbox from 'expo-checkbox'; // make sure to install with `npm install expo-checkbox`

const TermsScreen = ({navigation}) => {
  const [isChecked, setChecked] = useState(false);
  //const navigation = useNavigation();

  const handleContinue = () => {
    if (!isChecked) {
      Alert.alert("You must agree to continue");
      return;
    }

    navigation.replace('Login'); // Replace this with your login screen name
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>End User License Agreement</Text>
      
      <ScrollView style={styles.eulaBox}>
  <Text style={styles.eulaText}>
    {/* EULA content - replace with your own */}
    Welcome to Duble. Before using the app, you must agree to the End User License Agreement (EULA).
    {'\n\n'}
    This agreement includes but is not limited to:
  </Text>

  <View style={styles.listContainer}>
    <Text style={styles.listItem}>• You agree not to misuse the app.</Text>
    <Text style={styles.listItem}>• You agree that your data may be used according to our privacy policy.</Text>
    <Text style={styles.listItem}>• You must be of legal age to use this app.</Text>
    <Text style={styles.listItem}>• We are not liable for any damages incurred through app use.</Text>
  </View>

  <Text style={styles.eulaText}>
    {'\n'}Full EULA can be found on our website.
  </Text>
</ScrollView>


      <View style={styles.checkboxContainer}>
        <Checkbox
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#6420AA' : undefined}
        />
        <Text style={styles.label}>I agree to the EULA terms above</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: isChecked ? '#6420AA' : '#ccc' }]}
        onPress={handleContinue}
        disabled={!isChecked}
      >
        <Text style={styles.buttonText}>Continue to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TermsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 25,
    textAlign: 'center',
  },
  eulaBox: {
    flex: 1,
    maxHeight: '60%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  eulaText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
  },
  button: {
    flexDirection: "row", // Row layout to align icon/image and text side by side
    alignItems: "center", // Vertically centers icon/image and text
    justifyContent: "center", // Centers both icon/image and text horizontally
    paddingVertical: "2.5%", // Vertical padding for the button
    marginVertical: "4%", // Margin between buttons
    borderRadius: 33, // Rounded corners
    width: "100%", // Button width takes up the full width of the container (90% of screen width)
    height: "7.5%", // Button height is set to 10% of the screen height
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
    listContainer: {
    marginLeft: 10, // Indent list for better readability
  },
  listItem: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
    marginBottom: 5,
  },
});
