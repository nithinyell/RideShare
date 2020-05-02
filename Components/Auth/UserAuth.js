import auth from '@react-native-firebase/auth';

const AuthManager = {

    currentUser: function() {
        return auth().currentUser
    },

    signInWithPhoneNumber: async function (phoneNumber) {
        try {
            let signIn = await auth().signInWithPhoneNumber(phoneNumber)
            console.log("signInWithPhoneNumber", signIn)
        } catch (error) {
            console.log("Error", error)
        }
    },

    onAuthStateChanged: function() {
        auth().onAuthStateChanged((user) => {
            return user
        })
    },

    isSignedIn: function() {

    },

    signOut: function() {

    }
}

export default AuthManager