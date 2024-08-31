import { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, Pressable } from 'react-native';
import styles from './CardStyle.js';  
import Inputstyles from './InputStyle.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Card() {
  const formatNumberWithCommas = (number) => {
    if (number == null) return "0";
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const [balance, setBalance] = useState(0);
  const [allowance, setAllowance] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  // const [amoutSave, setAmoutSave] = useState(0);
  const [userAllowanceInput, setUserAllowanceInput] = useState('');
  const [userExpensesInput, setUserExpensesInput] = useState('');



  const parsedAllowance = parseFloat(userAllowanceInput.replace(/,/g, '')) || 0;
  const parsedExpenses = parseFloat(userExpensesInput.replace(/,/g, '')) || 0;
  const handleSave = async () => {

    try {
      await AsyncStorage.setItem('allowance', JSON.stringify(parsedAllowance));
      await AsyncStorage.setItem('expenses', JSON.stringify(parsedExpenses));

      loadAllowanceAndExpenses()
      
      Alert.alert('Saved');
      setUserExpensesInput('')
      toggleDisable()
    } catch (error) {
      console.error('Error setting item:', error);
    }
  };


  const loadAllowanceAndExpenses = async () => {
    try {
      const getAllowance = await AsyncStorage.getItem('allowance');
      const getExpenses = await AsyncStorage.getItem('expenses');
  
      console.log('allowance:', getAllowance);

      //fixed
      const totalExpenses = parseInt(getExpenses) + parseInt(expenses)
      console.log('expenses:', totalExpenses);
      await AsyncStorage.setItem('expenses', JSON.stringify(totalExpenses));
  
      let allowanceValue = 0;
      let expensesValue = 0;
  
      if (getAllowance !== null) {
        allowanceValue = JSON.parse(getAllowance);
        setAllowance(allowanceValue);
      }
      
      //fixed
      if (getExpenses !== null) {
        expensesValue = JSON.parse(totalExpenses);
        setExpenses(expensesValue);
      }

      if(totalExpenses > allowance){
        Alert.alert('Expenses Alert', 'Your expenses exceed your budget.')
      }

  
      const calculatedBalance = allowanceValue - expensesValue;
      await AsyncStorage.setItem('balance', JSON.stringify(calculatedBalance));



      console.log('balance:', calculatedBalance);
      setBalance(calculatedBalance);
      // calculateBudget();
    } catch (error) {
      console.error('Error retrieving item:', error);
    }
  };
  
  const toggleDisable = () => {
    setIsDisabled(prevState => !prevState);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userAllowanceInput.length === 0) {
          const getAllowance = await AsyncStorage.getItem('allowance');
          if (getAllowance !== null) {
            setUserAllowanceInput(getAllowance);
     
          }
        }
        loadAllowanceAndExpenses();
      } catch (error) {
        console.error('Error retrieving allowance:', error);
      }
    };

    fetchData();
  }, [userAllowanceInput]);
  const displayBalance = formatNumberWithCommas(balance) + '.00';

  const handleClear = async () => {
    try {
      await AsyncStorage.clear();
      setBalance(0);
      setAllowance(0);
      setExpenses(0);
      setUserAllowanceInput('');
      setUserExpensesInput('');
      setIsDisabled(false)
      Alert.alert('Cleared');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  return (
    <>
      <View style={styles.card}>
        <View style={styles.headerContainer}>
          <Text style={styles.balanceLbl}>Available Budget</Text>
          {/* <Text style={styles.balanceLbl}>Amount Save</Text> */}
        </View>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceCurrency}>PHP <Text style={styles.balance}>{displayBalance}</Text></Text>
          {/* <Text style={styles.ExpensesCurrency}>PHP <Text style={styles.Expensesbalance}>{formatNumberWithCommas(amoutSave) + '.00'}</Text></Text> */}
        </View>
        <View style={styles.horizontalLine}></View>
        <View style={styles.headerContainer}>
          <Text style={styles.balanceLbl}>Daily/Weekly Budget</Text>
          <Text style={styles.balanceLbl}>Expenses</Text>
        </View>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceCurrency}>PHP <Text style={styles.balance}>{formatNumberWithCommas(allowance) + '.00'}</Text></Text>
          <Text style={styles.ExpensesCurrency}>PHP <Text style={styles.Expensesbalance}>{formatNumberWithCommas(expenses) + '.00'}</Text></Text>
        </View>
        {/* <Text style={styles.accountNumberLbl}>Account No. <Text style={styles.accountNumber}>012 198 3173</Text></Text> */}
      </View>

      <View style={Inputstyles.inputContainer}>
        <View style={Inputstyles.dailyAllowanceContainer}>
          <Text style={Inputstyles.textLabel}>Daily/Weekly Budget</Text>
          <TextInput 
            style={{ padding: 16, backgroundColor: '#f5f5f5', marginBottom: 10 }}
            placeholder='Enter your allowance'
            value={userAllowanceInput}
            onChangeText={setUserAllowanceInput}
            keyboardType="numeric"
            editable={!isDisabled}
          />
          <Text style={Inputstyles.textLabel}>Daily Expenses</Text>
          <TextInput 
            style={{ padding: 16, backgroundColor: '#f5f5f5', marginBottom: 10 }}
            placeholder='Enter your expenses'
            value={userExpensesInput}
            onChangeText={setUserExpensesInput}
            keyboardType="numeric"
          />
           <Text style={Inputstyles.textLabel}>
            Expenses details <Text style={Inputstyles.optional}>(Optional) </Text>
          </Text>
          <TextInput 
            style={{ padding: 16, backgroundColor: '#f5f5f5', marginBottom: 10 }}
            placeholder='Expenses details'
            value={userExpensesInput}
            onChangeText={setUserExpensesInput}

          />
          <View>
            <Pressable onPress={handleSave} style={Inputstyles.saveBtn}>
              <Text style={Inputstyles.text}>Save</Text>
            </Pressable>       
            <Pressable style={Inputstyles.clearBtn} onPress={handleClear}>
              <Text style={Inputstyles.text}>Clear</Text>
            </Pressable>  
          </View>
        </View>
      </View>
    </>
  );
}