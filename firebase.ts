// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with your app's Firebase configuration
// Your web app's Firebase configuration that you already pasted
const firebaseConfig = {
  apiKey: "AIzaSyAELCHfYJt276mMMc0t-nYMUwXVy-LsZQs",
  authDomain: "novo-milenio-af70f.firebaseapp.com",
  projectId: "novo-milenio-af70f",
  storageBucket: "novo-milenio-af70f.firebasestorage.app",
  messagingSenderId: "492120847231",
  appId: "1:492120847231:web:2e28c1056dce03ddf4a04a",
  measurementId: "G-XV9EJFYHDB"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase services so they can be used in other files
export const auth = getAuth(app);
export const db = getFirestore(app);
