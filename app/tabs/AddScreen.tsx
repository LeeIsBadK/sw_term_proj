import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const AddScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isChoosing, toggleChoose] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(0);


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
      console.log("selected");
      setSelectedImage(pickerResult.assets[0].uri);
    } else {
      setSelectedImage(null);
      console.log('canceled');
    }

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
      setSelectedImage(pickerResult.assets[0].uri);
    } else {
      setSelectedImage(null);
      console.log('canceled');
    }

  };

  const handleChoose = () => {
    if (selectedImage) {
      toggleChoose(!isChoosing)
      if (isChoosing) {
        console.log('set null')
        setSelectedImage(null);
        setSelectedType(null)
      }
    }
  }

  const TypeSelector = () => {
  
    const categories = [
      {
        title: 'ประวัติของผู้เสียภาษี',
        items: [
          { id: 1, name: 'ประวัติของผู้เสียภาษี' },
        ],
      },
      {
        title: 'เอกสารแสดงรายได้',
        items: [
          { id: 2, name: 'รายได้หลัก' },
          { id: 3, name: 'ค่าตอบแทนเป็นครั้งคราว' },
          { id: 4, name: 'การได้รางวัล' },
          { id: 5, name: 'ค่าวิชาชีพ' },
          { id: 6, name: 'ดอกเบี้ยธนาคารและการลงทุนต่าง ๆ' },
        ],
      },
      {
        title: 'เอกสารรายจ่าย',
        items: [
          { id: 7, name: 'การซื้อของตามระเบียบรัฐบาลเพื่อลดหย่อนภาษี' },
        ],
      },
      {
        title: 'เอกสารการบริจาค',
        items: [
          { id: 8, name: 'บริจาคตามโรงพยาบาลและโรงเรียน' },
          { id: 9, name: 'บริจาคมูลนิธิต่าง ๆ และวัดหรือสถานสงเคราะห์' },
        ],
      },
      {
        title: 'เอกสารการลงทุนที่สามารถนำไปหักภาษีได้',
        items: [
          { id: 10, name: 'เอกสารการลงทุนที่สามารถนำไปหักภาษีได้' }
        ],
      },
      {
        title: 'เอกสารการดูแลบิดามารดาหรือบุตร',
        items: [
          { id: 11, name: 'เอกสารการดูแลบิดามารดาหรือบุตร' },
        ],
      },
    ];

    const handleItemPress = (itemId, itemName) => {
      if (itemId === selectedItemId) {
        setSelectedItemId(0);
        setSelectedType(null);
      } else {
        setSelectedItemId(itemId);
        setSelectedType(itemName);

      }
    };

    return (
      <ScrollView>
        {categories.map((category, index) => (
          <View key={index} style={styles.categoryContainer}>
            <Text style={[styles.categoryTitle, styles.font]}>{category.title}</Text>  
  
            <View style={styles.gridContainer}>
              {category.items.map((item) => (
                <Pressable
                  key={item.id}
                  style={[
                    styles.gridItem,
                    item.id === selectedItemId  && {backgroundColor: 'lightgreen'},
                    category.items.length === 1 && {flex: 1}
                  ]}
                  onPress={() => handleItemPress(item.id, item.name)}
                >
                  <Image
                    source={{ uri: `../../assets/doctypeicon/${item.id}.png` }} // Image source
                    style={styles.icon}
                  />
                  <Text style={[styles.font, {fontSize: 13}]}>{item.name}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      { isChoosing ?
        (
          <>
          <Image source={{ uri: selectedImage }} style={[styles.image, {height: '10%'}]} />
          <TypeSelector></TypeSelector>
          <Pressable style={[styles.typeButton, {backgroundColor: 'white'}]} onPress={handleChoose}>
            <Text style={[styles.font, {color: 'gray'}]}>เปลี่ยนรูปภาพ</Text>
          </Pressable>
          <Pressable style={[styles.typeButton, {backgroundColor: selectedType ? '#3FC385': 'gray'}]} onPress={selectedType? handleChoose : null }>
            <Text style={[styles.font, {color: selectedType ? 'white': 'lightgray'}]}>ยืนยัน</Text>
          </Pressable>
          </>
        ) : (
        <>
        <View style={styles.imageContainer}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.image} />
          ) : (
            <View style={styles.imagePlaceholder} />
          )}
        </View>
        <View style={styles.imageButtons}>
          <Pressable style={styles.pickerButton} onPress={takePhoto}>
            <Ionicons name="camera" size={24} color="black" />
            <Text style={[styles.font, {marginLeft: 10}]}>ถ่ายรูปภาพ</Text>
          </Pressable>
          <View style={styles.divider} />
          <Pressable style={styles.pickerButton} onPress={pickImage}>
            <Ionicons name="image" size={24} color="black" />
            <Text style={[styles.font, {marginLeft: 10}]}>เลือกภาพจากแกเลอรี่</Text>
          </Pressable>
        </View>
        <Pressable style={[styles.typeButton, {backgroundColor: selectedImage ? '#3FC385': 'gray'}]} onPress={handleChoose}>
          <Text style={[styles.font, {color: selectedImage ? 'white': 'lightgray'}]}>เลือกประเภทของเอกสาร</Text>
        </Pressable>
        </>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  font: {
    fontFamily: 'Kanit'
  },
  container: {
    backgroundColor: '#E2E2E2',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: '100%',
    backgroundColor: 'blue',
  },
  image: {
    flex: 1,
    width: '100%', // Fill the width of the container
    aspectRatio: 1,
    borderRadius: 10, // Add rounded corners
    marginVertical: 10, // Add vertical margin
    // width: '100%',
    // height: '70%',
    // width: 200,
    // height: 200,
    // height: 'auto',
  },
  imageButtons: {
    width: '100%',
    height: 35,
    backgroundColor: 'white',
    marginBottom: 10,
    flexDirection: 'row',
    borderRadius: 5,
    justifyContent: 'center',
    alignContent: 'center',
  },
  pickerButton: {
    justifyContent: 'flex-end', // Aligns the bottomView to the bottom
    alignItems: 'center',
    flexDirection: 'row',
  },
  divider: {
    width: 1,
    height: '80%',
    backgroundColor: '#3FC385',
    marginTop: 3,
    marginHorizontal: 10,
  },
  typeButton: {
    borderRadius: 5,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '49%',
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  selectedItem: {
    backgroundColor: 'blue',
    color: 'white',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10, // Add margin between image and text
  },
  categoryContainer: {},
  categoryTitle: {
    color: '#3FC385',
  }
});

export default AddScreen;