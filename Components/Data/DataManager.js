import database from '@react-native-firebase/database';
import AuthManager from '../Auth/UserAuth';

var userId = AuthManager.currentUser().uid
let globalReference = userId + '/'
let globalDataBase = database()
// let acceptReference = '/Accept/' + userId + randomNumber + '/'
// let seekReference = '/Seek/' 
// let poolReference = database().ref(reference)
// var fetchReference = database().ref('/TEST')

export function sendData(origin, destination, date, ref, completion) {

    var randomNumber = Math.floor(Math.random() * 100) + 1

    let reference = globalDataBase.ref(`${ref}/` + randomNumber + '/')
    console.warn(reference)
    reference.set({
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

export function fetchData(ref, completion) {

    var userData = []
    let reference = globalDataBase.ref('/' + `${ref}`)
    console.warn(reference)
    reference.on('value', snapshot => {
        var data = snapshot.val()
        console.log("***", data)
        Object.keys(data).map(key => {
            userData.push(data[key])
        })

        if (userData) {
            completion(userData)
        }
    })
}