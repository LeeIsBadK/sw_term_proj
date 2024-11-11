import React, { useState } from 'react';
import {ScrollView, View, Text, Image, Pressable, StyleSheet, Picker, Modal } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { Ionicons } from '@expo/vector-icons';

const DocScreen = () => {
  const [selectedYear, setSelectedYear] = useState('2567');
  const [selectedType, setSelectedType] = useState('ทั่งหมด');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Newest');

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleSortChange = (sortOption) => {
    setSelectedSort(sortOption);
    // Apply sorting logic to your data
  };

  const gridItems = [
    {
      id: 1,
      image: require('../../assets/images/icon.png'),
      name: 'เอกสาร 1',
      type: 'รายได้หลัก',
      year: '2567',
    },
    {
      id: 2,
      image: require('../../assets/images/icon.png'),
      name: 'เอกสาร 2',
      type: 'ค่าตอบแทนเป็นครั้งคราว',
      year: '2567',
    },
    {
      id: 3,
      image: require('../../assets/images/icon.png'),
      name: 'เอกสาร 3',
      type: 'ค่าตอบแทนเป็นครั้งคราว',
      year: '2567',
    },
    {
      id: 4,
      image: require('../../assets/images/icon.png'),
      name: 'เอกสาร 4',
      type: 'ค่าตอบแทนเป็นครั้งคราว',
      year: '2567',
    },
    {
      id: 5,
      image: require('../../assets/images/icon.png'),
      name: 'Item 5',
      type: 'การซื้อของตามระเบียบรัฐบาลเพื่อลดหย่อนภาษี',
      year: '2567',
    },
    {
      id: 6,
      image: require('../../assets/images/icon.png'),
      name: 'เอกสาร 6',
      type: 'การบริจาคตามโรงพยาบาลและโรงเรียน',
      year: '2567',
    },
    {
      id: 7,
      image: require('../../assets/images/icon.png'),
      name: 'เอกสาร 7',
      type: 'การได้รางวัล',
      year: '2567',
    },
    {
      id: 8,
      image: require('../../assets/images/icon.png'),
      name: 'เอกสาร 8',
      type: 'การดูแลบิดามารดาหรือบุตร',
      year: '2567',
    },
    {
      id: 9,
      image: require('../../assets/images/icon.png'),
      name: 'เอกสาร 9',
      type: 'การดูแลบิดามารดาหรือบุตร',
      year: '2567',
    },
    {
      id: 10,
      image: require('../../assets/images/icon.png'),
      name: 'เอกสาร 10',
      type: 'ประวัติของผู้เสียภาษี',
      year: '2566',
    },
    {
      id: 11,
      image: require('../../assets/images/icon.png'),
      name: 'เอกสาร 11',
      type: 'ประวัติของผู้เสียภาษี',
      year: '2565',
    },
    // Add more items as needed
  ];

  const filteredItems = gridItems.filter(item => {
    if (selectedType === 'ทั่งหมด') {
      return item.year === selectedYear;
    } else {
      return item.type === selectedType && item.year === selectedYear;
    }
  });

  const typeOptions = [
    'ทั่งหมด',
    'ประวัติของผู้เสียภาษี',
    'รายได้หลัก',
    'ค่าตอบแทนเป็นครั้งคราว',
    'การได้รางวัล',
    'ค่าวิชาชีพ',
    'ดอกเบี้ยธนาคารและการลงทุนต่าง ๆ',
    'การซื้อของตามระเบียบรัฐบาลเพื่อลดหย่อนภาษี',
    'การบริจาคตามโรงพยาบาลและโรงเรียน',
    'การบริจาคมูลนิธิต่าง ๆ และวัดหรือสถานสงเคราะห์',
    'การลงทุนที่สามารถนำไปหักภาษีได้',
    'การดูแลบิดามารดาหรือบุตร',
  ]

  const FilterModal = ({ visible, onClose, onSortChange }) => {
    const [selectedSort, setSelectedSort] = useState('Newest');
  
    return (
      <Modal
        visible={visible}
        transparent={true}
        onRequestClose={onClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>  
  
            <Picker
              selectedValue={selectedSort}
              onValueChange={(itemValue) => {
                setSelectedSort(itemValue);
                onSortChange(itemValue);
                onClose;
              }}
            >
              <Picker.Item label="Newest" value="Newest" />
              <Picker.Item label="Oldest" value="Oldest" />
            </Picker>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <Text>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };

  const YearPicker = () => {
    return (
      <Picker
          selectedValue={selectedYear}
          onValueChange={(itemValue) => setSelectedYear(itemValue)}
        >
          <Picker.Item label="2567" value="2567" />
          <Picker.Item label="2566" value="2566" />
          <Picker.Item label="2565" value="2565" />
          <Picker.Item label="2564" value="2564" />
          <Picker.Item label="2563" value="2563" />
        </Picker>
    );
  };

  const TypePicker = () => {
    return (
      <View style={styles.typePicker}>
        <Text style={{fontFamily: 'Kanit'}}> ประเภท </Text>
        <ModalDropdown
            defaultIndex={0}
            defaultValue={selectedType}
            style={{ width: '70%', marginLeft: 5,}}
            textStyle={styles.truncatedText}
            options={typeOptions}
            onSelect={(index, value) => {
              console.log(index)
              console.log(value)
              setSelectedType(value);
            }}
          />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.dropdownContainer}>
          <YearPicker/>
          <TypePicker/>
        </View>

        <Pressable style={styles.filterButton} onPress={() => {}}>
          <Text style={{fontFamily: 'Kanit'}}>Filter/Sort</Text>
        </Pressable>
      </View>
      <FilterModal
        visible={isModalVisible}
        onClose={toggleModal}
        onSortChange={handleSortChange}
      />
      <ScrollView style={styles.scrollView}>
      <View style={styles.gridContainer}>
        {filteredItems.map((item) => (
          <View key={item.id} style={styles.gridItem}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.textAndButtonContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={{ width: 'auto'}}><Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemType}>{item.type}</Text></View>
              </View>
              <Pressable style={styles.editButton}>
                <Ionicons name={'create-outline'} size={25} color={'gray'}/>
                {/* <Text>Edit</Text> */}
              </Pressable>
            </View>
          </View> 
        ))}
    </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gridContainer: {
    backgroundColor: '#F3F3F3',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
  gridItem: {
    width: '48%',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    maxWidth: '100%',
    maxHeight: 150,
    aspectRatio: 1/1,
  },
  textAndButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  // itemLabel: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between', // Space between text and button
  //   alignItems: 'center',
  //   width: '100%', // Ensure the container fills the grid item width
  // },
  textContainer: {
    width: '70%',
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'Kanit',
    fontWeight: 'bold',
    marginTop: 4,
  },
  itemType: {
    fontSize: 10,
    fontFamily: 'Kanit',
    color: 'gray', 
  },
  editButton: {
    padding: 5,
    borderRadius: 5,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
  },
  picker: {
    flex: 1,
  },
  filterButton: {
    backgroundColor: 'lightgreen',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor:  
 'white',
    padding: 20,
    borderRadius: 10,
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  dropdownContainer: {
    marginRight: 10,
    flex: 1,
    flexDirection: 'column',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  typePicker: {
    width: '100%',
    flexDirection: 'row',
  },
  truncatedText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Kanit',
    color: '#3FC385',
    overflow: 'hidden',
    textOverflow: 'ellipsis', 
  },
});

export default DocScreen;