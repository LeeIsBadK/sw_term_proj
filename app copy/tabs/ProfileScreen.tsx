import React, { useState } from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  const [userData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    nationalID: '1234567890',
    address: '123 Main Street, Anytown, CA 12345',
  });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.userInfo}>
          <Text style={styles.userInfoText}>First Name: {userData.firstName}</Text>
          <Text style={styles.userInfoText}>Last Name: {userData.lastName}</Text>
          <Text style={styles.userInfoText}>National ID: {userData.nationalID}</Text>
          <Text style={styles.userInfoText}>Address: {userData.address}</Text>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Settings" />
        <Button title="Sign Out" />
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
});

export default ProfileScreen;