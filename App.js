import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('shopdb.db');

export default function App() {

  const [amount, setAmount] = useState('');
  const [product, setProduct] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
    tx.executeSql('create table if not exists list (id integer primary key not null, product text, amount text);');
    }, () => console.error("Error when creating DB"), updateList);
    }, []);

 const updateList = () => {
  db.transaction(tx => {
    tx.executeSql('select * from list;', [], (_, { rows }) =>
    setItems(rows._array)
    );
    }, null, null);
    
 }

 const saveItem = () => {
  db.transaction(tx => {
  tx.executeSql('insert into list (product, amount) values (?, ?);',
  [product, amount]);
  }, null, updateList)
  }

  const deleteItem = (id) => {
    db.transaction(
    tx => {tx.executeSql('delete from list where id = ?;', [id]);}, null, updateList)
    }



  return (
    <View style={styles.container}>
      <TextInput
        style={{ marginTop: 50 }}
        placeholder={'Product'}
        onChangeText={product => setProduct(product)}
        value={product} />
      <TextInput
        keyboardType='numeric'
        placeholder='Amount'
        onChangeText={amount => setAmount(amount)}
        value={amount} />
      <Button onPress={saveItem} title="Save" />
      <StatusBar style="auto" />
      <Text>Shopping list</Text>
      <FlatList
      keyExtractor={item => item.id.toString()}
        data={items}
        renderItem={({ item }) => 
        <View style={styles.listcontainer}>
        <Text>{`${item.product}, ${item.amount}`}</Text>
        <Text style={{color: '#0000ff'}} onPress={() => deleteItem(item.id)}>bought</Text>
        </View>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listcontainer: {
    flexDirection: 'row',
    flex: 2,
    gap: 10,
    padding: 2,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
});