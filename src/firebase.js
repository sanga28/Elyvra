// firebase.js
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  GithubAuthProvider 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdO5i2yfEuoGbbx5ZEkjjK9UQMjIskt4A",
  authDomain: "elyvra-b0449.firebaseapp.com",
  projectId: "elyvra-b0449",
  storageBucket: "elyvra-b0449.firebasestorage.app",
  messagingSenderId: "256060471623",
  appId: "1:256060471623:web:51f9d322af12361da43462"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export Auth & Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

// ✅ Providers
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
