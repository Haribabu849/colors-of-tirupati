// firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your corrected Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAx-eepJf_6uprT9yGSdP-dU4D9QYIKJdg",
  authDomain: "colors-of-tirupati.firebaseapp.com",
  projectId: "colors-of-tirupati",
  storageBucket: "colors-of-tirupati.appspot.com", // ✅ fixed typo here
  messagingSenderId: "407122635267",
  appId: "1:407122635267:web:7bb69853f163616aac7c36",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore instance
const db = getFirestore(app);

export { db };

