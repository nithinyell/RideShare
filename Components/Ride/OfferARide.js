import * as React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function OfferARide({ route, navigation }) {

    const openRequestPage = () => {
        console.log("OPen page request")
    }

    return (
        <TouchableOpacity onPress={() => openRequestPage()}>
            <Text>Offer A Ride</Text>
        </TouchableOpacity>
    )
}