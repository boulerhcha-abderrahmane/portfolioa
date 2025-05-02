import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBjyJ9_e6LBoeREi5H8L7yWYl_b5kMfbzQ",
  authDomain: "portfolio-f07fc.firebaseapp.com",
  projectId: "portfolio-f07fc",
  storageBucket: "portfolio-f07fc.firebasestorage.app",
  messagingSenderId: "763436687477",
  appId: "1:763436687477:web:f185fadfdc5f1eb6aad83c",
  measurementId: "G-PW1Y8DJCSS"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser Firestore
export const db = getFirestore(app);

export default app; 