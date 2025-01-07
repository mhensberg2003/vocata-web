import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

function Home() {
  const navigate = useNavigate();
  const auth = getAuth();

  // If the user is already logged in, go straight to /vocata
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/vocata");
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Welcome</h2>
      <p>Please login or register to continue.</p>
      <button onClick={() => navigate("/login")}>Login</button>
      <button onClick={() => navigate("/register")}>Register</button>
    </div>
  );
}

export default Home; 