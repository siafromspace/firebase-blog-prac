import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCbUoMlo_1s7YzPcOiwcsf2N7Ul0N_NT6g",
  authDomain: "blogpractice-270a0.firebaseapp.com",
  projectId: "blogpractice-270a0",
  storageBucket: "blogpractice-270a0.appspot.com",
  messagingSenderId: "271956311310",
  appId: "1:271956311310:web:c8985c6afab8d0be732b5f",
  measurementId: "G-VJQRXLSHXB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
