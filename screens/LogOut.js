import * as React from 'react';
import { TouchableOpacity, View, Text } from "react-native";
import { FIREBASE_AUTH } from '../firebaseConfig';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function LogOutScreen({navigation}) {
   return (
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
<Text style={{fontSize:16,fontWeight:'700'}}>Haluatko varmasti kirjautua ulos?</Text>
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
              onPress={() => FIREBASE_AUTH.signOut()} >
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Kyllä, kirjaudu ulos
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
              onPress={() => navigation.navigate('Etusivu')} >
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Ei, palaa etusivulle
              </Text>
              <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
            </TouchableOpacity>
          
</View>
   );
 }