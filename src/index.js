import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const firebaseConfig = {
  apiKey: "AIzaSyCkei9Q0WxUXxr_vYlUE9n3tFAuY1CgTHY",
  authDomain: "vocataauth.firebaseapp.com",
  projectId: "vocataauth",
  storageBucket: "vocataauth.firebasestorage.app",
  messagingSenderId: "49687838551",
  appId: "1:49687838551:web:3d74879e67f11b129fc812",
  measurementId: "G-J9DQL47526"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
