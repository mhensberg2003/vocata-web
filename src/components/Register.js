import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import { signInWithGoogle } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/vocata');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/vocata');
    } catch (error) {
      setError('Failed to sign in with Google.');
      console.error(error);
    }
  };

  return (
    <div className="Home-container">
      <div className="background">
        <ShaderGradientCanvas>
          <ShaderGradient
            zoomOut={false}
            control="query"
            urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=on&bgColor1=%23000000&bgColor2=%23000000&brightness=1.1&cAzimuthAngle=180&cDistance=3.9&cPolarAngle=115&cameraZoom=1&color1=%235606FF&color2=%2383C5BE&color3=%23000000&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&grain=on&lightType=3d&pixelDensity=2&positionX=-0.5&positionY=0.1&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=235&shader=defaults&type=waterPlane&uAmplitude=3.4&uDensity=1.1&uFrequency=5.5&uSpeed=0.1&uStrength=1.6&uTime=0.2&wireframe=false"
          />
        </ShaderGradientCanvas>
      </div>
      <div className="Setup">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>

        <div style={{ margin: '20px 0', textAlign: 'center' }}>or</div>
        
        <button 
          onClick={handleGoogleSignIn}
          style={{ 
            width: 'auto',
            padding: '0',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'block',
            margin: '0 auto'
          }}
        >
          <img 
            src="/web_neutral_sq_SU@4x.png" 
            alt="Google Sign In" 
            style={{ 
              width: '240px',
              height: 'auto'
            }} 
          />
        </button>

        {error && <p>{error}</p>}
        <p style={{ marginTop: '20px', textAlign: 'center' }}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register; 