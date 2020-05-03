import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import MapView, {Marker} from 'react-native-maps'
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNGooglePlaces from 'react-native-google-places';
import Geolocation from '@react-native-community/geolocation';

// https://aboutreact.com/react-native-map-example/

export default function Request({ route, navigation }) {

    const [lat, setLat] = useState('')
    const [lon, setlon] = useState('')
    const [origin, setOrigin] = useState('')
    const [destination, setDestination] = useState('')

    useEffect(() => {
        // TO capture user current location
        // Geolocation.getCurrentPosition((info) => {
        //     //console.log(info)
        // })
    })

    var mapStyle=[{"elementType": "geometry", "stylers": [{"color": "#242f3e"}]},{"elementType": "labels.text.fill","stylers": [{"color": "#746855"}]},{"elementType": "labels.text.stroke","stylers": [{"color": "#242f3e"}]},{"featureType": "administrative.locality","elementType": "labels.text.fill","stylers": [{"color": "#d59563"}]},{"featureType": "poi","elementType": "labels.text.fill","stylers": [{"color": "#d59563"}]},{"featureType": "poi.park","elementType": "geometry","stylers": [{"color": "#263c3f"}]},{"featureType": "poi.park","elementType": "labels.text.fill","stylers": [{"color": "#6b9a76"}]},{"featureType": "road","elementType": "geometry","stylers": [{"color": "#38414e"}]},{"featureType": "road","elementType": "geometry.stroke","stylers": [{"color": "#212a37"}]},{"featureType": "road","elementType": "labels.text.fill","stylers": [{"color": "#9ca5b3"}]},{"featureType": "road.highway","elementType": "geometry","stylers": [{"color": "#746855"}]},{"featureType": "road.highway","elementType": "geometry.stroke","stylers": [{"color": "#1f2835"}]},{"featureType": "road.highway","elementType": "labels.text.fill","stylers": [{"color": "#f3d19c"}]},{"featureType": "transit","elementType": "geometry","stylers": [{"color": "#2f3948"}]},{"featureType": "transit.station","elementType": "labels.text.fill","stylers": [{"color": "#d59563"}]},{"featureType": "water","elementType": "geometry","stylers": [{"color": "#17263c"}]},{"featureType": "water","elementType": "labels.text.fill","stylers": [{"color": "#515c6d"}]},{"featureType": "water","elementType": "labels.text.stroke","stylers": [{"color": "#17263c"}]}];        
    
    return (
        <View style={{ flex: 1, padding: 10 }}>
            
            <View style={{ flex: 0.7, alignItems: 'center', }}>
                <Text>Raise Request</Text>

                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <View style={{ flex: 0.5, backgroundColor: '#82E0AA' }}>
                        <TouchableOpacity onPress={() => {
                            RNGooglePlaces.openAutocompleteModal()
                                .then((place) => {
                                    setOrigin(place)
                                })
                                .catch(error => console.log(error.message));
                        }}>
                            <Text style={styles.header}>From:</Text>
                        </TouchableOpacity>
                    <Text style={styles.subheader}>{origin != '' ? origin.name : 'Not Set'}</Text>
                    </View>
                    <View style={{ flex: 0.5, backgroundColor: '#D98880'}}>
                        <TouchableOpacity onPress={() => {
                            RNGooglePlaces.openAutocompleteModal()
                                .then((place) => {
                                    setDestination(place)
                                })
                                .catch(error => console.log(error.message));
                        }}>
                            <Text style={styles.header}>To:</Text>
                        </TouchableOpacity>
                    <Text style={styles.subheader}>{destination != '' ? destination.name : 'Not Set'}</Text>
                    </View>
                </View>
            </View>
            <View style={{ flex: 0.3 }}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    }}
                    customMapStyle={mapStyle}
                >
                    <Marker
                        draggable
                        coordinate={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                        }}
                        onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
                        title={'Test Marker'}
                        description={'This is a description of the marker'}
                    />
                </MapView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      position:'absolute',
      top:0,
      left:0,
      right:0,
      bottom:0,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    map: {
      position:'absolute',
      top:0,
      left:0,
      right:0,
      bottom:0,
    },
    header: {
        fontSize: 25,
        marginLeft: 5
    },
    subheader: {
        fontSize: 22,
        marginLeft: 5
    }
  });