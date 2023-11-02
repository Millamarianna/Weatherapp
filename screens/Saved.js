import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Pressable, FlatList, Keyboard } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue, remove } from 'firebase/database';
import firebaseConfig from '../firebaseConfig';
import { FIREBASE_AUTH } from '../firebaseConfig';
import { User, onAuthStateChanged } from 'firebase/auth';
import Images from '../components/Images';
import WeatherCodes from '../constants/WeatherCodes';
import DropDownPicker from 'react-native-dropdown-picker';


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function SavedScreen() {
  const [photo, setPhoto] = useState('');
  const [weatherId, setWeatherId] = useState('');
  const [name, setName] = useState('');
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [allSuggestions, setAllSuggestions] = useState([]);
  const [show, setShow] = useState(false);
  const [wcodes, setWcodes] = useState([
    { label: 'yli 22 astetta', value: 'A' },
    { label: '15-22 astetta', value: 'B' },
    { label: '7-15 astetta', value: 'C' },
    { label: '0-7 astetta', value: 'D' },
    { label: '-10-0 astetta', value: 'E' },
    { label: 'alle -10 astetta', value: 'F' }
  ]);


  //tarkista onko käyttäjä kirjautunut sisään
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      console.log('user', user);
      if (user) {
        if (user.email === 'milla.tuomainen@outlook.com') {
          setAdmin(true);
        }
      }
      console.log(admin)
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

  const showSuggestion = () => {
    const itemsRef = ref(database, '/suggestions');
    onValue(itemsRef, (snapshot) => {
      const data2 = snapshot.val();
      const all2 = data2 ? Object.keys(data2).map(key => ({ key, ...data2[key] })) : [];
      console.log(all2)
      setAllSuggestions(all2);
      setShow(value => !value)
    })
  }

  //tee sääkoodeista lista
  const WID = (weatherID) => {
    let list = weatherID.split(',');
    console.log(list);
    return list;
  }
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

  //tallenna uusi ehdotus
  const saveSuggestion = () => {
    push(
      ref(database, 'suggestions/'),
      { 'name': name, 'weatherId': suggestions.toString() });
    setName('');
    setPhoto('');
    setSuggestions([]);
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
        console.error("Poisto epäonnistui:", error.message)
      })
  }


  return (
    <View style={styles.bodyContainer}>

      {admin ?
        <>
          <TextInput
            style={styles.input}
            placeholder={'   Nimi   '}
            onChangeText={name => setName(name)}
            value={name} />
          <TextInput
            style={styles.input}
            placeholder='   Kuvan osoite   '
            onChangeText={photo => setPhoto(photo)}
            value={photo} />
          <TextInput
            style={styles.input}
            placeholder='   Säätilan id   '
            onChangeText={weatherId => setWeatherId(weatherId)}
            value={weatherId} />
          <Pressable style={styles.button} onPress={saveItem}>
            <Text style={styles.text}>Tallenna</Text>
          </Pressable>
        </>
        : user ?
          <>
            <Text style={styles.text}>Tee ehdotuksia vaatelistalle</Text>
            <TextInput
              style={styles.input}
              placeholder={'   Vaatteen nimi   '}
              onChangeText={name => setName(name)}
              value={name} />
            <DropDownPicker
              placeholder='Valitse vaatteen käyttölämpötilat'
              open={open}
              value={suggestions}
              items={wcodes}
              setOpen={setOpen}
              setValue={setSuggestions}
              setItems={setWcodes}
              multiple={true}
              mode="BADGE"
              badgeDotColors={["#dc143c", "#ff7f50", "#3cb371", "#87cefa", "#0000cd"]}
            />
            <Pressable style={styles.button} onPress={saveSuggestion}>
              <Text style={styles.text}>Tallenna ehdotus</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={showSuggestion}>
              <Text style={styles.text}>Näytä ehdotukset</Text>
            </Pressable>
            {show ? <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={allSuggestions}
              renderItem={({ item }) =>
                <><Text style={styles.subtitle}>{`${item.name}`}</Text>
                  <Text>Käyttölämpötilat:</Text>
                  {WID(item.weatherId).map((item2, index) => { return <Text>{`${WeatherCodes[0][item2]}`}</Text> })}
                </>}
            />
              : null}
          </>
          :
          <Text style={styles.text}>Kirjaudu sisään tehdäksesi ehdotuksia vaatelistaan!</Text>}
      <View style={styles.listContainer}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={items}
          renderItem={({ item }) =>
            <>
              <Text style={styles.subtitle}>{`${item.name}`}</Text>
              <Text>Käyttölämpötilat:</Text>
              {WID(item.weatherId).map((item2, index) => { return <Text>{`${WeatherCodes[0][item2]}`}</Text> })}
              <Image
                style={{ width: 80, resizeMode: 'contain' }}
                source={Images[item.photo]}
              />
              {admin ?
                (<Text style={{ color: '#0000ff' }} onPress={() => deleteItem(item.key)}>Poista</Text>)
                :
                null}
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
  input: {
    backgroundColor: 'white',
    fontSize: 16,
    color: 'black',
    height: 38,
    width: 'fit-content',
    borderWidth: 1,
    borderRadius: 5,
    margin: 1,
  },
  title: {
    fontSize: 60,
    color: '#fff'
  },
  subtitle: {
    fontSize: 18,
    color: '#000'
  },
  text: {
    fontSize: 16,
    color: '#000'
  },
  button: {
    alignItems: 'center',
    margin: 5,
    borderRadius: 5,
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: '#ff8a8d',
    shadowColor: "#000000",
    shadowOpacity: 0.58,
    shadowRadius: 2.00,
    shadowOffset: {
      height: 5,
      width: 1
    },
  }
});