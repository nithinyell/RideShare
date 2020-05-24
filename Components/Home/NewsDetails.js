import * as React from 'react';
import { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';
import NewsCard from './NewsCard';
import Theme from '../Utils/Theme';
import { WebView } from 'react-native-webview';

export default function NewsDetails({route, navigation}) {
    return(
        <WebView
            source={{ uri: route.params.uri }} />
    )
}