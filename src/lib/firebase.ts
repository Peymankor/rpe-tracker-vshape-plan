// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCo5i0Tmr7DopQwnAwSL8PvEJkUdvVAmTs",
  authDomain: "v-shape-af8b1.firebaseapp.com",
  projectId: "v-shape-af8b1",
  storageBucket: "v-shape-af8b1.firebasestorage.app",
  messagingSenderId: "837848690491",
  appId: "1:837848690491:web:b1360f24a19d141316911e",
  measurementId: "G-4806C29BG3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);