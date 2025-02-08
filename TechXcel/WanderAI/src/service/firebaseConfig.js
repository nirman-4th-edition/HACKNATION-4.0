// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3htr0CVgKhXJn-CdGg2TtWymP_ux5XvU",
  authDomain: "wander-ai-41525.firebaseapp.com",
  projectId: "wander-ai-41525",
  storageBucket: "wander-ai-41525.firebasestorage.app",
  messagingSenderId: "596349091084",
  appId: "1:596349091084:web:8d7bb836d2fa0d59c4dd29"  
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

 

