import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Get route and safely destructure params with fallback
  const route = useRoute();
  const { taxAmount = 0 } = route.params || {}; // Fallback to 0 if taxAmount is undefined

  return (
    <View style={styles.container}>
      <Text style={styles.header}>YOUR TAX THIS YEAR</Text>
      <Text style={styles.yearText}>{currentYear}</Text>
      <View style={styles.box}>
        <Text style={styles.numberText}>{taxAmount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: 'lightblue',
    padding: 20,
    borderRadius: 10,
  },
  numberText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
  },
  yearText: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    paddingBottom: 20,
  },
});

export default HomeScreen;
