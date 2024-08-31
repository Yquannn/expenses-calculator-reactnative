import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Card from './Card.js';
import NavBar from './NavBar.js'
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";



export default function App() {

  return (
    <>
       <NavBar/>
    </>

  );
}

export const AppNavigator = () => {
  <Stack.Navigator>
      <Stack.Screen name='Feed' component={HomeScreen}/>
  </Stack.Navigator>

}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#e5e5e5",
      justifyContent: "center", 
      alignItems: "center"
    },
});
