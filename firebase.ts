import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSy...xyz",
  authDomain: "instituto-novo-milenio.firebaseapp.com",
  projectId: "instituto-novo-milenio",
  storageBucket: "instituto-novo-milenio.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdefg12345"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
