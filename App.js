import { StyleSheet, Text, View, FlatList, Button, TextInput, Alert} from 'react-native';
import React, { useState, useEffect } from 'react';

export default function App() {
  const [number, setNumber] = useState('');
  const [guessed, setGuessed] = useState(false);
  const [random, setRandom] = useState('');
  const [times, setTimes] = useState(0);
  var message = ""

  useEffect( () => {
    setRandom(Math.floor(Math.random() * 100) + 1)
  }, []);

  console.log(random)

  const pressed = () => {
    setGuessed(true)
    setTimes(times+1)
    }

    const checkNumber = () => {
      return(
        <Text style={styles.text}>{parseInt(number)===random ? (correct()) : wrongGuess()}</Text>
      )
    }

    const wrongGuess = () => {
      return(
        <Text style={styles.text}>{parseInt(number)>random ? <Text>Your guess {number} is too high</Text> : <Text>Your guess {number} is too low</Text>}</Text>
      )
    }

    const correct = () => {
      
      times.toString
      message = "You guessed the number in " + times + " guesses"
      Alert.alert('Correct!', message, [{text: 'OK', onPress: () => console.log('OK Pressed')}])
  
  };

  return (
    <View style={styles.container}>

      <Text style={styles.text}>{guessed===false ? <Text>Guess a number between 1-100</Text> : checkNumber()}</Text>

      <TextInput style={styles.input} keyboardType="numeric" onChangeText={(number) => {setNumber(number); setGuessed(false)}}/>
      
      <View style={styles.button}>
      <Button onPress={pressed} title=" MAKE GUESS " />
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
    margin: 20,
    gap: 10,
    justifyContent: 'center',
    flexDirection: 'row'
  }
});
