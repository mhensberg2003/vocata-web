import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

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

const initializeFirebase = async () => {
  try {
    const firebaseConfig = await fetchFirebaseConfig();
    const app = initializeApp(firebaseConfig);
    return app;
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    return null;
  }
};

initializeFirebase().then((app) => {
  if (app) {
    const auth = getAuth(app);
    const analytics = getAnalytics(app);

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

    reportWebVitals();
  } else {
    console.error('Firebase app initialization failed.');
  }
});
