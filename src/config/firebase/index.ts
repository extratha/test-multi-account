// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { staticEnvConfig } from "@/constant/env";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: staticEnvConfig.firebase.apiKey,
  authDomain: staticEnvConfig.firebase.authDomain,
  projectId: staticEnvConfig.firebase.projectId,
  storageBucket: staticEnvConfig.firebase.storageBucket,
  messagingSenderId: staticEnvConfig.firebase.messagingSenderId,
  appId: staticEnvConfig.firebase.appId,
  measurementId:staticEnvConfig.firebase.measurementId
};

// Initialize Firebase
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const analytics = (typeof window !== "undefined") ? getAnalytics(app) : undefined;