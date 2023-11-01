import * as React from 'react';
import { useState } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import Weather from '../components/Weather';
import Clothes from '../components/Clothes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function HomeScreen() {
   const [todaysWeather, setTodaysWeather] = useState('');
   const [rainyWeather, setRainyWeather] = useState('');

   return (

      <View style={styles.container}>
         <ImageBackground imageStyle={styles.backgroundStyle} source={rainyWeather === 1 ? require('../assets/backgrounds/weather_rainy.png') : require('../assets/backgrounds/weather.png')} resizeMode="cover" style={styles.image}>
            <KeyboardAwareScrollView keyboardShouldPersistTaps='always' contentContainerStyle={{ flexGrow: 1 }} >
               <Weather setRainyWeather={setRainyWeather} setTodaysWeather={setTodaysWeather} />
            </KeyboardAwareScrollView>
            <Clothes todaysWeather={todaysWeather} />

         </ImageBackground>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      top: 35,
      backgroundColor: '#feb396',
      justifyContent: 'flex-end'
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