import * as React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';

export default function SeekARide({ route, navigation }) {

    const openRequestPage = () => {
        console.log("Open page request")
        navigation.navigate('RequestModal')
    }

    return (
        <TouchableOpacity onPress={() => openRequestPage()}>
            <Text>Raise a Request</Text>
        </TouchableOpacity>
    )
}