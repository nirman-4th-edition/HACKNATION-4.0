import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBn08v9uenrlG9ujU-Ccy10wev1qjlxhhI",
  authDomain: "mayday-5ea3d.firebaseapp.com",
  projectId: "mayday-5ea3d",
  storageBucket: "mayday-5ea3d.firebasestorage.app",
  messagingSenderId: "1034021606903",
  appId: "1:1034021606903:web:b99257f16b19c16e7a4af2",
  measurementId: "G-GHBJYMN2YJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
