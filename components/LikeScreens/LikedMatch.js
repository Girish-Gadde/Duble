import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const LikedMatch = ({ route, navigation }) => {
  const { profile } = route.params;

  const navigateBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.crossIcon} onPress={navigateBack}>
        <Icon name="close" size={24} color="#000" />
      </TouchableOpacity>
      <Image
        source={require("../../assets/nimbus_link.jpg")}
        style={styles.image}
      />
      <Text style={styles.text}>
        You matched with {profile.name1} & {profile.name2}!
      </Text>
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
