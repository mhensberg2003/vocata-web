import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

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
            urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1&cAzimuthAngle=180&cDistance=2.8&cPolarAngle=80&cameraZoom=9.1&color1=%23006D77&color2=%2383C5BE&color3=%23252525&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=1&positionX=0&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=50&rotationY=0&rotationZ=-60&shader=defaults&type=waterPlane&uAmplitude=0&uDensity=1.5&uFrequency=0&uSpeed=0.2&uStrength=1.5&uTime=8&wireframe=false"
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