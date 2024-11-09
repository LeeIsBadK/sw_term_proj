import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const Test = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // Ask the user for permission to access the camera roll
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,  

      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,  

    });

    if (!pickerResult.canceled) {
      setImage(pickerResult.uri);
    }

    console.log("picker")
    console.log(pickerResult.uri)
  };

  const takePhoto = async () => {
    // Ask the user for permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchCameraAsync({  

      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,  

    });

    if (!pickerResult.canceled) {
      setImage(pickerResult.uri);
    }

    console.log("camera")
    console.log(pickerResult.uri)
  };

  const handleConfirm = () => {
    // Handle confirmation logic here, e.g., send the image to a server, process it, etc.
    console.log('Image confirmed:', image);
  };

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <View style={styles.buttonContainer}>
        <Button
          title="Take Photo"
          onPress={takePhoto}
          icon={<Ionicons name="camera" size={24} color="white" />}
          iconContainerStyle={{ marginRight: 10 }}
        />
        <Button
          title="Choose Image"
          onPress={pickImage}
          icon={<Ionicons name="image" size={24} color="white" />}
          iconContainerStyle={{ marginLeft: 10 }}
        />
        <Button title="Confirm" onPress={handleConfirm} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
});

export default Test;