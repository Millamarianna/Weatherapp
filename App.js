import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SavedScreen from './screens/Saved';
import LoginScreen from './screens/Login';
import HomeScreen from './screens/Home';
import LogOutScreen from './screens/LogOut';
import Header from './components/Header';
import { FIREBASE_AUTH } from './firebaseConfig';
import { User, onAuthStateChanged } from 'firebase/auth';

const Drawer = createDrawerNavigator();

export default function App() {
  const [user, setUser] = useState(null);


  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      console.log('user', user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerType="front"
        initialRouteName="Home"
        screenOptions={{
          activeTintColor: '#e91e63',
          itemStyle: { marginVertical: 10 },
        }}
      >
        <Drawer.Screen
          key='Etusivu'
          name='Etusivu'
          options={{
            drawerIcon: ({ focused }) =>

              <MaterialCommunityIcons
                name='home'
                size={24}
                color={focused ? "#e91e63" : "black"}
              />
            ,
            headerShown: true,
            header: ({ scene, route, options }) => {
              const title = route.name;

              return (
                <Header screen={title} />
              );
            }
          }}
          component={HomeScreen}
        />
        <Drawer.Screen
          key='Tallennetut vaatteet'
          name='Tallennetut vaatteet'
          options={{
            drawerIcon: ({ focused }) =>
              <MaterialCommunityIcons
                name='content-save-cog'
                size={24}
                color={focused ? "#e91e63" : "black"}
              />
            ,
            headerShown: true,
            header: ({ scene, route, options }) => {
              const title = route.name;
              return (
                <Header screen={title} />
              );
            }
          }}
          component={SavedScreen}
        />
        {user ? (<Drawer.Screen
          key='Kirjaudu ulos'
          name='Kirjaudu ulos'
          options={{
            drawerIcon: ({ focused }) =>

              <MaterialCommunityIcons
                name='logout'
                size={24}
                color={focused ? "#e91e63" : "black"}
              />
            ,
            headerShown: true,
            header: ({ scene, route, options }) => {
              const title = route.name;

              return (
                <Header screen={title} />
              );
            }
          }}
          component={LogOutScreen}
        />) : (<Drawer.Screen
          key='Kirjaudu sisään'
          name='Kirjaudu sisään'
          options={{
            drawerIcon: ({ focused }) =>

              <MaterialCommunityIcons
                name='login'
                size={24}
                color={focused ? "#e91e63" : "black"}
              />
            ,
            headerShown: true,
            header: ({ scene, route, options }) => {
              const title = route.name;

              return (
                <Header screen={title} />
              );
            }
          }}
          component={LoginScreen}
        />)}

      </Drawer.Navigator>
    </NavigationContainer>

  );
}