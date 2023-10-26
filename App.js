import * as React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SavedScreen from './screens/Saved';
import ReferScreen from './screens/Refer';
import DrawerItems from './constants/DrawerItems';
import Header from './components/Header';
import Etusivu from './screens/Etusivu';
import SettingsScreen from './screens/Settings';

const Drawer = createDrawerNavigator();

export default function App() {


  return (
    <NavigationContainer>

      <Drawer.Navigator
        drawerType="front"
        initialRouteName="Etusivu"
        screenOptions={{
          activeTintColor: '#e91e63',
          itemStyle: { marginVertical: 10 },
        }}
      >

        {
          DrawerItems.map(drawer =>
            <Drawer.Screen
              key={drawer.name}
              name={drawer.name}
              options={{
                drawerIcon: ({ focused }) =>
                  drawer.iconType === 'Material'
                    ?
                    <MaterialCommunityIcons
                      name={drawer.iconName}
                      size={24}
                      color={focused ? "#e91e63" : "black"}
                    />
                    :
                    drawer.iconType === 'Feather' ?
                      <MaterialCommunityIcons
                        name={drawer.iconName}
                        size={24}
                        color={focused ? "#e91e63" : "black"}
                      />
                      :
                      <MaterialCommunityIcons
                        name={drawer.iconName}
                        size={24}
                        color={focused ? "#e91e63" : "black"}
                      />
                ,
                headerShown: true,
                header: ({ scene, route, options }) => {
                  const title =
                    options.headerTitle !== undefined
                      ? options.headerTitle
                      : options.title !== undefined
                        ? options.title
                        : route.name;

                  return (
                    <Header screen={title} />
                  );
                }
              }}
              component={
                drawer.name === 'Etusivu' ? Etusivu
                  : drawer.name === 'Settings' ? SettingsScreen
                    : drawer.name === 'Saved Items' ? SavedScreen
                      : ReferScreen
              }

            />)
        }
      </Drawer.Navigator>
    </NavigationContainer>

  );
}