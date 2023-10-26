import React from 'react'
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Start({ navigation }) {
  return (
  <SafeAreaView
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    }}>
    <View style={{ marginTop: 20 }}>
      <Text
        style={{
          fontFamily: 'Inter-Bold',
          fontWeight: 'bold',
          fontSize: 30,
          color: '#20315f',
        }}>
        GAMEON
      </Text>
    </View>
    <TouchableOpacity
      style={{
        backgroundColor: '#AD40AF',
        padding: 20,
        width: '90%',
        borderRadius: 10,
        marginBottom: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      onPress={() => navigation.navigate('Login')}>
      <Text
        style={{
          color: 'white',
          fontSize: 18,
          textAlign: 'center',
          fontWeight: 'bold',
        }}>
        Log in
      </Text>
      <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
    </TouchableOpacity>
    <TouchableOpacity
      style={{
        backgroundColor: '#AD40AF',
        padding: 20,
        width: '90%',
        borderRadius: 10,
        marginBottom: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      onPress={() => navigation.navigate('Register')}>
      <Text
        style={{
          color: 'white',
          fontSize: 18,
          textAlign: 'center',
          fontWeight: 'bold',
        }}>
        Register
      </Text>
      <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
    </TouchableOpacity>
  </SafeAreaView>
  );
};
