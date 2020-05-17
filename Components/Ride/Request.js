import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Button, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler';
import RNGooglePlaces from 'react-native-google-places';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import DateTimePicker from '@react-native-community/datetimepicker';

import * as common from '../Utils/Common'
import * as DataBaseManager from '../Data/DataManager'

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

    useEffect(() => {
        // TODO Geolocation.getCurrentPosition(info => setCurrentLocation(info.coords));
    }, [currentLocation])

    const sendData = () => {
        if (origin != '' && destination != '') {
            DataBaseManager.sendData(origin, destination, date, (res) => {
                if (res) {
                    navigation.goBack()
                } else {
                    // TODO show that save to FB is fail
                }
            })
        } else {
            // TODO Display toast
        }
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
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            </View>
        )
    }

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <View style={{ flex: 0.2, }}>
                <View style={{flexDirection: 'row', flex: 1}}>
                    <View style={{justifyContent: 'center', flex: 0.8}}>
                        <Text style={{ fontWeight: 'bold' }}>Raise Request</Text>
                    </View>
                    <View style={{ flex: 0.2 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={{ color: 'blue' }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
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