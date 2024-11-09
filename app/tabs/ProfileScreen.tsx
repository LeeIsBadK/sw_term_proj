import React from 'react';
import { View, Image } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require('../../assets/images/icon.png')} style={{ width: 200, height: 200 }} />
    </View>
  );
};

export default ProfileScreen;