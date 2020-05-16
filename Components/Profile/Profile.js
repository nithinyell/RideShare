import * as React from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';
import database from '@react-native-firebase/database';
import AuthManager from '../Auth/UserAuth';

export default function Profile({ route, navigation }) {

    var randomNumber = Math.floor(Math.random() * 100) + 1 
    let reference = '/Pool/' + randomNumber + '/'
    let poolReference = database().ref(reference)

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button title="Sign Out" onPress={() => logout()} />
              )
        })
    })
    
    function logout() { 
        AuthManager.signOut((res) => {
            if (res) {
                navigation.navigate('Login')
            }
        })
    }

    return (
        <SafeAreaView>
            <Text> Settings !! </Text>
        </SafeAreaView>
    )
}