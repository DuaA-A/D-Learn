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

import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// 🔴 REPLACE THESE VALUES WITH YOUR FIREBASE PROJECT CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyD5vt4dI99N8xPul7vrZO7485LcDgm1JY0",
  authDomain: "d-learn-d6f04.firebaseapp.com",
  projectId: "d-learn-d6f04",
  storageBucket: "d-learn-d6f04.firebasestorage.app",
  messagingSenderId: "937427028335",
  appId: "1:937427028335:web:64e5944fde3dd54191809a",
  measurementId: "G-HZDE2L3EKB"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
