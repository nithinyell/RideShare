import auth from '@react-native-firebase/auth';

const AuthManager = {

    currentUser: function() {
        if (auth().currentUser) {
            return auth().currentUser._user
        }

        return ''
    },

    signInWithPhoneNumber: async function (phoneNumber) {
        try {
            let signIn = await auth().signInWithPhoneNumber(phoneNumber)
            return signIn
        } catch (error) {
            throw error
        }
    },

    signOut: function (callBack) {
        auth().signOut().then(() => callBack(true))
    }
}

export default AuthManager