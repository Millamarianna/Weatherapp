import { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Alert, Text, View, Image, TextInput, Button, FlatList, Keyboard } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue, remove } from 'firebase/database';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

import firebaseConfig from '../firebaseConfig';
import Images from './Images';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function Clothes({ todaysWeather }) {

  const [items, setItems] = useState([]);

  //hae kaikki tallennetut vaatteet items listaan id-keyn kanssa
  useEffect(() => {
    const itemsRef = ref(database, '/items');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      const all = data ? Object.keys(data).map(key => ({ key, ...data[key] })) : [];
      console.log(all)
      setItems(all);
    })
  }, []);

  //selvitä "sääkoodi"
  const tempCode = () => {
    if (todaysWeather >= 22) {
      return 'A'
    }
    else if (todaysWeather < 22 && todaysWeather >= 15) {
      return 'B'
    }
    else if (todaysWeather < 15 && todaysWeather >= 7) {
      return 'C'
    }
    else if (todaysWeather < 7 && todaysWeather >= 0) {
      return 'D'
    }
    else if (todaysWeather < 0 && todaysWeather >= -10) {
      return 'E'
    }
    else {
      return 'F'
    }
  }

  //filtteröi säähän sopivat vaatteet
  const filterList = items.filter((item) => 
    item.weatherId.includes(tempCode())).map(({key, name, photo, weatherId}) => ({key, name, photo, weatherId}));
  

  return (
    <View style={styles.bodyContainer}>
      <Text style={styles.title}>Säähän sopivat vaatteet:</Text>
      <FlatList
       contentContainerStyle={{alignSelf: 'flex-start'}}
       numColumns={4}
       showsVerticalScrollIndicator={false}
       showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={filterList}
        renderItem={({ item }) =>
            <Image
              style={{ width: 80, resizeMode: 'contain' }}
              source={Images[item.photo]}
            />
          }
      />

    </View>
  );
}

const styles = StyleSheet.create({

  bodyContainer: {
    top: 30,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 40
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff'
  },
  subtitle: {
    fontSize: 24,
    color: '#fff'
  }
});