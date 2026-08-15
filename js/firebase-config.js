// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-PO1Q-ySiI5-TttJ3cmOc4rPhnjPtsM4",
  authDomain: "edupath-327c3.firebaseapp.com",
  projectId: "edupath-327c3",
  storageBucket: "edupath-327c3.firebasestorage.app",
  messagingSenderId: "824523263230",
  appId: "1:824523263230:web:c4d7bc4f11e6a24e21e9af",
  measurementId: "G-DEL1MF35ES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);