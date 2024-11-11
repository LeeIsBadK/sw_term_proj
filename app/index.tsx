import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // For this example, we'll directly navigate to the Home screen
    // In a real-world scenario, you'd likely have authentication logic here
    navigation.navigate('tabs');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/taxpen.png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="ชื่อผู้ใช้"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="รหัสผ่าน"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.text}>{"เข้าสู่ระบบ"}</Text>
      </Pressable>
    </View>
  );
};

LoginScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    fontFamily: 'Kanit',
    fontWeight: 'light',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  loginButton: {
    width: '80%',
    backgroundColor: '#3FC385',
    padding: 10,
    borderRadius: 5,
  },
  button: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Kanit',
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'white',
  },
  // ... other styles
});

export default LoginScreen;
