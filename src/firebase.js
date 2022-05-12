import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCp1fdnpM6_yiS6hbti1vbvbPqp4Y3fOpY",
    authDomain: "crud-oscar.firebaseapp.com",
    databaseURL: "https://crud-oscar .firebaseio.com",
    projectId: "crud-oscar",
    storageBucket: "crud-oscar.appspot.com",
    messagingSenderId: "1085315457737",
    appId: "1:1085315457737:web:674b543e6c20202e4ea318"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export {firebase}