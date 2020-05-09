import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, Button, SafeAreaView } from 'react-native';
import auth from '@react-native-firebase/auth';
import AuthManager from './Auth/UserAuth';

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
    <SafeAreaView>
      <View>
        <TextInput onChangeText={text => setUserphoneNumber(text)} />
        <Button
          title="Phone Number Sign In"
          onPress={() => signInWithPhoneNumber("+15413712599")}
        />
      </View>
    </SafeAreaView>
  )
}