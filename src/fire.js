import firebase from 'firebase'
var config = {
  apiKey: "AIzaSyDOzchAuvX5B6frKKPU6fKuAVgM-trj878",
    authDomain: "antibuddy-6db24.firebaseapp.com",
    databaseURL: "https://antibuddy-6db24.firebaseio.com",
    projectId: "antibuddy-6db24",
    storageBucket: "antibuddy-6db24.appspot.com",
    messagingSenderId: "937692711353"
};
var fire = firebase.initializeApp(config);
export default fire;