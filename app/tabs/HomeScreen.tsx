import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Button} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SwitchSelector from 'react-native-switch-selector';


const HomeScreen = () => {
  const [number, setNumber] = useState(123456);
  const [tax, setTax] = useState(123456)
  const [deduction, setDeduction] = useState(1000);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showFullNumber, setShowFullNumber] = useState(true);
  const [showDeduction, setShowDeduction] = useState(true);
  const [showFullTax, setShowFullTax] = useState(false);
  const [showForm, setForm] = useState(false);

  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(0);
  const [deductions, setDeductions] = useState<number>(0);
  const [donations, setDonations] = useState<number>(0);
  const [taxAmount, setTaxAmount] = useState<number | null>(null);

  const toggleNumberVisibility = () => {
    setShowFullNumber(!showFullNumber);
  };

  const toggleDeductionVisibility = () => {
    setShowDeduction(!showDeduction);
  };

  const toggleForm = () => {
    console.log('toggle')
    setForm(!showForm);
    console.log('return', tax);
    setNumber(tax - deduction);
  }

  const toggleTaxDisplay = (value: any) => {
    if (value) {
      setNumber(tax);
    } else {
      setNumber(tax - deduction);
    }
    setShowFullTax(!showFullTax);
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

  const formattedNumber = (show, num) => {
    return (show ? num.toLocaleString() : numberHider(num));
  }

  const calculateTax = () => {
    // คำนวณเงินได้สุทธิ
    const netIncome = income - expenses - deductions - donations;

    // คำนวณภาษีตามวิธีที่ 1: จากเงินได้สุทธิ
    const taxFromNetIncome = calculateTaxFromNetIncome(netIncome);

    // คำนวณภาษีตามวิธีที่ 2: จากเงินได้พึงประเมิน
    const taxFromAssessableIncome = calculateTaxFromAssessableIncome(income);

    // เลือกภาษีที่สูงกว่า
    // const finalTax = Math.max(taxFromNetIncome, taxFromAssessableIncome);
    const finalTax = taxFromNetIncome;
    const full = calculateTaxFromNetIncome(income);
    console.log(finalTax)
    console.log(full)
    setTaxAmount(finalTax);
    setTax(full)
    setDeduction(full-finalTax)
    console.log('show', tax)
    setNumber(tax - deduction);
  };

  // ฟังก์ชันคำนวณภาษีตามวิธีที่ 1 จากเงินได้สุทธิ
  const calculateTaxFromNetIncome = (netIncome: number): number => {
    if (netIncome <= 150000) return 0;
    else if (netIncome <= 300000) return (netIncome - 150000) * 0.05;
    else if (netIncome <= 500000) return (netIncome - 300000) * 0.10 + 7500;
    else if (netIncome <= 750000) return (netIncome - 500000) * 0.15 + 27500;
    else if (netIncome <= 1000000) return (netIncome - 750000) * 0.20 + 65000;
    else if (netIncome <= 2000000) return (netIncome - 1000000) * 0.25 + 115000;
    else if (netIncome <= 5000000) return (netIncome - 2000000) * 0.30 + 365000;
    else return (netIncome - 5000000) * 0.35 + 1265000;
  };

  // ฟังก์ชันคำนวณภาษีตามวิธีที่ 2 จากเงินได้พึงประเมิน
  const calculateTaxFromAssessableIncome = (income: number): number => {
    return income * 0.005;
  };

  const gridItems = [
    { title: '2567' },
    { title: '2566' },
    { title: '2565' },
    { title: '2564' },
    { title: '2563' },
    // Add more items as needed
  ];

  return (
    <View style={styles.container}>
      {showForm ?
      (
        <>
        <Text style={styles.label}>เงินได้พึงประเมิน (ม.ค. - มิ.ย. 2565):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="เช่น 500000"
          onChangeText={(value) => setIncome(parseFloat(value) || 0)}
        />
        <Text style={styles.label}>ค่าใช้จ่าย:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="เช่น 100000"
          onChangeText={(value) => setExpenses(parseFloat(value) || 0)}
        />
        <Text style={styles.label}>ค่าลดหย่อน:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="เช่น 50000"
          onChangeText={(value) => setDeductions(parseFloat(value) || 0)}
        />
        <Text style={styles.label}>เงินบริจาค:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="เช่น 2000"
          onChangeText={(value) => setDonations(parseFloat(value) || 0)}
        />
        <Button title="คำนวณภาษี" onPress={calculateTax} />
        {taxAmount !== null && (
          <Text style={styles.result}>ภาษีที่ต้องจ่าย: {taxAmount.toFixed(2)} บาท</Text>
        )}
        <Pressable style={{width: '50%', height: 30, backgroundColor: 'lightgray', alignItems: 'center', justifyContent: 'center', marginTop: 10}} onPress={toggleForm}>
          <Text> return </Text>
        </Pressable>
        </>
      ):(
        <>
        <Text style={styles.header}>ภาษีของคุณในปีนี้</Text>
        <Text style={styles.yearText}> {currentYear + 543} </Text>
        <SwitchSelector style={{width: 200}}
          options={[{ label: "deducted tax", value: false }, { label: "full tax", value: true }]}
          initial={0}
          textColor={'lightgray'}
          selectedColor={'black'}
          buttonColor={'#98E6AE'}
          hasPadding={true}
          borderColor={'#98E6AE'}
          fontSize={10}
          valuePadding={2}
          height={25}
          onPress={(value) => toggleTaxDisplay(value)}
        />
        <View style={{ alignItems: 'center'}}>
          <Text style={[styles.numberText, {fontSize: 64}]}> {formattedNumber(showFullNumber, number)} </Text>
          <Pressable onPress={toggleNumberVisibility}>
            <Ionicons name={showFullNumber ? "eye-outline": "eye-off-outline"} size={24} color="lightgray" />
          </Pressable>
        </View>
        <View style={{height: 50, width: '100%'}}>
          <Pressable onPress={toggleForm}><View style={{height: 40, width: '100%'}}/></Pressable>
        </View>
        <View style={styles.box}>
          <View>
            <Text style={[{fontSize: 14, fontFamily: 'Kanit', fontWeight: 'regular'}]}>คุณลดหย่อนภาษีไป</Text>
            <Text style={[{fontSize: 12, color: '#3FC385', fontFamily: 'Kanit', fontWeight: 'light', marginBottom: -5}]}>ดูเอกสาร</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.numberText}> {formattedNumber(showDeduction, deduction)} </Text>
            <Pressable onPress={toggleDeductionVisibility}>
              <Ionicons name={showDeduction ? "eye-outline": "eye-off-outline"} size={24} color="lightgray" />
            </Pressable>
          </View>
        </View>
        <View style={styles.gridContainer}>
          {gridItems.map((item, index) => (
            <Pressable key={index} style={styles.gridItem}>
              <Text style={styles.itemText}>{item.title}</Text>
            </Pressable>
          ))}
        </View>
        <View style={{flex: 1}}></View>
        <Pressable style={{width: '70%', height: 30}} onPress={() => console.log('show conditions')}>
          <View style={{backgroundColor: 'black', borderRadius: 5, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}><Text style={{fontSize: 10, color: 'white', fontFamily: 'Kanit'}}>ดูกฎระเบียบการเสียภาษีและการลดหย่อนภาษี</Text></View>
        </Pressable>
        </>
      )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginTop: 100,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8ffd9',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 5,
  },
  numberText: {
    fontSize: 28,
    fontWeight: 'medium',
    fontFamily: 'Kanit',
  },
  header: {
    fontSize: 24,
    fontWeight: 'medium',
    fontFamily: 'Kanit',
  },
  yearText: {
    color: '#F20091',
    fontSize: 18,
    fontWeight: 'regular',
    paddingBottom: 20,
    fontFamily: 'Kanit',
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
    justifyContent: 'flex-start',
  },
  gridItem: {
    width: '31%',
    margin: '1%',
    padding: '3%',
    backgroundColor: 'white',
    shadowColor: 'gray',
    shadowRadius: 1,
    shadowOpacity: 10,
    borderRadius: 5,
  },
  itemText: {
    textAlign: 'center',
  },
  label: { fontSize: 16, marginTop: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 5 },
  result: { fontSize: 18, fontWeight: 'bold', color: '#2ECC71', marginTop: 20 },
});

export default HomeScreen;
