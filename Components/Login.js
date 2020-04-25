import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, Button } from 'react-native';
import auth from '@react-native-firebase/auth';

// ToDo: https://rnfirebase.io/auth/phone-auth
// https://github.com/nithinyell/react-native-firebase
export default function Login() {

  const [confirm, setConfirm] = useState(false);
  const [code, setCode] = useState('');
  const [user, setUser] = useState(null);
  const [userPhoneNumber, setUserphoneNumber] = useState(null)

  async function signInWithPhoneNumber(phoneNumber) {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber)
      setConfirm(confirmation);
    } catch (error) {
      console.log("error", error)
    }
  }

  function onAuthStateChanged(user) {
    if (user.displayName) {
      setUser(ususer.displayNameer);
    } else {
      setUser(user.phoneNumber)
    }
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
      const sub = auth().onAuthStateChanged(onAuthStateChanged)
      console.log(sub)
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