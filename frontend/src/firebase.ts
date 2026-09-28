// =============================================
// FIREBASE CONFIGURATION
// =============================================
// Steps to get your config:
// 1. Go to https://console.firebase.google.com
// 2. Click "Add project" → name it "D-Learn"
// 3. Go to Project Settings (gear icon) → "Your apps" → Web app (</>)
// 4. Register the app, then copy the firebaseConfig object below
// 5. Enable Authentication: Build → Authentication → Get Started → Email/Password
// 6. Enable Firestore: Build → Firestore Database → Create database (start in test mode)
// =============================================

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// 🔴 REPLACE THESE VALUES WITH YOUR FIREBASE PROJECT CONFIG
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
