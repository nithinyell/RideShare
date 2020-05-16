import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Button, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler';
import RNGooglePlaces from 'react-native-google-places';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import database from '@react-native-firebase/database';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as common from '../Utils/Common'

// https://aboutreact.com/react-native-map-example/

export default function Request({ route, navigation }) {

    const GOOGLE_MAPS_APIKEY = 'AIzaSyDg53FfhFAKxa4R-q7RLnHqS5IAurn2wmU';
    const [lat, setLat] = useState('')
    const [lon, setlon] = useState('')
    const [currentLocation, setCurrentLocation] = useState(null)
    const [origin, setOrigin] = useState('')
    const [destination, setDestination] = useState('')

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    var randomNumber = Math.floor(Math.random() * 100) + 1
    let reference = '/Pool/' + randomNumber + '/'
    let poolReference = database().ref(reference)

    useEffect(() => {
        // TODO Geolocation.getCurrentPosition(info => setCurrentLocation(info.coords));
    }, [currentLocation])

    const sendData = () => {

        if (origin != '' && destination != '')
            poolReference.set({
                origin: origin.name,
                destination: destination.name,
                location: {
                    origin: origin.location,
                    destination: destination.location
                },
                date: new Date()
            }).then(() => navigation.goBack())
        else
            // TODO Display an alert
            console.warn("ORIGIN AND DEST MUST BE SET")
    }

    function androidDatePicker() {
        return (
            <>
                {show && (
                    <DateTimePicker
                        minimumDate={new Date()}
                        maximumDate={common.getMaxDate()}
                        timeZoneOffsetInMinutes={0}
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display='spinner'
                        onChange={onChange}
                    />
                )}
            </>
        )
    }

    iOSDatePicker = () => {
        return (
            <View>
                <DateTimePicker
                    minimumDate={new Date()}
                    maximumDate={common.getMaxDate()}
                    timeZoneOffsetInMinutes={0}
                    value={date}
                    mode='datetime'
                    display="default"
                    onChange={onChange}
                />
            </View>
        )
    }

    return (
        <View style={{ flex: 1, padding: 10 }}>

            <View style={{ flex: 0.2, alignItems: 'center', }}>
                <View style={{}}>
                    <Text style={{ fontWeight: 'bold' }}>Raise Request</Text>
                </View>

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
                    <View style={{ flex: 0.5, backgroundColor: '#D98880' }}>
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
            <View>
                <TouchableNativeFeedback onPress={showDatepicker}>
                    <Text>Date: {common.dateFormatter(date).date}</Text>
                </TouchableNativeFeedback>
            </View>
            <View>
                <TouchableNativeFeedback onPress={showTimepicker}>
                    <Text>Time: {common.dateFormatter(date).time}</Text>
                </TouchableNativeFeedback>
            </View>
            {
                Platform.OS === 'android' ? androidDatePicker() : null
            }
            {
                Platform.OS === 'ios' ?
                    <View style={{ flex: 0.3 }}>
                        <View>
                            {
                                Platform.OS === 'ios' ?
                                    iOSDatePicker() : null
                            }
                        </View>
                    </View> : null
            }
            <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => sendData()}>
                    <Text style={{ fontWeight: '400', fontSize: 25 }}>Confirm</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 0.3 }}>
                {/* <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    }}
                    customMapStyle={mapStyle}
                >
                    <MapViewDirections origin={origin.location} destination={destination.location} apikey={GOOGLE_MAPS_APIKEY} />
                </MapView> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
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