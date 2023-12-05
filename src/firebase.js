// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCvkQPHmzCAShk04Y1eH0196mPPKC2fEm0",
    authDomain: "mylinks-69c79.firebaseapp.com",
    projectId: "mylinks-69c79",
    storageBucket: "mylinks-69c79.appspot.com",
    messagingSenderId: "738399688515",
    appId: "1:738399688515:web:5cf7886dbe2f1cfa4581f6",
    measurementId: "G-W18WTTWN2E"
  };
  

const app = initializeApp(firebaseConfig);
export default app;

export const auth = getAuth(app);
export const firestore = getFirestore(app);

