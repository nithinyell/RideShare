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
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Login from './Components/Login';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import Ride from './Components/Ride/Ride';
import OfferARide from './Components/Ride/OfferARide';
import SeekARide from './Components/Ride/SeekARide';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()
const TopTab = createMaterialTopTabNavigator()

const App: () => React$Node = () => {

  function HomeStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}/>
      </Stack.Navigator>
    )
  }

  function ProfileStack() {
    return(
      <Stack.Navigator>
        <Stack.Screen name="Profile" component={Profile}/>
      </Stack.Navigator>
    )
  }

  function RideScenes() {
    return(
      <TopTab.Navigator>
        <TopTab.Screen name="Accept" component={SeekARide}/>
        <TopTab.Screen name="Offer" component={OfferARide}/>
      </TopTab.Navigator>
    )
  }

  function RideStack() {
    return(
      <Stack.Navigator>
        <Stack.Screen name="Ride" component={RideScenes}/>
      </Stack.Navigator>
    )
  }

  function HomeScreens() {
    return (
      <Tab.Navigator>
        <Tab.Screen name='Ride' component={RideStack} />
        <Tab.Screen name='Home' component={HomeStack} />
        <Tab.Screen name='Profile' component={ProfileStack} />
      </Tab.Navigator>
    )
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Ride Share" component={HomeScreens} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;