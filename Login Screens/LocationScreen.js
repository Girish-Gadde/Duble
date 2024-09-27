import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

const LocationScreen = ({ route, navigation }) => {
  const { name, dob, mobileNumber } = route.params;
  const [location, setLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [address, setAddress] = useState(null);

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
        <TouchableOpacity style={styles.button} onPress={navigateToNextScreen}>
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
    marginBottom: 45,
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
    width: 356,
    height: 49,
    backgroundColor: "#6420AA",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  setUpView: {
    flex: 0.6,
    alignItems: "center",
  },
});

export default LocationScreen;
