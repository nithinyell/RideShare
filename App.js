/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler'
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './Components/Login';
import Home from './Components/Home';
import Profile from './Components/Profile';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();

const App: () => React$Node = () => {

  function HomeScreens() {
    return (
      <Tab.Navigator>
            <Tab.Screen name='Home' component={Home}/>
            <Tab.Screen name='Profile' component={Profile}/>
      </Tab.Navigator>
    )
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="HomeScreens" component={HomeScreens}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;