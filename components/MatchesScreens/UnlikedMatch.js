import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const UnlikedMatch = ({ route, navigation }) => {
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
        You unmatched with {profile.name1} & {profile.name2}!
      </Text>
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
