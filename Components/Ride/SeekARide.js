import * as React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react'
import { FlatList } from 'react-native-gesture-handler';
import CardView from '../Utils/CardView';

import * as DataBaseManager from '../Data/DataManager'

export default function SeekARide({ route, navigation }) {

    const [rawData, setRawData] = useState([])

    useEffect(() => {
        getData()
    }, [])

    getData = () => {
        DataBaseManager.fetchData((data) => {
            setRawData(data)
        })
    }

    const openRequestPage = () => {
        navigation.navigate('RequestModal')
    }

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flex: 0.05, flexDirection: 'row', justifyContent: 'center' }}>
                <View style={{ flex: 4, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => openRequestPage()}>
                        <Text>Raise a Request</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 0.95 }}>
                {
                    rawData.length == 0 ? 
                        <ActivityIndicator size="large" color="#0000ff" />
                        // TODO show no data when []
                        // <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        //     <Text>NO DATA TO DISPLAY</Text>
                        // </View>
                        :
                        <FlatList
                            data={rawData}
                            keyExtractor={ride => ride.date}
                            renderItem={({ item }) => <CardView ride={item} />}
                        />
                }
            </View>
        </View>
    )
}