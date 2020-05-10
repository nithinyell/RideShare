import * as React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react'
import database from '@react-native-firebase/database';
import { FlatList } from 'react-native-gesture-handler';
import CardView from '../Utils/CardView';

export default function SeekARide({ route, navigation }) {

    const [rawData, setRawData] = useState([])

    var reference = database().ref('/Pool')

    useEffect(() => {

        var userData = []
        reference.on('value', snapshot => {
            var data = snapshot.val()
            Object.keys(data).map(key => {
               userData.push(data[key])
            })
            setRawData(userData)
        })
    }, [])

    const openRequestPage = () => {
        navigation.navigate('RequestModal')
    }

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flex: 0.1 }}>
                <TouchableOpacity onPress={() => openRequestPage()}>
                    <Text>Raise a Request</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 0.9 }}>
                {
                    rawData == [] ?
                    <Text>NO DATA TO DISPLAY</Text>
                   :
                   <FlatList
                   data={rawData}
                   keyExtractor={ride => ride.date}
                   renderItem={({item}) => <CardView ride={item}/>}
                    /> 
                }
            </View>
        </View>
    )
}