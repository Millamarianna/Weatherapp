import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue, remove, set } from 'firebase/database';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import firebaseConfig from '../firebaseConfig';
import { FIREBASE_AUTH } from '../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.log(error);
      alert('Kirjautuminen epäonnistui:' + error.message);
    } finally {
      setLoading(false);
      navigation.navigate('Etusivu');
    }
  }

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.log(error);
      alert('Rekisteröityminen epäonnistui:' + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>Kirjaudu sisään</Text>
        <TextInput
          placeholder="Sähköposti"
          autoCapitalize='none'
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={{
            borderWidth: 1,
            borderColor: '#000',
            padding: 10,
            marginBottom: 3,
          }} />
        <TextInput
          placeholder='Salasana'
          autoCapitalize='none'
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={{
            borderWidth: 1,
            borderColor: '#000',
            padding: 10,
            marginBottom: 3,
          }} />
        {loading ? (<ActivityIndicator size="large" color="#feb396" />) :
          <>
            <TouchableOpacity
              style={{
                backgroundColor: '#ff8a8d',
                padding: 20,
                width: '90%',
                borderRadius: 10,
                marginBottom: 50,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
              onPress={signIn} >
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Kirjaudu
              </Text>
              <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#ff8a8d',
                padding: 20,
                width: '90%',
                borderRadius: 10,
                marginBottom: 50,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
              onPress={signUp} >
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Ei tunnuksia? Rekisteröidy!
              </Text>
              <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
            </TouchableOpacity>
          </>}
      </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 35,
    padding: 25,
    backgroundColor: '#feb396',
    justifyContent: 'center'
  },
  backgroundStyle: {
    resizeMode: 'contain',
    position: 'absolute',
    top: -2,
    left: -4
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  tempText: {
    fontSize: 48,
    color: '#fff'
  },
  bottomContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 40
  },
  title: {
    fontSize: 48,
    color: '#fff'
  },
  subtitle: {
    fontSize: 24,
    color: '#fff'
  }
});

export default LoginScreen;