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
import Request from './Components/Ride/Request';
import { Image } from 'react-native';
import Offer from './Components/Ride/Offer';
import Seek from './Components/Ride/Seek';
import NewsDetails from './Components/Home/NewsDetails';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()
const TopTab = createMaterialTopTabNavigator()

const App: () => React$Node = () => {

  function HomeStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="NewsDetail" component={NewsDetails} options={{title: "News"}}/>
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

  function SeekRideStack() {
    return (
      <Stack.Navigator mode='modal' headerMode='none'>
        <Stack.Screen name='Accept' component={Seek} />
        <Stack.Screen name='RequestModal' component={Request} />
      </Stack.Navigator>
    )
  }

  function RideScenes() {
    return(
      <TopTab.Navigator>
        <TopTab.Screen name="Accept" component={SeekRideStack}/>
        <TopTab.Screen name="Offer" component={Offer}/>
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
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return <Image style={{width: 25, height: 25}} source={require('./Assets/newspaper.png')}/>
          } else if (route.name === 'Profile') {
            return <Image style={{width: 25, height: 25}} source={require('./Assets/user.png')}/>
          } else if (route.name === 'Ride') {
            return <Image style={{width: 25, height: 25}} source={require('./Assets/ride.png')}/>
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
      >
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