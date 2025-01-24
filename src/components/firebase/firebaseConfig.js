import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

let db = null;

export const initializeFirestore = async () => {
  if (!db) {
    const response = await fetch('/api/getFirebaseConfig');
    const firebaseConfig = await response.json();
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  }
  return db;
}; 