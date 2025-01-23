import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import "../css/Home.css";

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
        <h2>Welcome</h2>
        <p>Please login or register to continue.</p>
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/register")}>Register</button>
      </div>
    </div>
  );
}

export default Home; 