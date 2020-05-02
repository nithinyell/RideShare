import auth from '@react-native-firebase/auth';

const AuthManager = {

    currentUser: function() {
        return auth().currentUser
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

    signOut: function() {
        
    }
}

export default AuthManager