import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

const LocationScreen = ({ route, navigation }) => {
  const { name, dob, gender, occupation, mobileNumber } = route.params;
  const [location, setLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }

    let locationData = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = locationData.coords;
    console.log(locationData.coords, "LOKJHS");
    setLocation({ latitude, longitude });
    setMapRegion({
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });

    let [reverseGeocodedLocation] = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (reverseGeocodedLocation) {
      // Extracting address components
      const { street, streetNumber, subregion, city, region, country } =
        reverseGeocodedLocation;

      // Format address
      const fullAddress = `${streetNumber ? streetNumber + " " : ""}${
        street || ""
      }, ${subregion || ""}, ${city || ""}, ${region || ""}, ${country || ""}`;

      setAddress(fullAddress);
    }
  };

  const navigateToNextScreen = () => {
    navigation.navigate("PictureScreen", {
      name,
      dob,
      gender,
      occupation,
      mobileNumber,
      location,
      address,
      navigation,
    });
  };

  // useEffect(() => {
  //   requestLocationPermission();
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      {!location && (
        <View style={styles.setUpView}>
          <Text style={styles.title}>Set Up</Text>
          <View style={styles.textLogin}>
            <Text style={styles.subtitle}>
              Please provide your location for customized team suggestions
            </Text>
          </View>
        </View>
      )}
      {!location && (
        <View style={styles.locationContainer}>
          {/* Base map image */}
          <Image
            source={require("../assets/world-map.png")} // Base image path
            style={styles.locationImage}
          />

          {/* Overlay image */}
          <Image
            source={require("../assets/Vector3.png")} // Replace with overlay image path
            style={styles.overlayImage}
          />
        </View>
      )}

      {/* {mapRegion && (
        <MapView
          style={styles.map}
          region={mapRegion}
          showsUserLocation={true}
          followUserLocation={true}
        >
          <Marker coordinate={mapRegion} />
        </MapView>
      )} */}

      {!location && (
        <TouchableOpacity
          style={styles.button}
          onPress={requestLocationPermission}
        >
          <Text style={styles.buttonText}>Allow</Text>
        </TouchableOpacity>
      )}

      {location && (
        <TouchableOpacity style={styles.button1} onPress={navigateToNextScreen}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 45,
    lineHeight: 53.91,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 35,
  },
  textLogin: {
    marginBottom: 20,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 45,
    alignSelf: "center",
    fontWeight: "400",
    lineHeight: 23.96,
    color: "#121212",
  },
  map: {
    width: "90%",
    height: 650,
    marginBottom: 20,
  },
  button: {
    width: "90%",
    height: 49,
    backgroundColor: "#6420AA",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    marginVertical: 13,
  },
  button1: {
    width: "90%",
    height: 49,
    backgroundColor: "#6420AA",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    marginVertical: 10,
    position: "relative",
    top: "50%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  setUpView: {
    flex: 0.6,
    alignItems: "center",
  },
  locationImage: {
    width: "75%",
    height: 307,
    paddingVertical: 10,
    marginVertical: 20,
  },
  locationContainer: {
    position: "relative",
    width: "110%", // Adjust to match locationImage dimensions
    height: 360, // Adjust to match locationImage dimensions
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  overlayImage: {
    position: "absolute",
    width: 53.13, // Set dimensions of the overlay image
    height: 76.29, // Adjust as needed
    top: "7%",
    right: "17%",
  },
});

export default LocationScreen;
