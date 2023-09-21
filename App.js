import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


export default function App() {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [title, setTitle] = useState('');
  const [isLoading, setLoading] = useState(true);

  const getCoordinates = async () => {
    const url = `https://www.mapquestapi.com/geocoding/v1/address?key=XyIkq6OIN8V6qYs6m9qm83fLLkSAU5aS&location=${title}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data
    } catch (error) {
      Alert.alert('Error', error.message)
    };    
  }

  const getAddress = async () => {
    try {
      const data = await getCoordinates();
      setLatitude(data.results[0].locations[0].latLng.lat);
      setLongitude(data.results[0].locations[0].latLng.lng);
      setLoading(false)

    } catch (error) {
      Alert.alert('Error', error.message)
    };
  }

  return (<View style={styles.container}>
    
    {isLoading ? (<Text>Search for an address</Text>) : (
    <MapView
    style={{...StyleSheet.absoluteFillObject}}
    region={{
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      latitudeDelta: 0.0322,
      longitudeDelta: 0.0221,
    }}> 
    <Marker 
    coordinate={{
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude)
    }} />
    </MapView>
    )}
   
        <TextInput
        style={{
          backgroundColor: '#fff',
          fontSize: 18,
          height: 50,
          width: 250,
          borderTopWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 2,
          borderBottomWidth: 2,
        }}
        placeholder='Type an address'
        value={title}
        onChangeText={title => setTitle(title)}
      />
      <Button title="Search" onPress={getAddress} />
     
  </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});