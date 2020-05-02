import * as React from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';
import database from '@react-native-firebase/database';
import AuthManager from '../Auth/UserAuth';

export default function Profile({ route, navigation }) {

    let reference = '/Pool/' + AuthManager.currentUser().uid
    let poolReference = database().ref(reference)

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

    const sendData = () => {
        poolReference.set({
            from: "HYD",
            to: "CHENNAI",
            date: "22/02/2021"
        }).then(() => console.log("Data Sent"))
    }

    return (
        <SafeAreaView>
            <Text> Settings !! </Text>

            <View style={{ paddingTop: 20, paddingLeft: 10 }}>
                <TouchableOpacity onPress={() => sendData()}>
                    <Text>
                        Add Details {Math.round(Math.random() * 10)}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}