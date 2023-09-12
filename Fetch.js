import React, { useEffect } from 'react';
import { Alert, Text } from 'react-native';

export default function Fetch({setCurrencyData}) {

useEffect(() => {
  fetch(`https://api.apilayer.com/exchangerates_data/symbols`, 
  {
    method: 'GET',
    redirect: 'follow',
    headers: {"apikey": "36gVmYqt1foS8uTz3RgDzc4mw8uRdD1f"}
  })
  .then(response => response.json())
  .then(result => setCurrencyData(result.symbols))
  .catch(error => { 
      Alert.alert('Error:', error.message); 
  });
  }, []);


  return (<Text style={{fontSize: 16, fontWeight: "bold"}}>Currency converter</Text>)};