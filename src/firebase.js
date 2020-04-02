import * as firebase from "firebase";
import firebaseConfig from "./env"

firebase.initializeApp(firebaseConfig);
const firebaseDB = firebase.database();
const googleAuth = new firebase.auth.GoogleAuthProvider();


export  {
  firebase,
  firebaseDB,
  googleAuth
}
