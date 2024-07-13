import React from "react";
import { StyleSheet, Text, View } from "react-native";

const PromptScreen = () => {
  return (
    <View>
      <Text style={styles.promptText}>💡 Add a prompt</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  promptText: {
    fontSize: 20,
    color: "#121212",
    fontWeight: "700",
    margin: 10,
  },
});

export default PromptScreen;
