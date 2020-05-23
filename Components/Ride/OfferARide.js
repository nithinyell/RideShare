import * as React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, Button } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

export default function OfferARide({ route, navigation }) {

    const openRequestPage = () => {
        navigation.navigate('RequestModal', {rideStyle: 'Seek A Ride'})
    }

    return (
        <View style={{ flex: 1 }}>
                {/* {
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
            } */}
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