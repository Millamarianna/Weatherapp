import { StyleSheet, Text, View, Button, TextInput} from 'react-native';
import React, { useState } from 'react';

export default function App() {
  const [numberOne, setNumberOne] = useState('');
  const [numberTwo, setNumberTwo] = useState('');
  const [result, setResult] = useState('');

  const minusPressed = () => {
    setResult(parseInt(numberOne) - parseInt(numberTwo))
  }

  const plusPressed = () => {
    setResult(parseInt(numberOne) + parseInt(numberTwo))
  }


  return (
    <View style={styles.container}>

      
      <Text style={styles.text}>Result: {result}</Text>
      <TextInput style={styles.input} keyboardType="numeric" onChangeText={numberOne => setNumberOne(numberOne)} value={numberOne}/>
      <TextInput style={styles.input} keyboardType="numeric" onChangeText={numberTwo => setNumberTwo(numberTwo)} value={numberTwo}/>
      
      <View style={styles.button}>
      <Button onPress={minusPressed} title=" - " />
      <Button onPress={plusPressed} title=" + " />
      </View>

    </View>
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
    height: 40,
    width: 200,
    marginTop: 20,
    justifyContent: 'center',
    flexDirection: 'row'
  }
});
