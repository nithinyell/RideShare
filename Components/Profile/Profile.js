import * as React from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';
import auth from '@react-native-firebase/auth';

export default function Profile({ route, navigation }) {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button title="Sign Out" onPress={() => logout()} />
              )
        })
    })
    
    function logout() { // TODO Move this to Auth Manager
        auth().signOut().then(() => navigation.navigate('Login'))
    }

    return (
        <SafeAreaView>
            <Text> Settings !! </Text>
        </SafeAreaView>
    )
}