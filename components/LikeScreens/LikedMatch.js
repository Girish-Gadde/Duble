import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const LikedMatch = ({ navigation }) => {
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
      <Text style={styles.text}>You matched with Neha & Shruti!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("LikedChat", { profile });
        }}
      >
        <Text style={styles.buttonText}>Start Chatting</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: "#FF3156",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 190,
    height: 49,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
  },
  buttonText: {
    color: "#FFDDEE",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19.17,
  },
});

export default LikedMatch;
