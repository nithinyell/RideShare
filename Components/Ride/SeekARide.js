import * as React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react'
import database from '@react-native-firebase/database';
import { FlatList } from 'react-native-gesture-handler';
import { set } from 'react-native-reanimated';

export default function SeekARide({ route, navigation }) {

    const [rawData, setRawData] = useState(null)

    var reference = database().ref('/Pool')

    useEffect(() => {

        var userData = []
        reference.on('value', snapshot => {
            var data = snapshot.val()
            Object.keys(data).map(key => {
                userData += data[key]
            })
        })

        console.log("***", userData)
    })

    const openRequestPage = () => {
        navigation.navigate('RequestModal')
    }

    return (
        
        <SafeAreaView>
            <TouchableOpacity onPress={() => openRequestPage()}>
                <Text>Raise a Request</Text>
            </TouchableOpacity>

            <FlatList>

            </FlatList>
        </SafeAreaView>
    )
}