import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, FlatList, Keyboard } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue, remove } from 'firebase/database';
import firebaseConfig from '../firebaseConfig';
import { FIREBASE_AUTH } from '../firebaseConfig';
import { User, onAuthStateChanged } from 'firebase/auth';
import Images from '../components/Images';
import WeatherCodes from '../constants/WeatherCodes';


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function SavedScreen() {
  const [photo, setPhoto] = useState('');
  const [weatherId, setWeatherId] = useState('');
  const [name, setName] = useState('');
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);


  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      console.log('user', user);
    });
  }, []);


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

  //tallenna uusi vaate
  const saveItem = () => {
    push(
      ref(database, 'items/'),
      { 'name': name, 'photo': photo, 'weatherId': weatherId });
    setName('');
    setPhoto('');
    setWeatherId('');
    Keyboard.dismiss();
  }

  // poista vaate listalta
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
    <View style={styles.bodyContainer}>

      {user? (<><TextInput
        style={{ marginTop: 50 }}
        placeholder={'Nimi'}
        onChangeText={name => setName(name)}
        value={name} />
      <TextInput
        placeholder='Kuvan osoite'
        onChangeText={photo => setPhoto(photo)}
        value={photo} />
      <TextInput
        placeholder='Säätilan id'
        onChangeText={weatherId => setWeatherId(weatherId)}
        value={weatherId} />
      <Button onPress={saveItem} title="Save" />
      </>) : <Text style={styles.text}>Kirjaudu sisään tallentaaksesi vaatteita!</Text>}
      <View style={styles.listContainer}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={items}
        renderItem={({ item }) =>
            <><Text>{`${item.name}, ${WeatherCodes[0][item.weatherId]}`}</Text>
            <Image
              style={{ width: 80, resizeMode: 'contain' }}
              source={Images[item.photo]}
            />
            {user ? (<Text style={{ color: '#0000ff' }} onPress={() => deleteItem(item.key)}>bought</Text>) 
            : <Text></Text>}
            </>
          }
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  bodyContainer: {
    flex: 2,
    top: 80,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 40
  },
  listContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: 25,
    marginBottom: 40
  },
  title: {
    fontSize: 60,
    color: '#fff'
  },
  subtitle: {
    fontSize: 24,
    color: '#fff'
  },
  text: {
    fontSize: 16,
    color: '#000'
  }
});