import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button, TextInput} from 'react-native';
import React, { useState } from 'react';

export default function App() {
  const [listItem, setListItem] = useState('');
  const [list, setList] = useState([]);

  const add = () => {
    setList([...list, {item: listItem}]); 
    setListItem('')
    }

  const clear = () => {
    setList([])
    setListItem('')
  }

  return (
    <View style={styles.container}>


      <TextInput style={styles.input} onChangeText={listItem => setListItem(listItem)} value={listItem}/>
      
      <View style={styles.button}>
      <Button onPress={add} title=" Add " />
      <Button onPress={clear} title=" Clear " />
      </View>

      <Text style={styles.text}>Shopping List:</Text>
      <FlatList
        data={list}
        renderItem={({item}) => <Text>{item.item}</Text>}
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
