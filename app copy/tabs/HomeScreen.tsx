import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable} from 'react-native';

const HomeScreen = () => {
  const [number, setNumber] = useState(12300000);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showFullNumber, setShowFullNumber] = useState(true);

  const toggleNumberVisibility = () => {
    setShowFullNumber(!showFullNumber);
  };

  function numberHider(number: number) {
    const numberString = number.toLocaleString();
    const maskIndex = numberString.indexOf(',')
    if (maskIndex === - 1) {
      return "***"
    } 
    const front = numberString.slice(0, maskIndex);
    const back = numberString.substring(maskIndex).replaceAll(/\d/g, "*");
    const formattedNumber = `${front}${back}`;

    return formattedNumber;
  }

  const formattedNumber = showFullNumber
    ? number.toLocaleString() // Add commas using toLocaleString()
    : numberHider(number);

  const gridItems = [
    { title: '2566' },
    { title: '2565' },
    { title: '2564' },
    { title: '2563' },
    // Add more items as needed
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}> YOUR TAX THIS YEAR </Text>
      <Text style={styles.yearText}> {currentYear} </Text>
      <View style={styles.box}>
        <Text style={styles.numberText}> {formattedNumber} </Text>
        <Pressable style={styles.button} onPress={toggleNumberVisibility}>
          <Text style={styles.text}> {showFullNumber ? "hide":"show"}</Text>
        </Pressable>
      </View>
      <View style={styles.gridContainer}>
        {gridItems.map((item, index) => (
          <Pressable key={index} style={styles.gridItem}>
            <Text style={styles.itemText}>{item.title}</Text>
          </Pressable>
        ))}
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
    width: '60%',
    alignItems: 'center',
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
  button: {
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  gridContainer: {
    width: "80%",
    paddingTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '30%',
    margin: '1%',
    padding: '3%',
    backgroundColor: 'lightblue',
    borderRadius: 10,
  },
  itemText: {
    textAlign: 'center',
  },
});

export default HomeScreen;