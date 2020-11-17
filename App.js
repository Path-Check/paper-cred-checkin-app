/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Entry from './app/screens/Entry';
import QRReader from './app/screens/QRReader';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Entry}
          options={{ title: 'PathCheck Passport Reader' }}
        />

        <Stack.Screen
          name="QRReader"
          component={QRReader}
          options={{ title: 'Point Camera to the QR Code' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
