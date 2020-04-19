import React, {useState} from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, Button } from 'react-native';
import auth from '@react-native-firebase/auth';

// ToDo: https://rnfirebase.io/auth/phone-auth
// https://github.com/nithinyell/react-native-firebase
export default function Login() {

    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('');

    async function signInWithPhoneNumber(phoneNumber) { 
        console.log("**** SignIn Pressed")
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber)
        setConfirm(confirmation);
    }

    async function confirmCode() {
        try {
          await confirm.confirm(code);
          console.log("SuccessFull")
        } catch (error) {
          console.log('Invalid code.');
        }
    }

    if (!confirm) {
        return (
          <Button
            title="Phone Number Sign In"
            onPress={() => signInWithPhoneNumber('+91 9618833467')}
          />
        );
    }

  return (
    <>
      <TextInput value={code} onChangeText={text => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </>
  );
}