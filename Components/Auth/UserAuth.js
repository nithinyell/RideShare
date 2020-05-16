import auth from '@react-native-firebase/auth';

const AuthManager = {

    currentUser: function() {
        return auth().currentUser._user
    },

    signInWithPhoneNumber: async function (phoneNumber) {
        try {
            let signIn = await auth().signInWithPhoneNumber(phoneNumber)
            return signIn
        } catch (error) {
            console.log("Error", error)
            return error
        }
    },

    signOut: function (callBack) {
        auth().signOut().then(() => callBack(true))
    }
}

export default AuthManager