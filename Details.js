import { View, Text, TextInput, Alert, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default function Details() {
  const fetchData = async () => {
    try {
      const getAllowance = await AsyncStorage.getItem('allowance');
      const getExpenses = await AsyncStorage.getItem('expenses');
      const getBalance = await AsyncStorage.getItem('balance');

      console.log('allowance: ', getAllowance);
      console.log('expenses: ', getExpenses);
      console.log('balance: ', getBalance);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Pressable onPress={fetchData} style={{ padding: 10, backgroundColor: 'lightblue' }}>
        <Text>Press</Text>
      </Pressable>
    </View>
  );
}
