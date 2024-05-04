import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ImageScreen1 = () => {
  const [isHeartActive, setIsHeartActive] = useState(false);
  const [showIcons, setShowIcons] = useState(true);
  const navigation = useNavigation();

  const toggleHeart = () => {
    setIsHeartActive(!isHeartActive);
    navigation.navigate("Image-2");
  };

  const handleScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const show = currentOffset <= 0;

    if (show !== showIcons) {
      setShowIcons(show);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      style={{ backgroundColor: "#EDEEF1" }}
    >
      <View style={{ flex: 1 }}>
        <Image
          source={require("../../assets/capture2.png")}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.textContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>Neha,</Text>
            <Text style={styles.ageText}>25</Text>
            <View style={styles.divider} />
            <Text style={styles.nameText}>Shruthi,</Text>
            <Text style={styles.ageText}>24</Text>
          </View>
          <View style={styles.locationContainer}>
            <MaterialIcons
              name="location-on"
              size={18}
              color="white"
              style={styles.locationIcon}
            />
            <Text style={styles.locationText}>2 km away</Text>
          </View>
          <Text style={styles.descriptionText}>
            "Your go to adventure enthusiast and amateur stand-up comedian"
          </Text>
        </View>
        {
          showIcons ? (
            <View style={styles.actionContainer1}>
              <TouchableOpacity style={styles.actionButton1}>
                <View
                  style={{
                    backgroundColor: "#6420AA",
                    borderRadius: 999,
                    width: 60,
                    height: 60,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AntDesign name="close" size={30} color="white" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton2}
                onPress={toggleHeart}
              >
                <View
                  style={[
                    styles.heartButton,
                    { backgroundColor: isHeartActive ? "#00b300" : "#FF3156" },
                  ]}
                >
                  <AntDesign name="heart" size={30} color="white" />
                </View>
              </TouchableOpacity>
            </View>
          ) : null
          // <View style={styles.actionContainer2}>
          //   <TouchableOpacity style={styles.actionButton}>
          //     <View style={styles.buttonContainer}>
          //       <Text style={styles.buttonText}>Reject</Text>
          //     </View>
          //   </TouchableOpacity>
          //   <TouchableOpacity style={styles.actionButton} onPress={toggleHeart}>
          //     <View
          //       style={[
          //         styles.buttonContainer,
          //         { backgroundColor: isHeartActive ? "#00b300" : "#F75394" },
          //       ]}
          //     >
          //       <Text style={styles.buttonText}>Like</Text>
          //     </View>
          //   </TouchableOpacity>
          // </View>
        }
        <View style={styles.viewContainer}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={16} color="#454545" />
            <Text style={styles.searchText}>Our Story</Text>
          </View>
          <Text style={styles.text}>
            We met at a comedy show where shruthi was performing her stand-up
            routine and Neha was in the audience{" "}
          </Text>
        </View>
        <View style={styles.viewContainer}>
          <View style={styles.searchContainer}>
            <Ionicons name="star" size={16} color="#FFFF66" />
            <Text style={styles.searchText}>Our Idea of a Fun Date</Text>
          </View>
          <Text style={styles.text}>
            Hiking in the mountains, laughing, roasting marshmallows and sharing
            stories{" "}
          </Text>
        </View>
      </View>
      <View style={styles.actionContainer2}>
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Reject</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={toggleHeart}>
          <View
            style={[
              styles.buttonContainer,
              { backgroundColor: isHeartActive ? "#00b300" : "#FF3156" },
            ]}
          >
            <Text style={styles.buttonText}>Like</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "92%",
    height: 600,
    alignSelf: "center",
    borderRadius: 12,
    marginRight: 3,
  },
  textContainer: {
    position: "absolute",
    top: 410,
    left: 7,
    right: 0,
    bottom: 0,
    padding: 20,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  nameText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#EDEEF1",
    marginRight: 10,
  },
  ageText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#EDEEF1",
  },
  divider: {
    width: 3,
    height: 30,
    backgroundColor: "white",
    marginHorizontal: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  locationIcon: {
    marginRight: 5,
  },
  locationText: {
    fontSize: 16,
    color: "#EDEEF1",
  },
  descriptionText: {
    fontSize: 14,
    color: "#EDEEF1",
    marginBottom: 20,
  },
  actionContainer1: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "absolute",
    top: 565,
    marginBottom: 20,
  },
  actionContainer2: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 20,
    paddingLeft: 8,
    // position: "absolute",
    // bottom: 10,
    // left: 0,
    // right: 0,
    marginTop: 40,
    marginBottom: 5,
  },
  actionButton1: { flex: 1, alignItems: "flex-end", marginHorizontal: 15 },
  actionButton2: { flex: 1, alignItems: "flex-start", marginHorizontal: 15 },
  heartButton: {
    borderRadius: 999,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  searchText: {
    fontSize: 16,
    color: "black",
    marginLeft: 2,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    lineHeight: 15,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  viewContainer: {
    backgroundColor: "#FFFFFF",
    marginTop: 40,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 6,
    paddingBottom: 13,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: "#6420AA",
    borderRadius: 35,
    paddingVertical: 13,
    paddingHorizontal: 10,
    alignItems: "center",
    width: 170,
    height: 49,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    //fontWeight: "bold",
    // marginTop: 5,
  },
});

export default ImageScreen1;
