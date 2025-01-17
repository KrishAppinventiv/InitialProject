import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithCredential } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAsTYMh7QtzLEsqpKB5R4EtwW9a9OF8X48", // From `api_key` in google-services.json
  authDomain: "initialproject-96c09.firebaseapp.com", // Replace "projectId" with your project ID
  projectId: "initialproject-96c09",
  storageBucket: "initialproject-96c09.firebasestorage.app", // From `storage_bucket` in google-services.json
  messagingSenderId: "652050946157", // From `project_number` in google-services.json
  appId: "1:652050946157:android:56cea297c1c34b9d264764" // From `mobilesdk_app_id` in google-services.json
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const signInWithFirebaseCredential = signInWithCredential;
export default app;
