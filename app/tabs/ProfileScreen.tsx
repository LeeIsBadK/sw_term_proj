import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


const ProfileScreen = () => {
  const [userData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    nationalID: '1234567890',
    address: '123 Main Street, Anytown, CA 12345',
  });

  const navigation = useNavigation();


  return (
    <View style={styles.container}>
      <View style={{marginTop: 50, height: 150, width: '100%', alignItems: 'center', justifyContent: 'centers'}}>
        <Image source={require('../../assets/images/taxpen.png')} style={{height: 100, width: 100}} />
      </View>
      <ScrollView style={styles.scrollView}>
      
        <View style={styles.userInfo}>
          <View style={styles.separator} />
          <Text style={styles.label}>First Name:</Text>
          <Text style={styles.value}>{userData.firstName}</Text>

          <Text style={styles.label}>Last Name:</Text>
          <Text style={styles.value}>{userData.lastName}</Text>
          <View style={styles.separator} />
          <Text style={styles.label}>National ID:</Text>
          <Text style={styles.value}>{userData.nationalID}</Text>
          <View style={styles.separator} />
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>{userData.address}</Text>
        </View>
      </ScrollView>
      
      <View style={styles.imageButtons}>
          <Pressable style={styles.pickerButton} onPress={() => {}}>
            <Ionicons name="settings-outline" size={24} color="black" />
            <Text style={[styles.font, {marginLeft: 10}]}>ตั้งค่า</Text>
          </Pressable>
          <View style={styles.divider} />
          <Pressable style={styles.pickerButton} onPress={() => {navigation.navigate('index')}}>
            <Ionicons name="exit-outline" size={24} color="black" />
            <Text style={[styles.font, {marginLeft: 10}]}>ออกจากระบบ</Text>
          </Pressable>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollView: {
    flex: 1,
  },
  userInfo: {
    marginBottom: 20,
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    marginBottom: 10,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: '#3FC385',
    marginVertical: 10,
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
  font: {
    fontFamily: 'Kanit'
  },
});

export default ProfileScreen;