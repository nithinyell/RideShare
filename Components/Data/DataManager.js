import database from '@react-native-firebase/database';
import AuthManager from '../Auth/UserAuth';

var randomNumber = Math.floor(Math.random() * 100) + 1
let reference = '/TEST/' + randomNumber + '/'
let poolReference = database().ref(reference)
var fetchReference = database().ref('/TEST')
var userId = AuthManager.currentUser().uid

export function sendData(origin, destination, date, completion) {
    poolReference.set({
        origin: origin.name,
        destination: destination.name,
        location: {
            origin: origin.location,
            destination: destination.location
        },
        journeyDate: date,
        requestRaisedDate: new Date()
    }).then(() => completion(true))
}

export function fetchData(completion) {
    var userData = []
    fetchReference.on('value', snapshot => {
        var data = snapshot.val()
        Object.keys(data).map(key => {
            userData.push(data[key])
        })

        if (userData) {
            completion(userData)
        }
    })
}