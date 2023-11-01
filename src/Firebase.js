// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbQSDIQWRzxWsQBaYYRkh7yemK1UXGWXU",
  authDomain: "soccersphere-fptu.firebaseapp.com",
  projectId: "soccersphere-fptu",
  storageBucket: "soccersphere-fptu.appspot.com",
  messagingSenderId: "1000802415443",
  appId: "1:1000802415443:web:59804b7444b90f56f427a6",
  measurementId: "G-WT95V2RV90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 // eslint-disable-next-line 
const analytics = getAnalytics(app);
export const auth = getAuth();