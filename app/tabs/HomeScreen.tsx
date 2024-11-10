import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
  const [number, setNumber] = useState(0);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  return (
    <View style={styles.container}>
      <Text style={styles.header}> YOUR TAX THIS YEAR </Text>
      <Text style={styles.yearText}> {currentYear} </Text>
      <View style={styles.box}>
        <Text style={styles.numberText}> {number} </Text>
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