// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import { useNavigation } from 'expo-router';

// const TaxCalculatorScreen: React.FC = () => {
//   const [income, setIncome] = useState<number>(0);
//   const [expenses, setExpenses] = useState<number>(0);
//   const [deductions, setDeductions] = useState<number>(0);
//   const [donations, setDonations] = useState<number>(0);
//   const [taxAmount, setTaxAmount] = useState<number | null>(null);

//   // Declare the navigation hook at the top level
//   const navigation = useNavigation();

//   const calculateTax = () => {
//     // Calculate net income
//     const netIncome = income - expenses - deductions - donations;

//     // Calculate tax method 1: based on net income
//     const taxFromNetIncome = calculateTaxFromNetIncome(netIncome);

//     // Calculate tax method 2: based on assessable income
//     const taxFromAssessableIncome = calculateTaxFromAssessableIncome(income);

//     // Choose the higher tax
//     const finalTax = Math.max(taxFromNetIncome, taxFromAssessableIncome);
//     setTaxAmount(finalTax);

//     // // Navigate to ScreenB with the taxAmount parameter
//     // (navigation as any).navigate('HomeScreen', {
//     //   taxAmount: finalTax,
//     // });
//   };
//   // ฟังก์ชันคำนวณภาษีตามวิธีที่ 1 จากเงินได้สุทธิ
//   const calculateTaxFromNetIncome = (netIncome: number): number => {
//     if (netIncome <= 150000) return 0;
//     else if (netIncome <= 300000) return (netIncome - 150000) * 0.05;
//     else if (netIncome <= 500000) return (netIncome - 300000) * 0.10 + 7500;
//     else if (netIncome <= 750000) return (netIncome - 500000) * 0.15 + 27500;
//     else if (netIncome <= 1000000) return (netIncome - 750000) * 0.20 + 65000;
//     else if (netIncome <= 2000000) return (netIncome - 1000000) * 0.25 + 115000;
//     else if (netIncome <= 5000000) return (netIncome - 2000000) * 0.30 + 365000;
//     else return (netIncome - 5000000) * 0.35 + 1265000;
//   };

//   // ฟังก์ชันคำนวณภาษีตามวิธีที่ 2 จากเงินได้พึงประเมิน
//   const calculateTaxFromAssessableIncome = (income: number): number => {
//     return income * 0.005;
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>เงินได้พึงประเมิน (ม.ค. - มิ.ย. 2565):</Text>
//       <TextInput
//         style={styles.input}
//         keyboardType="numeric"
//         placeholder="เช่น 500000"
//         onChangeText={(value) => setIncome(parseFloat(value) || 0)}
//       />
//       <Text style={styles.label}>ค่าใช้จ่าย:</Text>
//       <TextInput
//         style={styles.input}
//         keyboardType="numeric"
//         placeholder="เช่น 100000"
//         onChangeText={(value) => setExpenses(parseFloat(value) || 0)}
//       />
//       <Text style={styles.label}>ค่าลดหย่อน:</Text>
//       <TextInput
//         style={styles.input}
//         keyboardType="numeric"
//         placeholder="เช่น 50000"
//         onChangeText={(value) => setDeductions(parseFloat(value) || 0)}
//       />
//       <Text style={styles.label}>เงินบริจาค:</Text>
//       <TextInput
//         style={styles.input}
//         keyboardType="numeric"
//         placeholder="เช่น 2000"
//         onChangeText={(value) => setDonations(parseFloat(value) || 0)}
//       />
//       <Button title="คำนวณภาษี" onPress={calculateTax} />
//       <div
//       style={{flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginBottom: 20}} 
//       >

//       </div>
//       <Button title="บันทึกภาษีปีนี้" onPress={() => (navigation as any).navigate('HomeScreen',{
//         taxAmount: taxAmount
//       })} />
//       {taxAmount !== null && (
//         <Text style={styles.result}>ภาษีที่ต้องจ่าย: {taxAmount.toFixed(2)} บาท</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flexGrow: 1, padding: 20, backgroundColor: '#F5F5F5' },
//   header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 20, color: '#34495E' },
//   label: { fontSize: 16, marginTop: 20, color: '#34495E' },
//   input: { borderWidth: 1, padding: 10, marginVertical: 5, borderRadius: 5, borderColor: '#BDC3C7' },
//   buttonContainer: { marginTop: 20, borderRadius: 5, overflow: 'hidden' },
//   result: { fontSize: 18, fontWeight: 'bold', color: '#2ECC71', marginTop: 20, textAlign: 'center' },
// });

// export default TaxCalculatorScreen;
