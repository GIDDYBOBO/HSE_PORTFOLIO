import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import baseConfig from '../../firebase-applet-config.json';

// Securely load API Key and configuration from environment variables (hidden from GitHub/Git)
const env = import.meta.env;

const firebaseConfig = {
  ...baseConfig,
  apiKey: env.VITE_FIREBASE_API_KEY || baseConfig.apiKey || '',
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || baseConfig.authDomain,
  projectId: env.VITE_FIREBASE_PROJECT_ID || baseConfig.projectId,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || baseConfig.storageBucket,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || baseConfig.messagingSenderId,
  appId: env.VITE_FIREBASE_APP_ID || baseConfig.appId,
  firestoreDatabaseId: env.VITE_FIREBASE_FIRESTORE_DATABASE_ID || baseConfig.firestoreDatabaseId
};

// Initialize Firebase App singleton
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Cloud Firestore with custom database ID if provided
const firestoreDbId = firebaseConfig.firestoreDatabaseId;
export const db = firestoreDbId && firestoreDbId !== '(default)'
  ? getFirestore(app, firestoreDbId)
  : getFirestore(app);

// Export database and auth instances
export default app;
