import * as React from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';
import auth from '@react-native-firebase/auth';

export default function Profile({ route, navigation }) {

    function logout() {
        auth().signOut().then(() => navigation.navigate('Login'))
    }

    return (
        <SafeAreaView>
            <Text> Settings !! </Text>
            <Button title={"Log out"} onPress={() => logout()}/>
        </SafeAreaView>
    )
}