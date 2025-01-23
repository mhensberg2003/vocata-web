import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Initialize Firebase first
const fetchFirebaseConfig = async () => {
  try {
    const response = await fetch('/api/getFirebaseConfig');
    if (!response.ok) {
      throw new Error('Failed to fetch Firebase config');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching Firebase config:', error);
    throw error;
  }
};

// Initialize auth with a promise
let authInitialized = null;
const initializeAuth = async () => {
  if (!authInitialized) {
    const firebaseConfig = await fetchFirebaseConfig();
    const app = initializeApp(firebaseConfig);
    authInitialized = getAuth(app);
  }
  return authInitialized;
};

export const signInWithGoogle = async () => {
  try {
    const auth = await initializeAuth();
    const googleProvider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
}; 