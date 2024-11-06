import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const TaxCalculatorScreen: React.FC = () => {
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(0);
  const [deductions, setDeductions] = useState<number>(0);
  const [donations, setDonations] = useState<number>(0);
  const [taxAmount, setTaxAmount] = useState<number | null>(null);

  const calculateTax = () => {
    // คำนวณเงินได้สุทธิ
    const netIncome = income - expenses - deductions - donations;

    // คำนวณภาษีตามวิธีที่ 1: จากเงินได้สุทธิ
    const taxFromNetIncome = calculateTaxFromNetIncome(netIncome);

    // คำนวณภาษีตามวิธีที่ 2: จากเงินได้พึงประเมิน
    const taxFromAssessableIncome = calculateTaxFromAssessableIncome(income);

    // เลือกภาษีที่สูงกว่า
    const finalTax = Math.max(taxFromNetIncome, taxFromAssessableIncome);
    setTaxAmount(finalTax);
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

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, marginTop: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 5 },
  result: { fontSize: 18, fontWeight: 'bold', color: '#2ECC71', marginTop: 20 },
});

export default TaxCalculatorScreen;
