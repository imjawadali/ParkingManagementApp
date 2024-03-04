/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import MainNavigator from './navigators/MainNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="white" barStyle={'dark-content'} />
      <MainNavigator />
    </NavigationContainer>
  );
};

export default App;
