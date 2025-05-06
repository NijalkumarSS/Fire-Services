// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDULPN94rp_u6F8iDYN_hKDw1bnV8CqwsA",
  authDomain: "fire-services-a8b32.firebaseapp.com",
  projectId: "fire-services-a8b32",
  storageBucket: "fire-services-a8b32.firebasestorage.app",
  messagingSenderId: "817590896886",
  appId: "1:817590896886:web:408c50749168b467b1c4d7",
  measurementId: "G-982G4XGSR4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);