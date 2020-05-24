import * as React from 'react';
import { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, Image, ImageBackground, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Theme from '../Utils/Theme';

export default class NewsCard extends React.PureComponent {
    render() {
        return (
            <TouchableOpacity style={styles.card}>
                <Image style={styles.cardImage} source={{uri: this.props.data.urlToImage}}/>
                <Text style={styles.cardTitle}>{this.props.data.title}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        marginBottom: 10,
        marginLeft: '2%',
        width: '95%',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 0.1,
        shadowOffset: {
            width: 3,
            height: 3
        }
    },
    cardImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover'
    },
    cardTitle: {
        fontFamily: Theme.FONTFAMILY,
        fontSize: 16,
        padding: 7
    }, 
})