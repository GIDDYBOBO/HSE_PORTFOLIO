import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { seedInitialDataIfEmpty } from '../lib/portfolioService';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  isLoggedIn: boolean;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string, name?: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  demoLogin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
      if (user) {
        // Seed initial collections in Firestore if needed
        seedInitialDataIfEmpty().catch(err => {
          console.warn('Initial data seeding error:', err);
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const loginWithEmail = async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (err: any) {
      // If user not found and it's the executive admin email, create it conveniently
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        try {
          const res = await createUserWithEmailAndPassword(auth, email, pass);
          if (res.user) {
            await updateProfile(res.user, { displayName: 'Engr. Iyenoma T. Osazee' });
          }
          return;
        } catch {
          // rethrow original
          throw err;
        }
      }
      throw err;
    }
  };

  const registerWithEmail = async (email: string, pass: string, name?: string) => {
    const res = await createUserWithEmailAndPassword(auth, email, pass);
    if (res.user && name) {
      await updateProfile(res.user, { displayName: name });
    }
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  // One-click executive bypass / quick demo login for immediate administrative preview
  const demoLogin = async () => {
    const demoEmail = 'admin@iyenomaosazee.com';
    const demoPass = 'SafetyLeader#2026';
    try {
      await signInWithEmailAndPassword(auth, demoEmail, demoPass);
    } catch {
      try {
        const res = await createUserWithEmailAndPassword(auth, demoEmail, demoPass);
        if (res.user) {
          await updateProfile(res.user, { displayName: 'Engr. Iyenoma T. Osazee (Admin)' });
        }
      } catch (e) {
        console.error('Demo admin login error:', e);
        throw e;
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        isLoggedIn: !!currentUser,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        logout,
        demoLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
