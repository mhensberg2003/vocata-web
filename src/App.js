import React, { useState } from "react";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import * as reactSpring from "@react-spring/three";
import ChatWindow from "./ChatWindow";
import "./App.css";

function App() {
  const [language, setLanguage] = useState(""); // User-selected language
  const [topic, setTopic] = useState(""); // User-selected topic
  const [started, setStarted] = useState(false); // Whether the chat has started
  const [messages, setMessages] = useState([]); // Chat messages

  // Handle starting the chat
  const handleStartChat = () => {
    if (language.trim() && topic.trim()) {
      const systemMessage = {
        role: "system",
        content: `You are a friendly and fluent language buddy. Your goal is to help the user practice and improve their skills in ${language} by having casual, engaging conversations about ${topic}.
        Speak like a native speaker would, using natural phrases, idioms, and slang where appropriate. Keep your tone light, friendly, and encouraging.
        If the user makes mistakes, gently correct them in a way that feels natural, like a helpful friend would. Keep each reply between 60–80 characters.`,
      };
      setMessages([systemMessage]); // Set initial system message
      setStarted(true); // Transition to the chat
    }
  };

  return (
    <div className="App">
      <div className="background">
        <ShaderGradientCanvas>
          <ShaderGradient
            control="query"
            urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=on&brightness=1.1&cAzimuthAngle=180&cDistance=3.9&cPolarAngle=115&cameraZoom=1&color1=%235606FF&color2=%23FE8989&color3=%23000000&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&grain=off&lightType=3d&pixelDensity=1&positionX=-0.5&positionY=0.1&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=235&shader=defaults&type=waterPlane&uAmplitude=0&uDensity=1.1&uFrequency=5.5&uSpeed=0.1&uStrength=2.4&uTime=0.2&wireframe=false"
          />
        </ShaderGradientCanvas>
      </div>

      {/* Main Content */}
      {!started ? (
        <div className="Setup">
          {/* Globe Icon */}
          <img src="/logo.png" alt="Globe Icon" className="globe-icon" />

          {/* Vocata Title */}
          <h1>vocata</h1>
          <p>Get started chatting by selecting a language and topic!</p>

          {/* Language Dropdown */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="dropdown"
          >
            <option value="" disabled>
              Select a language
            </option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="German">German</option>
            <option value="French">French</option>
            <option value="Japanese">Japanese</option>
            <option value="Chinese (Mandarin)">Chinese (Mandarin)</option>
          </select>

          {/* Topic Input Field */}
          <input
            type="text"
            placeholder="Enter a topic (e.g., Travel)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />

          {/* Start Chat Button */}
          <button onClick={handleStartChat} disabled={!language || !topic}>
            Start Chat
          </button>
        </div>
      ) : (
        <ChatWindow
          messages={messages}
          setMessages={setMessages}
          language={language}
          topic={topic}
        />
      )}
    </div>
  );
}

export default App;
