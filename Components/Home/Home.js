import * as React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

export default function Home({ route, navigation }) {

    const {userName} = route.params
    return (
        <SafeAreaView>
            <Text>Hai {userName}</Text>
        </SafeAreaView>
    )
}