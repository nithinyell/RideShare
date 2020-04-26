import * as React from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

export default function Profile({ route, navigation }) {

    function logout() {
        auth().signOut().then(() => navigation.navigate('Login'))
    }

    return (
        <SafeAreaView>
            <Text>Settings !! </Text>
            <Button title={"Log out"} onPress={() => logout()}>
            </Button>
        </SafeAreaView>
    )
}