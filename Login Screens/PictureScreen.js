import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { serverIP } from "@/config";

const PictureScreen = ({ route, navigation }) => {
  const { name, dob, gender, occupation, mobileNumber, location, address } =
    route.params;
  console.log(
    "DETAILS: ",
    name,
    dob,
    gender,
    occupation,
    mobileNumber,
    location,
    address
  );
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      if (images.length + result.assets.length > 4) {
        Alert.alert("Limit Reached", "You can only upload up to 4 images.");
        return;
      }
      setImages([...images, ...result.assets.map((asset) => asset.uri)]);
    }
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const uploadData = async () => {
    if (images.length === 0) {
      Alert.alert("No Images", "Please upload at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("dob", dob);
    formData.append("gender", gender);
    formData.append("occupation", occupation);
    formData.append("mobileNumber", mobileNumber);
    formData.append("location", JSON.stringify(location));
    formData.append("address", address);

    images.forEach((uri, index) => {
      const filename = uri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      formData.append("images", {
        uri,
        name: filename,
        type,
      });
    });

    setIsUploading(true);
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await fetch(`${serverIP}/auth/save-user-data`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload data");
      }

      const responseData = await response.json();
      console.log("Response:", responseData);
      Alert.alert("Success", "Data uploaded successfully!");
      navigateToSetUpScreen();
    } catch (error) {
      console.error("Upload failed:", error);
      Alert.alert("Upload Failed", "Failed to upload data, please try again.");
    } finally {
      setIsUploading(false);
      setLoading(false)
    }
  };

  const navigateToSetUpScreen = () => {
    navigation.navigate("SetUpScreen", { mobileNumber });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Set Up</Text>
      <View style={styles.textLogin}>
        <Text style={styles.subtitle}>Let’s add a few pictures!</Text>
      </View>

      <View style={styles.imageGrid}>
        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeImage(index)}
            >
              <Text style={styles.removeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {images.length === 0 && (
        <View style={styles.viewContainer}>
          <TouchableOpacity onPress={pickImages}>
            <Text style={styles.uploadText}>Upload</Text>
          </TouchableOpacity>
        </View>
      )}

      {images.length > 0 && images.length < 4 && (
        <TouchableOpacity onPress={pickImages}>
          <Text style={styles.AddText}>Add more+</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity 
      style={[styles.button, loading && styles.buttonDisabled]} onPress={uploadData}
      disabled={loading}
      >
      {loading ? (
        <ActivityIndicator size="Small" color="#fff"/>
      ) : (
        <Text style={styles.buttonText}>Done</Text>
       )}
       </TouchableOpacity>

      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
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
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 45,
    alignSelf: "center",
    fontWeight: "400",
    lineHeight: 23.96,
    color: "#121212",
  },
  button: {
    width: 340,
    height: 49,
    backgroundColor: "#6420AA",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    marginTop: 40,
  },
  buttonDisabled: {
    backgroundColor: "#9a73ef",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  viewContainer: {
    width: 350,
    height: 350,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  uploadText: {
    fontSize: 20,
    fontWeight: "400",
    lineHeight: 23.96,
    textDecorationLine: "underline",
    color: "#121212",
  },
  AddText: {
    fontSize: 20,
    fontWeight: "400",
    lineHeight: 23.96,
    textDecorationLine: "underline",
    color: "#121212",
    marginTop: 25,
  },
  imageGrid: {
    width: "90%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  image: {
    width: "48%",
    height: 150,
    marginBottom: 10,
    borderRadius: 10,
  },
  imageContainer: {
    position: "relative",
    margin: 5,
    flexDirection: "row",
  },
  removeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#6A6C6D",
    borderRadius: 12,
    width: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default PictureScreen;
