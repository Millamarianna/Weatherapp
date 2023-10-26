Säätiedot API:sta current mukaan

import { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Alert, Text, View, Image, TextInput, Button, FlatList, Keyboard } from 'react-native';
import * as Location from 'expo-location';

export default function Weather({ city, setCity, temperature, setTemperature, weather, setWeather, icon, setIcon, weatherLoading, setWeatherLoading }) {

  const [fetchAgain, setFetchAgain] = useState(1);

  // Haetaan käyttäjän koordinaatit ja niiden avulla kaupunki
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('No permission to get location')
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      let regionName = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setCity(regionName[0]['city']);
    })();
  }, [fetchAgain]);

  //Kun kaupunki on haettu, haetaan säätiedot
  useEffect(
    () => {
      console.log(city);
      if (city != null) {
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=620ea7f6b6c641fc94893159230510&q=${city}&days=1&aqi=no&alerts=no`)
          .then(response => response.json())
          .then(data => {
            setTemperature(data.current.temp_c);
            setWeather(data.current.condition.text);
            setIcon(data.current.condition.icon.substr(-7, 7).toString())
            setWeatherLoading(false)
          })
          .catch((error) => {
            console.error("Error fetching weather:", error.message)
          })
      }
      else {
        setFetchAgain(fetchAgain + 1)
      }

      console.log(icon)
    },
    [city]
  );

  return (
    <View style={styles.mainContainer}>
      <Text> Hei! Tämän päivän sää kaupungissa {city}</Text>
      {weatherLoading ?
        (<ActivityIndicator size="large" color="#00ff00" />)
        :
        (<View style={styles.weatherContainer}>
          <View style={styles.hourlyContainer}>
            <Image
              style={{ width: 100, height: 100 }}
              source={{ uri: `http://cdn.weatherapi.com/weather/64x64/day/${icon}` }}
            />
            <Text> 
              Weather: {weather}
              Temperature: {temperature} Celsius</Text>
          </View>

          <View style={styles.hourlyContainer}>
            <Image
              style={{ width: 100, height: 100 }}
              source={{ uri: `http://cdn.weatherapi.com/weather/64x64/day/${icon}` }}
            />
            <Text> 
              Weather: {weather}
              Temperature: {temperature} Celsius</Text>
          </View>

          <View style={styles.hourlyContainer}>
            <Image
              style={{ width: 100, height: 100 }}
              source={{ uri: `http://cdn.weatherapi.com/weather/64x64/day/${icon}` }}
            />
            <Text> 
              Weather: {weather}
              Temperature: {temperature} Celsius</Text>
          </View>

          <View style={styles.hourlyContainer}>
            <Image
              style={{ width: 100, height: 100 }}
              source={{ uri: `http://cdn.weatherapi.com/weather/64x64/day/${icon}` }}
            />
            <Text> 
              Weather: {weather}
              Temperature: {temperature} Celsius</Text>
          </View>

        </View>)}

    </View>
  );
}

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'powderblue'
  },
  mainContainer: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'skyblue'
  },
  hourlyContainer: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'steelblue'
  },
  tempText: {
    fontSize: 72,
    color: '#fff'
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 40
  },
  title: {
    fontSize: 60,
    color: '#fff'
  },
  subtitle: {
    fontSize: 24,
    color: '#fff'
  }
});