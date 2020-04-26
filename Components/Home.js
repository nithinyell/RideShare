import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function Home( {route, navigation} ) {

    const {userName} = route.params
    return (
    <Text>Hai {userName}</Text>
    )
}