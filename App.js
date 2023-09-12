import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View, Button, TextInput, StatusBar, Image } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Fetch from './Fetch'


export default function App() {
  const [amount, setAmount] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState();
  const [converted, setConverted] = useState(0);
  const [currencyData, setCurrencyData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [currencies, setCurrencies] = useState([]);



useEffect(() => {
setCurrencies(Object.keys(currencyData));
setLoading(false)
  }, []);

  useEffect(() => {
    console.log(currencyData);
    setCurrencies(Object.keys(currencyData));
    setLoading(false)
      }, [currencyData]);
 
  const getRepositories = () => {
    fetch(`https://api.apilayer.com/exchangerates_data/latest?symbols=EUR&base=${selectedCurrency}`, 
    {
      method: 'GET',
      redirect: 'follow',
      headers: {"apikey": "36gVmYqt1foS8uTz3RgDzc4mw8uRdD1f"}
    })
    .then(response => response.json())
    .then(responseJson => setRepositories(responseJson.rates.EUR))
    .catch(error => { 
        Alert.alert('Error:', error.message); 
    });  
    setConverted(repositories * amount);
  }


  return (<View style={styles.container}>
        <Fetch setCurrencyData={setCurrencyData} />
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View style={styles.container}>
            <StatusBar hidden={true} />
          
          <Text style={{fontSize: 17, fontWeight: "bold"}}>{converted}</Text>
          <Image style={styles.tinyLogo} source={require('./euro.png')}/> 
      <TextInput 
        style={{fontSize: 18, 
          height:50, 
          width: 250, 
          borderTopWidth : 1,
          borderLeftWidth: 1,
          borderRightWidth: 2,
          borderBottomWidth : 2}} 
        keyboardType="numeric"
        placeholder='Type amount to be converted' 
        value={amount}
        onChangeText={numbers => setAmount(numbers)} 
       />
      
      <Picker 
      style={{height:40, width:150}}
        selectedValue={selectedCurrency} 
        onValueChange={(itemValue, itemIndex) => setSelectedCurrency(itemValue)}>
          {
            currencies.map(currency => <Picker.Item key={currency} label={currency} value={currency}/>)
          }
      </Picker>
      <Button title="Convert" onPress={getRepositories} />
      </View>)}
      
    </View>   
  );
}

   

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
 },
 tinyLogo: {
  width: 100,
  height: 100,
},
});