import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// ToDo: https://rnfirebase.io/auth/phone-auth
// https://github.com/nithinyell/react-native-firebase
export default function Login({ navigation }) {

  const [confirm, setConfirm] = useState(false);
  const [code, setCode] = useState('');
  const [user, setUser] = useState(null);
  const [userPhoneNumber, setUserphoneNumber] = useState(null)

  useEffect(() => {
    auth().onAuthStateChanged(onAuthStateChanged)
  })

  async function signInWithPhoneNumber(phoneNumber) {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber)
      setConfirm(confirmation);
    } catch (error) {
      console.log("error", error)
    }
  }

  function onAuthStateChanged(rawUser) {
    if (rawUser) {
      if (rawUser.displayName) {
        setUser(rawUser.displayNameer);
      } else {
        setUser(rawUser.phoneNumber)
      }
      navigation.navigate('Home', {
        userName: "Sai Ram"
      })
    } else {
      setConfirm(false)
    }
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
      auth().onAuthStateChanged(onAuthStateChanged)
    } catch (error) {
      console.log('Invalid code.', error);
    }
  }

  if (user) {
    return (
      <View>
        <Text>Hi {user}</Text>
      </View>
    )
  } else {
    if (confirm) {
      return (
        <>
          <TextInput style={{ borderColor: 'red', borderRadius: 1, backgroundColor: 'red', width: 60 }} value={code} onChangeText={text => setCode(text)} />
          <Button title="Confirm Code" onPress={() => confirmCode()} />
        </>
      )
    } else {
      return (
        <View>
          <TextInput onChangeText={text => setUserphoneNumber(text)} />
          <Button
            title="Phone Number Sign In"
            onPress={() => signInWithPhoneNumber("+15413712599")}
          />
        </View>
      )
    }
  }
}