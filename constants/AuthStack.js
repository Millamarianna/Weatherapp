import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Start from '../screens/Start';
import Login from '../screens/Login';
import Register from '../screens/Register';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
   return (
      <Stack.Navigator initialRouteName={Start} screenOptions={{ headerShown: false }}>
         <Stack.Screen name="Start" component={Start} />
         <Stack.Screen name="Login" component={Login} />
         <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
   );
}