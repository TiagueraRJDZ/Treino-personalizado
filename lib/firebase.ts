import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCtwRM2fCiOwqJy9vn4OOeYuBUjPkRhies",
  authDomain: "treino-fofo.firebaseapp.com",
  projectId: "treino-fofo",
  storageBucket: "treino-fofo.firebasestorage.app",
  messagingSenderId: "557246650789",
  appId: "1:557246650789:web:888e6f4f301ef7c4dbb04c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;