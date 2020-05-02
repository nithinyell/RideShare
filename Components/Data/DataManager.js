// import database from '@react-native-firebase/database';
// import AuthManager from '../Auth/UserAuth';

// // const DataManager = {

// //     sendData: function () {
// //         database.ref(poolReference).set({
// //             from: "HYD",
// //             to: "CHENNAI",
// //             date: "22/02/2021"
// //         }).
// //     }
// // }

// // export default DataManager

// export default function DataManager() {

//     const poolReference = poolReference = '/Pools/' + AuthManager.currentUser().uid + '/'
    
//     const sendData = () => {
//         database().ref(poolReference).set({
//             from: "HYD",
//             to: "CHENNAI",
//             date: "22/02/2021"
//         }).then(() => {console.log("data Sent")})
//     }
// }