import * as React from 'react';
import { View, Text, Button } from "react-native";
import { FIREBASE_AUTH } from '../firebaseConfig';

export default function LogOutScreen({navigation}) {
   return (
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
<Text style={{fontSize:16,fontWeight:'700'}}>Haluatko varmasti kirjautua ulos?</Text>
<Button onPress={() => FIREBASE_AUTH.signOut()} title="Kyllä" />
<Button onPress={() => navigation.navigate('App')} title="Ei" />
</View>
   );
 }