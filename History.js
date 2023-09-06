import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';

export default function History({navigation, route}) {

  return (
    <View style={styles.container}>

      <Text style={styles.text}>History:</Text>
      <FlatList
        data={route.params.history}
        renderItem={({item}) => <Text>{item.line}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 100
  },
  text : {
    width:200, 
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 5,
  },
  input : {
    width:200, 
    fontWeight: 'bold',
    borderColor: 'grey', 
    margin: 5,
    borderWidth: 1
  },
  button: {
    alignItems: 'center',
    margin: 20,
    gap: 10,
    justifyContent: 'center',
    flexDirection: 'row'
  }
});