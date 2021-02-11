import firebase from 'firebase'
//import 'firebase/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyDeSoSQ4cUR4Cb1-z70-Mha2D6sNzV9I_g',
    authDomain: 'veraoffice-13.firebaseapp.com',
    databaseURL: 'https://veraoffice-13.firebaseio.com',
    projectId: 'veraoffice-13',
    storageBucket: 'veraoffice-13.appspot.com',
    messagingSenderId: '640676193345',
    appId: '1:640676193345:web:90d776340e948e155fd2c0'
}

try {
    firebase.initializeApp(firebaseConfig)
} catch(err){
    if (err) { 
        //setError({code: err.code, message: err.message})
        console.log('Firebase initialization error: ', {code: err.code, message: err.message})
    } // , info: err.stack
}
  

const Fire = firebase
export default Fire