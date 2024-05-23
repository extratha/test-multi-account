// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbhlK4qGnGaYTnoe_b1Ax1NsqVhu2y6Fg",
  authDomain: "cariva-playground-dev.firebaseapp.com",
  projectId: "cariva-playground-dev",
  storageBucket: "cariva-playground-dev.appspot.com",
  messagingSenderId: "239529071608",
  appId: "1:239529071608:web:5d31b10f8145102e82bc0d",
  measurementId: "G-QGY9TN7LQ1"
};

// Initialize Firebase
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const analytics = getAnalytics(app);