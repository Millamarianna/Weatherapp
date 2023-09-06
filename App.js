import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Calculator from './Calculator';
import History from './History';

const Stack = createNativeStackNavigator();

export default function App() {
  

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Calculator"
          component={Calculator}
          options={{title: 'Calculator'}}
        />
        <Stack.Screen name="History" component={History} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 100
  },
  text : {
    width:200, 
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 5,
  },
  input : {
    width:200, 
    fontWeight: 'bold',
    borderColor: 'grey', 
    margin: 5,
    borderWidth: 1
  },
  button: {
    alignItems: 'center',
    margin: 20,
    gap: 10,
    justifyContent: 'center',
    flexDirection: 'row'
  }
});
