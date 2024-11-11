import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, Image, TouchableOpacity, Pressable, Linking } from 'react-native';
import { Link, useNavigation } from '@react-navigation/native';
// import RNDropDownPicker from 'react-native-dropdown-picker';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ModalDropdown from 'react-native-modal-dropdown';



const ActionButton = ({ onPress, iconName, title }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Ionicons name={iconName} size={30} color="#fff" style={styles.icon} />
      <Text style={[styles.buttonText, {fontFamily: 'Kanit'}]}>{title}</Text>
    </Pressable>
  );
};
const TaxScreen = () => {


  const [open, setOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState('2567');
  const [imageUrl, setImageUrl] = useState('https://static.vecteezy.com/system/resources/previews/011/063/921/non_2x/example-button-speech-bubble-example-colorful-web-banner-illustration-vector.jpg'); // Default image

  const imageData = [
    { label: '2022', value: 2022, imageUrl: 'https://img.freepik.com/premium-vector/calendar-2022_573652-980.jpg' },
    { label: '2023', value: 2023, imageUrl: 'https://i.pinimg.com/originals/bc/6d/8d/bc6d8da7e48422e848804559eed1186e.jpg' },
  ];

  const handleYearChange = (item) => {
    setSelectedYear(item.value);
    const selectedImage = imageData.find(image => image.value === item.value);
    if (selectedImage) {
      setImageUrl(selectedImage.imageUrl);
    }
  };

  const [fileOption] = useState({
    actions: {
      info: 'แนะนำ',
      view: 'เปิดดู',
      save: 'บันทึก',
      share: 'แชร์',
    },
  });

  const yearOption = [
    '2567',
    '2566',
    '2565',
    '2564',
    '2563',
  ];


  useEffect(() => {
    const selectedImage = imageData.find(image => image.value === selectedYear);
    if (selectedImage) {
      setImageUrl(selectedImage.imageUrl);
    }
  }, [selectedYear]);

  return (
    <View style={styles.container}>
      <View style={styles.pdfContainer}>
      <Image source={{ uri: `../../assets/yearpic/${selectedYear}.png` }} style={styles.pdfPicture} />
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <ModalDropdown
          defaultIndex={0}
          defaultValue={selectedYear}
          style={{ padding: 10, alignItems: 'center', justifyContent: 'center'}}
          dropdownStyle={{marginLeft: -5, alignItems: 'center', justifyContent: 'center'}}
          textStyle={{ color: '#F20091', fontSize: 16, fontFamily: 'Kanit'}}
          showsVerticalScrollIndicator={false}
          options={yearOption}
          onSelect={(index, value) => {
            console.log(index)
            console.log(value)
            setSelectedYear(value);
            console.log(selectedYear)
          }}
        />
        <Ionicons name={'chevron-down'} />
      </View>
      
        {/* <RNDropDownPicker
          open={open}
          value={selectedYear}
          items={imageData}
          onChangeItem={handleYearChange}
          setOpen={setOpen}
          setValue={setSelectedYear}
          placeholder="Select an item"
          containerStyle={{ width: 100 }}
          style={{ backgroundColor: 'transparent' }} // Transparent background
          textStyle={{ color: '#F20091' }} // Text color
          /> */}
        <View style={styles.actionButtonContainer}>
            {/* <Pressable style={styles.actionButton}>
              <Ionicons name='paper-plane-outline'/>
              <Text> แนะนำ</Text>
            </Pressable> */}
            <ActionButton
            onPress={() => {
              router.replace('/chat');
            }}
            iconName="information-circle-outline"
            title="แนะนำ"
          />
          <ActionButton
            onPress={() => {}}
            iconName="eye-outline"
            title="เปิดดู"
          />
          <ActionButton
            onPress={() => {}}
            iconName="save-outline"
            title="บันทึก"
          />
          <ActionButton
            onPress={() => {}}
            iconName="paper-plane-outline"
            title="แชร์"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  pdfContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  pdfPicture: {
    flex: 1,
    width: '100%',
    aspectRatio: 1,
    // height: 700,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  actionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    flexDirection: 'column',
    width: 70,
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  icon: {
    color: '#000',
    marginBottom: 8, // Space between icon and text
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
});

export default TaxScreen;