// import { firebase as firebaseApp } from 'firebase/app';
import { getAuth, GithubAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";



const config = {
    apiKey: "AIzaSyDJZSxlOyJn1FSWTxsTLnMqbiV7X4oMfGo",
    authDomain: "first-web-91c0f.firebaseapp.com",
    projectId: "first-web-91c0f",
    storageBucket: "first-web-91c0f.appspot.com",
    messagingSenderId: "541812255026",
    appId: "1:541812255026:web:ec4d42930ce3b297758f2b",
    measurementId: "G-QLGXJM045W"
};
// if(!firebase.initializeApp(config)){
const firebase = initializeApp(config);

const auth = getAuth(firebase);
const db = getFirestore(firebase);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();

export default firebase;
export { auth, db, googleProvider, facebookProvider, githubProvider };