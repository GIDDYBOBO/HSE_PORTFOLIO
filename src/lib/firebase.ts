import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Safely load local config if present on disk, without breaking CI/CD builds if gitignored
const configFiles = import.meta.glob<{ default: Record<string, string> }>('../../firebase-applet-config.json', { eager: true });
const baseConfig = configFiles['../../firebase-applet-config.json']?.default || {};

// Securely load API Key and configuration from environment variables (hidden from GitHub/Git)
const env = import.meta.env;

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || baseConfig.apiKey || 'AIzaSyDrj2oqz5889o-YcVMDW-tlHZ0J5BLJRAc',
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || baseConfig.authDomain || 'responsible-equinox-5f38q.firebaseapp.com',
  projectId: env.VITE_FIREBASE_PROJECT_ID || baseConfig.projectId || 'responsible-equinox-5f38q',
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || baseConfig.storageBucket || 'responsible-equinox-5f38q.firebasestorage.app',
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || baseConfig.messagingSenderId || '205351155749',
  appId: env.VITE_FIREBASE_APP_ID || baseConfig.appId || '1:205351155749:web:70cb88ec05cf557824a7cc',
  firestoreDatabaseId: env.VITE_FIREBASE_FIRESTORE_DATABASE_ID || baseConfig.firestoreDatabaseId || 'ai-studio-osazeesafetylead-af35cec2-d953-4dee-be4a-5529b6713be2'
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
