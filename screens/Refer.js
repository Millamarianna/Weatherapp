import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from "react-native";

import AuthStack from '../constants/AuthStack';

export default function ReferScreen() {
   return (
      <NavigationContainer independent={true}>
         <AuthStack />
      </NavigationContainer>
   );
}