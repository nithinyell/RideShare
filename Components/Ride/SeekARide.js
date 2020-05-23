import * as React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ActivityIndicator, RefreshControl, Button, StyleSheet, Image } from 'react-native';
import { useState, useEffect } from 'react'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import CardView from '../Utils/CardView';

import * as DataBaseManager from '../Data/DataManager'

export default function SeekARide({ route, navigation }) {

    const [rawData, setRawData] = useState([])
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getData()
    }, [])

    const getData = React.useCallback(() => {
        setRefreshing(true);
        DataBaseManager.fetchData((data) => {
            setRawData(data)
            setRefreshing(false);
        })
    })

    const openRequestPage = () => {
        navigation.navigate('RequestModal', {rideStyle: 'Offer A Ride'})
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                {
                    rawData.length == 0 ?
                        <ActivityIndicator size="large" color="#0000ff" />
                        // TODO show no data when []
                        // <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        //     <Text>NO DATA TO DISPLAY</Text>
                        // </View>
                        :
                        <FlatList
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getData} />}
                            data={rawData}
                            keyExtractor={ride => ride.date}
                            renderItem={({ item }) => <CardView ride={item} />}
                        />
                }
                <TouchableOpacity style={styles.TouchableOpacityStyle} onPress={openRequestPage}> 
                <Image style={{width: 50, height: 50}} source={require('../../Assets/add.png')}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({ 
    TouchableOpacityStyle: {
      position: 'absolute',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: 30,
      bottom: 30,
    },
  });