import * as React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';

export default function CardView({ride}) {

    return (
        <View style={styles.cardStyle}>
            <View style={{ felx: 0.5, flexDirection:'row' }}>
                <View style={{ flex: 0.45}}>
                    <Text style={{fontSize: 15, fontWeight: '600'}}>{ride.origin}</Text>
                </View>
                <View style={{flex: 0.1, alignItems: 'center'}}>
                    <Text>--></Text>
                </View>
                <View style={{flex: 0.45}}>
                    <Text style={{fontSize: 15, fontWeight: '600'}}>{ride.destination}</Text>
                </View>
            </View>
            <View style={{flex: 0.5}}>
                <Text>HAI</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    cardStyle: {
        flex: 1,
        //backgroundColor: 'red', 
        padding: 10, 
        marginTop: 10, 
        borderRadius: 7, 
        marginRight: 7, 
        marginLeft: 7,
        borderColor:'grey', // if you need 
        borderWidth:1,
        overflow: 'hidden',
        shadowColor: 'blue',
        shadowRadius: 15,
        shadowOpacity: 0.5,
    }
})