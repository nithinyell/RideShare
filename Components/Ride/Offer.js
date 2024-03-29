import * as React from 'react';
import { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Image, Button, ActivityIndicator, RefreshControl, FlatList } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import CardView from '../Utils/CardView';

import * as DataBaseManager from '../Data/DataManager'

export default function Offer({ route, navigation }) {

    const [offerData, setOfferData] = useState([])
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getData()
    }, [])

    const getData = React.useCallback(() => {
        setRefreshing(true);
        DataBaseManager.fetchData('Offer', (data) => {
            setOfferData(data)
            setRefreshing(false);
        })
    })

    const openRequestPage = () => {
        navigation.navigate('RequestModal', {ride: 'Offer'})
    }

    return (
        <View style={{ flex: 1 }}>
                {
                offerData.length == 0 ?
                <View style={{flex:1, justifyContent: 'center', alignItems:'center', }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
                    // TODO show no data when []
                    // <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    //     <Text>NO DATA TO DISPLAY</Text>
                    // </View>
                    :
                    <FlatList
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getData} />}
                        data={offerData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => <CardView ride={item} />}
                    />
            }
            <View style={styles.addRequest}>
            <TouchableOpacity style={styles.TouchableOpacityStyle} onPress={openRequestPage}>
                    <Image style={{width: 50, height: 50}} source={require('../../Assets/add.png')}/>
                </TouchableOpacity>
            </View>  
        </View>
    )
}

const styles = StyleSheet.create({
  addRequest: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
  },
});