import * as React from 'react';
import { View, Text, SafeAreaView, Button, ImageBackground, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';
import database from '@react-native-firebase/database';
import AuthManager from '../Auth/UserAuth';
import Theme from '../Utils/Theme';

export default function Profile({ route, navigation }) {

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <View style={{marginRight: 10}}>
              <Button title="Sign Out" onPress={() => logout()} />
            </View>
          ),
        });
    })
    
    function logout() { 
        AuthManager.signOut((res) => {
            if (res) {
                navigation.navigate('Login')
            }
        })
    }

    return (
        <View style={{justifyContent: 'center', alignItems:'center',  borderRadius: 100}}>
            <Image style={{width: 300, height: 300,  borderRadius: 150, marginTop: 10}} source={{uri: 'https://picsum.photos/200?random=1'}}/>
            <Text style={{fontFamily: Theme.FONTFAMILY, fontSize: 20, marginTop: 20}}>Hi User !!</Text>
        </View>
    )
}