import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const AddScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // const pickImage = async () => {
  //   // Open the image picker and allow user to choose Image from library or take a picture
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });
  
  //   if (!result.canceled) {
  //     setSelectedImage(result.uri);
  //   }
  // };

  const pickImage = async () => {
    // Ask the user for permission to access the camera roll
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,  

      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,  

    });

    if (pickerResult.assets !== null) {
      console.log(pickerResult.assets[0].uri)
    }
    

    if (!pickerResult.canceled) {
      console.log("selected")
      setSelectedImage(pickerResult.assets[0].uri);
      console.log("picker")
      console.log(pickerResult.uri)
    }

    // console.log("picker")
    // console.log(pickerResult.uri)
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.image} />
        ) : (
          <Button title="Choose Image" onPress={pickImage} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default AddScreen;