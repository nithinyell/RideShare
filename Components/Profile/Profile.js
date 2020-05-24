import * as React from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';
import database from '@react-native-firebase/database';
import AuthManager from '../Auth/UserAuth';

export default function Profile({ route, navigation }) {

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <View style={{marginRight: 10}}>
              <Button title="Sign Out" onPress={() => logout()} />
            </View>
          ),
        });
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