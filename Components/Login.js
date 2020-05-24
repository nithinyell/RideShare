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
      <SafeAreaView>
        <View>
          <TextInput style={{ borderColor: 'red', borderRadius: 1, backgroundColor: 'red', width: 60 }} value={code} onChangeText={text => setCode(text)} />
          <Button title="Confirm Code" onPress={() => confirmCode()} />
        </View>
      </SafeAreaView>
    )
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
        <TextInput style={{ height:30}} onChangeText={(text) => setUserphoneNumber(text)} keyboardType='number-pad' placeholder='# Phone' placeholderTextColor='#fff' fontFamily={Theme.FONTFAMILY} fontSize={20} color='#fff'/>
        <View style={{backgroundColor: '#F7DC6F', height: 5}}></View>
        <TouchableOpacity onPress={() => signInWithPhoneNumber('+15413712599')}>
          <Text style={{fontFamily: Theme.FONTFAMILY, fontSize: 22, color: '#F2F4F4'}}>
            Phone Number Sign In
          </Text>
        </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}