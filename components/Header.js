import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Header({ screen }) {
  const navigation = useNavigation();
  return (

    <View style={headerStyles.container}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Entypo name="menu" size={24} color="white" />
      </TouchableOpacity>
      <View>
        <Text style={{ color: '#fff' }}>{screen}</Text>
      </View>
    </View>
  )
}

const headerStyles = StyleSheet.create({
  container: {
    position: 'relative',
    top: 35,
    left: 0,
    width: '100%',
    backgroundColor: '#ff8a8d',
    borderBottomWidth: 0.2,
    borderBottomColor: '#bf8671',
    shadowColor: "#000000",
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    shadowOffset: {
      height: 12,
      width: 1
    },
    elevation: 10,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});