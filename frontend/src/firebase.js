// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0N6NSdeL1Cn7R6kdnKjccBaL7KpZP_JE",
  authDomain: "fir-auth-1132-ee680.firebaseapp.com",
  projectId: "fir-auth-1132-ee680",
  storageBucket: "fir-auth-1132-ee680.appspot.com",
  messagingSenderId: "82539002946",
  appId: "1:82539002946:web:c1222cc6333850a347c1db",
  measurementId: "G-D1Q9DC6919"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export {app,auth,signOut};