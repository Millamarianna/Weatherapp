import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Alert, Text, View, TextInput, Button, FlatList, Keyboard } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue, remove } from 'firebase/database';
import firebaseConfig from './firebaseConfig';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Weather from './components/Weather';
import * as React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import MenuItems from './constants/DrawerItems';

const Drawer = createDrawerNavigator();

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function App() {

  const [weatherLoading, setWeatherLoading] = useState(true);
  const [temperature, setTemperature] = useState('');
  const [weather, setWeather] = useState('');
  const [icon, setIcon] = useState('');
  const [city, setCity] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [amount, setAmount] = useState('');
  const [product, setProduct] = useState('');
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const itemsRef = ref(database, '/items');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      const products = data ? Object.keys(data).map(key => ({ key, ...data[key] })) : [];
      console.log(products)
      setItems(products);
    })
  }, []);

  const saveItem = () => {
    push(
      ref(database, 'items/'),
      { 'product': product, 'amount': amount });
    setProduct('');
    setAmount('');
    Keyboard.dismiss();
  }


  const deleteItem = (key) => {
    const itemRef = ref(database, `items/${key}`);
    remove(itemRef)
      .then(() => {
        console.log("poisto onnistui")
      })
      .catch((error) => {
        console.error("Error removing item:", error.message)
      })

  }

  return (
    <View style={styles.container}>
      
      <Weather city={city} setCity={setCity} temperature={temperature} setTemperature={setTemperature} weather={weather} setWeather={setWeather} icon={icon} setIcon={setIcon} weatherLoading={weatherLoading} setWeatherLoading={setWeatherLoading} />

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
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={items}
        renderItem={({ item }) =>
          <View style={styles.listcontainer}>
            <Text>{`${item.product}, ${item.amount}`}</Text>
            <Text style={{ color: '#0000ff' }} onPress={() => deleteItem(item.key)}>bought</Text>
          </View>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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