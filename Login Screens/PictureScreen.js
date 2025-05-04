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
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import { serverIP } from "@/config";

const PictureScreen = ({ route, navigation }) => {
  const { name, dob, gender, aboutMe, occupation, height, mobileNumber } =
    route.params;
  console.log(
    "DETAILS: ",
    name,
    dob,
    gender,
    aboutMe,
    occupation,
    height, '-Height',
    mobileNumber
  );
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [compressing, setCompressing] = useState(false);


  const compressImage = async (uri, index) => {
    // setCompressing((prev) => {
    //   const updated = [...prev];
    //   updated[index] = true;
    //   return updated;
    // });
  
    const fileInfo = await FileSystem.getInfoAsync(uri);
    const fileSize = fileInfo.size;
    const MAX_SIZE = 150 * 1024;
  
    let compressedUri = uri;
    try {
      if (fileSize > MAX_SIZE) {
        console.log('Image size is larger than 150KB, compressing...');
        let compressionAttempt = 0;
        let currentSize = fileSize;
  
        while (currentSize > MAX_SIZE && compressionAttempt < 3) {
          const quality = 0.5 - compressionAttempt * 0.1;
          const result = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width: 800 - compressionAttempt * 100 } }],
            { compress: quality, format: ImageManipulator.SaveFormat.JPEG }
          );
  
          compressedUri = result.uri;
          const compressedInfo = await FileSystem.getInfoAsync(compressedUri);
          currentSize = compressedInfo.size;

          console.log(`Attempt ${compressionAttempt + 1}:`);
          console.log('Original size:', (fileSize / 1024).toFixed(2), 'KB');
          console.log('Compressed size:', (currentSize / 1024).toFixed(2), 'KB');
  
          compressionAttempt++;
        }
      }
    } catch (err) {
      console.error("Compression failed:", err);
    }
  
    // setCompressing((prev) => {
    //   const updated = [...prev];
    //   updated[index] = false;
    //   return updated;
    // });
  
    return compressedUri;
  };
  

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

          try {
            const newImages = result.assets.map(asset => asset.uri);
            setCompressing(true);
        // Process and compress each image
        const processedImages = await Promise.all(
          newImages.map((uri, index) =>
            compressImage(uri, images.length + index)
          )
        );

        setImages([...images, ...processedImages]);
      } catch (error) {
        console.error('Error processing images:', error);
        Alert.alert('Error', 'Failed to process images. Please try again.');
      }finally {
        setCompressing(false); // hide loader after compression
      }
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
    formData.append("aboutMe", aboutMe);
    formData.append("occupation", occupation);
    formData.append("height", height);
    formData.append("mobileNumber", mobileNumber);
    // formData.append("location", JSON.stringify(location));
    // formData.append("address", address);

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
      Alert.alert("Success", "Signed up for Duble successfully!");
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

      <View style={styles.infoBox}>
  <Text style={styles.infoText}>
    We need your images to create your profile. Rest assured, your images will be securely stored in our database using encryption to ensure your privacy and safety.
  </Text>
</View>


      <View style={styles.imageGrid}>
        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
            {/* {compressing[index] && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="small" color="#fff" />
        </View>
      )} */}
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

{compressing && (
  <View style={styles.fullscreenLoader}>
    <ActivityIndicator size="large" color="#6420AA" />
  </View>
)}


      <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={uploadData}
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
    marginTop: 10,
    marginBottom: 20,
  },
  textLogin: {
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 20,
    alignSelf: "center",
    fontWeight: "400",
    lineHeight: 23.96,
    color: "#121212",
  },
  button: {
    width: 340,
    height: 40,
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
  infoBox: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#121212',
    lineHeight: 22,
    textAlign: 'center',
  },
  fullscreenLoader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  
  // loaderOverlay: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'rgba(0,0,0,0.4)',
  //   borderRadius: 8,
  // },
  
});

export default PictureScreen;

