// import { firebase as firebaseApp } from 'firebase/app';
import { getAuth, GithubAuthProvider } from 'firebase/auth';
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";



const config = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
};
// if(!firebase.initializeApp(config)){
const firebase = initializeApp(config);
const fireStorage = getStorage(firebase);
const auth = getAuth(firebase);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();

export default firebase;
export { auth, fireStorage, googleProvider, facebookProvider, githubProvider };