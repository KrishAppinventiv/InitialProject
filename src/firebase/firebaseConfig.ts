import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, initializeAuth, signInWithCredential } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyAsTYMh7QtzLEsqpKB5R4EtwW9a9OF8X48",
  authDomain: "initialproject-96c09.firebaseapp.com", 
  projectId: "initialproject-96c09",
  storageBucket: "initialproject-96c09.firebasestorage.app",
  messagingSenderId: "652050946157", 
  appId: "1:652050946157:android:56cea297c1c34b9d264764" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const signInWithFirebaseCredential = signInWithCredential;
export default app;

