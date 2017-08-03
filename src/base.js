import Rebase from "re-base";
import firebase from "firebase";
const config = {
  apiKey: "AIzaSyDOzchAuvX5B6frKKPU6fKuAVgM-trj878",
  authDomain: "antibuddy-6db24.firebaseapp.com",
  databaseURL: "https://antibuddy-6db24.firebaseio.com"
};

const base = Rebase.createClass(
  firebase.initializeApp(config, "base").database()
);
export default base;
