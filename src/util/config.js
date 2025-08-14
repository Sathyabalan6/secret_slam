// src/util/config.js
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

// Firebase configuration
export const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Optional image compression config
export const imageConfig = {
    quality: 0.7,
    maxWidth: 800,
    maxHeight: 600,
    autoRotate: true
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Export services
export const auth = firebase.auth();
export const db = firebase.firestore();
export const rtdb = firebase.database();
export const storage = firebase.storage();
export { app }; // <-- This line was missing
