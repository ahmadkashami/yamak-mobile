import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getAuth, PhoneAuthProvider } from "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9IjeD5lJt9MIShUvx7zq5IDZTjblYNdM",
  authDomain: "yamak-85490.firebaseapp.com",
  projectId: "yamak-85490",
  storageBucket: "yamak-85490.appspot.com",
  messagingSenderId: "484602704978",
  appId: "1:484602704978:web:eab76c40cfd04934ef1b8b"
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
const myapp = getApp();
const FireBaseAuth = getAuth(myapp);
const firestore = getFirestore(myapp);
// console.log(app.options);
export { app, myapp, PhoneAuthProvider, FireBaseAuth };
