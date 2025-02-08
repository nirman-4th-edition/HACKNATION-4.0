/* eslint-disable no-unused-vars */
// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAP_woqgsF4RpHOl56pbczSVc6CVuP95rM",
  authDomain: "ai-vechile.firebaseapp.com",
  databaseURL: "https://ai-vechile-default-rtdb.firebaseio.com",
  projectId: "ai-vechile",
  storageBucket: "ai-vechile.appspot.com",
  messagingSenderId: "486008885410",
  appId: "1:486008885410:web:2799b4957bafcffb27c7fb",
  measurementId: "G-WQC5VEM4FK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
