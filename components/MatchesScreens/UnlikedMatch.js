import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const UnlikedMatch = ({ navigation }) => {
  const profile = {
    id: 1,
    imageSource: require("../../assets/profile-8.jpg"),
    name1: "Rahul",
    age1: 24,
    name2: "Rishi",
    age2: 26,
    location: "3 km away",
    description: "Crazy cat lady who is as crazy as a cat who loves to explore",
    ourStory: "We met at a coffee shop and bonded over our love for cats",
    funDate: "Visiting a cat café and having a cat-themed movie marathon",
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.crossIcon}>
        <Icon name="times" size={24} color="#000" />
      </TouchableOpacity>
      <Image
        source={require("../../assets/nimbus_link.jpg")}
        style={styles.image}
      />
      <Text style={styles.text}>You unmatched with Neha & Shruti!</Text>
      <View style={styles.unMatchContainer}>
        <TouchableOpacity>
          <Text style={styles.unMatchText}>It was a mistake</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.unMatchText}>Report</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.unMatchText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  crossIcon: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 16,
  },
  unMatchContainer: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "space-between",
    width: 217,
    height: 121,
    padding: 15,
    marginTop: 20,
  },
  unMatchText: {
    fontWeight: "350",
    fontSize: 14,
    color: "#121212",
    lineHeight: 16.77,
  },
});

export default UnlikedMatch;
