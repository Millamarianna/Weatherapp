import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from "react-native";
import Start from '../screens/Start';
import Login from '../screens/Login';
import Register from '../screens/Register';


const Stack = createNativeStackNavigator();

export default function LogScreen() {
   return (
      <NavigationContainer independent={true}>
         <Stack.Navigator initialRouteName={Start} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Start" component={Start} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
         </Stack.Navigator>
      </NavigationContainer>
   );
}