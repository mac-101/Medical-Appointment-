
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDvSuxyCBEv-l9XSP6gHHCO-lyPS1GzdYs",
  authDomain: "vite-store.firebaseapp.com",
  projectId: "vite-store",
  storageBucket: "vite-store.firebasestorage.app",
  messagingSenderId: "716813431197",
  appId: "1:716813431197:web:549399a0044fdb42be3f74",
  measurementId: "G-W2JLF3HM2Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getDatabase(app)

export{analytics, auth, db}
