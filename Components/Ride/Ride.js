import * as React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import database from '@react-native-firebase/database';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Ride({ route, navigation }) {

    const reference = database().ref('/users/');

    const sendData = () => {
        reference.set({
            name: 'Sai Ram',
            place: 'Shridi'
        }).then(() => console.log("Data Sent"))
    }

    function seeData() {
        reference.on('value', snapshot => {
            console.log('Data is :', snapshot.val().name)
        })
    }

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => sendData()}>
                <Text>Send Data</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => seeData()}>
                <Text>See Data</Text>
            </TouchableOpacity>
        </View>
    )
}