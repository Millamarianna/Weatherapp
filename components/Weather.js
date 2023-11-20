import { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, ActivityIndicator, StyleSheet, Alert, Text, View, Image, TextInput, Keyboard } from 'react-native';
import { API } from '../firebaseConfig';

import * as Location from 'expo-location';

export default function Weather({ setRainyWeather, setTodaysWeather }) {

  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weather9, setWeather9] = useState('');
  const [weather12, setWeather12] = useState('');
  const [weather15, setWeather15] = useState('');
  const [weather18, setWeather18] = useState('');
  const [wind9, setWind9] = useState('');
  const [wind12, setWind12] = useState('');
  const [wind15, setWind15] = useState('');
  const [wind18, setWind18] = useState('');
  const [icon9, setIcon9] = useState('');
  const [icon12, setIcon12] = useState('');
  const [icon15, setIcon15] = useState('');
  const [icon18, setIcon18] = useState('');
  const [city, setCity] = useState(null);
  const [newCity, setNewCity] = useState('');
  const [fetchAgain, setFetchAgain] = useState(1);
  const [day, setDay] = useState(0);
  const [date, setDate] = useState('');

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
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API}&q=${city}&days=10&aqi=no&alerts=no`)
          .then(response => response.json())
          .then(data => {
            console.log(day)
            setTodaysWeather(data.forecast.forecastday[day].day.avgtemp_c);
            setDate(data.forecast.forecastday[day].hour[0].time.substr(8, 2)+"."+data.forecast.forecastday[day].hour[0].time.substr(5, 2)+"."+data.forecast.forecastday[day].hour[0].time.substr(0,4));
            setRainyWeather(data.forecast.forecastday[day].day.daily_will_it_rain);
            setWeather9(data.forecast.forecastday[day].hour[9]);
            setWind9(Math.trunc(data.forecast.forecastday[day].hour[9].wind_kph.toString() / 3.6));
            setIcon9(data.forecast.forecastday[day].hour[9].condition.icon.substr(-7, 7).toString());
            setWeather12(data.forecast.forecastday[day].hour[12]);
            setWind12(Math.trunc(data.forecast.forecastday[day].hour[12].wind_kph.toString() / 3.6));
            setIcon12(data.forecast.forecastday[day].hour[12].condition.icon.substr(-7, 7).toString());
            setWeather15(data.forecast.forecastday[day].hour[15]);
            setWind15(Math.trunc(data.forecast.forecastday[day].hour[15].wind_kph.toString() / 3.6));
            setIcon15(data.forecast.forecastday[day].hour[15].condition.icon.substr(-7, 7).toString());
            setWeather18(data.forecast.forecastday[day].hour[18]);
            setWind18(Math.trunc(data.forecast.forecastday[day].hour[18].wind_kph.toString() / 3.6));
            setIcon18(data.forecast.forecastday[day].hour[18].condition.icon.substr(-7, 7).toString());
            setWeatherLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching weather:", error.message)
          })
      }
      else {
        setFetchAgain(fetchAgain + 1)
      }

    },
    [city, day]
  );

  const plusDay = () => {
    setDay(day + 1)
    
  }

  const minusDay = () => {
    setDay(day - 1)
  }

 
  return (
    <View style={styles.mainContainer}>
      <View style={styles.searchContainer}>

        <Text style={styles.title}>Sää {city} {date}</Text>

        <View style={styles.buttonContainer}>
          <TextInput
            style={{
              backgroundColor: '#feb396',
              fontSize: 18,
              color: 'white',
              height: 38,
              width: 'auto',
              borderTopWidth: 1,
              borderLeftWidth: 1,
              borderRightWidth: 2,
              borderBottomWidth: 2,
              borderRadius: 4
            }}
            placeholder='  kirjoita kaupunki  '
            value={newCity}
            onChangeText={text => {setNewCity(text)}}
          />
          <Pressable style={styles.button} onPress={() => {setCity(newCity); Keyboard.dismiss(); setNewCity('');}}>
            <Text style={styles.title}>Vaihda</Text>
          </Pressable>
        </View>
        {day === 0 ?
          (
            <View style={styles.buttonContainer}>
              <Pressable style={styles.button} onPress={plusDay}>
                <Text style={styles.title}>Seuraava päivä</Text>
              </Pressable>
            </View>)
          : day < 9 ?
            (
              <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={minusDay}>
                  <Text style={styles.title}>Edellinen päivä</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={plusDay}>
                  <Text style={styles.title}>Seuraava päivä</Text>
                </Pressable>
              </View>)
            : (
              <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={minusDay}>
                  <Text style={styles.title}>Edellinen päivä</Text>
                </Pressable>
              </View>
            )}
      </View>
      {weatherLoading ?
        (<ActivityIndicator size="large" color="#00ff00" />)
        :
        (
          <View style={styles.weatherContainer}>

            <View style={styles.hourlyContainer}>
              <MaterialCommunityIcons
                name="clock-time-nine-outline"
                size={24}
                color="white"
              />
              <Image
                style={{ width: 64, height: 64 }}
                source={{ uri: `http://cdn.weatherapi.com/weather/64x64/day/${icon9}` }}
              />

              <Text style={styles.title}>{Math.trunc(weather9.temp_c)} °C</Text>
              <Text style={styles.weatherText}>Tuntuu {Math.trunc(weather9.feelslike_c)} °C</Text>
              <Text style={styles.weatherText}>Tuulta {wind9} m/s</Text>
            </View>

            <View style={styles.hourlyContainer}>
              <MaterialCommunityIcons
                name="clock-time-twelve-outline"
                size={24}
                color="white"
              />
              <Image
                style={{ width: 64, height: 64 }}
                source={{ uri: `http://cdn.weatherapi.com/weather/64x64/day/${icon12}` }}
              />

              <Text style={styles.title}>{Math.trunc(weather12.temp_c)} °C</Text>
              <Text style={styles.weatherText}>Tuntuu {Math.trunc(weather12.feelslike_c)} °C</Text>
              <Text style={styles.weatherText}>Tuulta {wind12} m/s</Text>
            </View>

            <View style={styles.hourlyContainer}>
              <MaterialCommunityIcons
                name="clock-time-three-outline"
                size={24}
                color="white"
              />
              <Image
                style={{ width: 64, height: 64 }}
                source={{ uri: `http://cdn.weatherapi.com/weather/64x64/day/${icon15}` }}
              />

              <Text style={styles.title}>{Math.trunc(weather15.temp_c)} °C</Text>
              <Text style={styles.weatherText}>Tuntuu {Math.trunc(weather15.feelslike_c)} °C</Text>
              <Text style={styles.weatherText}>Tuulta {wind15} m/s</Text>
            </View>

            <View style={styles.hourlyContainer}>
              <MaterialCommunityIcons
                name="clock-time-six-outline"
                size={24}
                color="white"
              />
              <Image
                style={{ width: 64, height: 64 }}
                source={{ uri: `http://cdn.weatherapi.com/weather/64x64/day/${icon18}` }}
              />

              <Text style={styles.title}>{Math.trunc(weather18.temp_c)} °C </Text>
              <Text style={styles.weatherText}>Tuntuu {Math.trunc(weather18.feelslike_c)} °C</Text>
              <Text style={styles.weatherText}>Tuulta {wind18} m/s</Text>
            </View>



          </View>

        )}

    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    top: 90,
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 5,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },

  searchContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },
  weatherContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  hourlyContainer: {
    top: 35,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff8a8d',
    shadowColor: "#000000",
    shadowOpacity: 0.58,
    shadowRadius: 2.00,
    shadowOffset: {
      height: 5,
      width: 1
    },
    elevation: 10,
    borderWidth: 0.2,
    borderColor: '#bf8671',
    borderRadius: 5,
    margin: 1
  },
  weatherText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#fff'
  },
  button: {
    alignItems: 'center',
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
    elevation: 10,
    borderWidth: 0.2,
    borderColor: '#bf8671',
    borderRadius: 5,
    margin: 1
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  title: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff'
  },
  subtitle: {
    fontSize: 24,
    color: '#fff'
  }
});