import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, Button, SafeAreaView, ImageBackground, Dimensions } from 'react-native';
import auth from '@react-native-firebase/auth';
import AuthManager from './Auth/UserAuth';
import Theme from './Utils/Theme';

export default function Login({ navigation }) {

  const [confirm, setConfirm] = useState(false);
  const [code, setCode] = useState('');
  const [userPhoneNumber, setUserphoneNumber] = useState(null)

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('Ride Share', {
          screen: 'Home',
          params: {
            screen: 'Home',
            params: {
            }
          }
        })
      }
    })
  })

  async function signInWithPhoneNumber(phoneNumber) {
    try {
      const confirmation = await AuthManager.signInWithPhoneNumber(phoneNumber)
      setConfirm(confirmation);
    } catch (error) {
      console.log("error", error)
    }
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code) //Confirm("Code") from FBase
    } catch (error) {
      console.log('Invalid code.', error);
    }
  }

  if (confirm) {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          style={{
            flex: 1,
            width: '100%',
            height: Dimensions.get('screen').height,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          source={require('./../Assets/car.jpg')}>
          <View>
            <TextInput
              style={{height: 50, color: '#fff'}}
              onChangeText={(text) => setUserphoneNumber(text)}
              keyboardType="number-pad"
              placeholder="# Pass Code"
              placeholderTextColor="#fff"
              fontFamily={Theme.FONTFAMILY}
              fontSize={20}
              value={code} 
              onChangeText={text => setCode(text)}
            />
            <View style={{backgroundColor: '#F7DC6F', height: 5}}></View>
            <TouchableOpacity
              onPress={() => confirmCode()}>
              <Text
                style={{
                  fontFamily: Theme.FONTFAMILY,
                  fontSize: 22,
                  color: '#F2F4F4',
                }}>
                Confirm Code
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  } 

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        style={{
          flex: 1,
          width: '100%',
          height: Dimensions.get('screen').height,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        source={require('./../Assets/vw.jpg')}>
        <View>
        <TextInput style={{ height:50, color: '#fff'}} onChangeText={(text) => setUserphoneNumber(text)} keyboardType='number-pad' placeholder='# Phone' placeholderTextColor='#fff' fontFamily={Theme.FONTFAMILY} fontSize={20}/>
        <View style={{backgroundColor: '#F7DC6F', height: 5}}></View>
        <TouchableOpacity onPress={() => signInWithPhoneNumber('+91' + userPhoneNumber)}>
          <Text style={{fontFamily: Theme.FONTFAMILY, fontSize: 22, color: '#F2F4F4'}}>
            Phone Number Sign In
          </Text>
        </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}