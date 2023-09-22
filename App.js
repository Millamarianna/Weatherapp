import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View, Button, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';


export default function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [title, setTitle] = useState('');
  const [ready, setReady] = useState(true)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('No permission to get location')
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      setReady(false);
    })();
  }, []);


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
    } catch (error) {
      Alert.alert('Error', error.message)
    };
  }

  return (<View style={styles.container}>
    {ready ? (<ActivityIndicator size="large" />) :
      (
          <MapView
            style={{ ...StyleSheet.absoluteFillObject }}
            initialRegion={{
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude),
              latitudeDelta: 0.0322,
              longitudeDelta: 0.0221,
            }}
            region={{
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude),
              latitudeDelta: 0.0322,
              longitudeDelta: 0.0221,
            }}
          >
              <Marker
                coordinate={{
                  latitude: parseFloat(latitude),
                  longitude: parseFloat(longitude)
                }} />
          </MapView>)}

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
      
  </View>);
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});