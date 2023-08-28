import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button, TextInput} from 'react-native';
import React, { useState, useEffect } from 'react';

export default function App() {
  const [numberOne, setNumberOne] = useState('');
  const [numberTwo, setNumberTwo] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [line, setLine] = useState([]);

  const minusPressed = () => {
    setResult(parseInt(numberOne) - parseInt(numberTwo)); 
    setLine(numberOne + "-" + numberTwo + "=")

    }

  const plusPressed = () => {
    setResult(parseInt(numberOne) + parseInt(numberTwo)); 
    setLine(numberOne + "+" + numberTwo + "=")

  }

  useEffect(() => {
    setHistory([...history, {line: line + result}]); 
}, [result]);


  return (
    <View style={styles.container}>

      <Text style={styles.text}>Result: {result}</Text>

      <TextInput style={styles.input} keyboardType="numeric" onChangeText={numberOne => setNumberOne(numberOne)} value={numberOne}/>
      <TextInput style={styles.input} keyboardType="numeric" onChangeText={numberTwo => setNumberTwo(numberTwo)} value={numberTwo}/>
      
      <View style={styles.button}>
      <Button onPress={minusPressed} title=" - " />
      <Button onPress={plusPressed} title=" + " />
      </View>

      <Text style={styles.text}>History:</Text>
      <FlatList
        data={history}
        renderItem={({item}) => <Text>{item.line}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />

      <StatusBar style="auto" />
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
    margin: 20,
    gap: 10,
    justifyContent: 'center',
    flexDirection: 'row'
  }
});
