// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKvtF3hZa1g4sVgYvX9Dt0kqelbFLTFmc",
  authDomain: "health-core-aa7d6.firebaseapp.com",
  projectId: "health-core-aa7d6",
  storageBucket: "health-core-aa7d6.firebasestorage.app",
  messagingSenderId: "397342859173",
  appId: "1:397342859173:web:56211a8d5fa40217c9924c",
  measurementId: "G-J9TCWJVRHC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)

export{analytics, auth}