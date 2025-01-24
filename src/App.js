import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import * as reactSpring from "@react-spring/three";
import { CSSTransition } from "react-transition-group";
import ChatWindow from "./components/ChatWindow";
import { sendMessageToOpenAI } from "./components/ai/OpenAIService";
import "./App.css";
import LoadingAnimation from './components/LoadingAnimation';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Logout from './components/Logout';
import SummaryPage from './components/SummaryPage';
import ChatHistory from './components/ChatHistory';


function App() {
  const [language, setLanguage] = useState(""); // User-selected language
  const [topic, setTopic] = useState(""); // User-selected topic
  const [started, setStarted] = useState(false); // Whether the chat has started
  const [messages, setMessages] = useState([]); // Chat messages
  const [isThinking, setIsThinking] = useState(false); // Whether the AI is thinking
  const [showHistory, setShowHistory] = useState(false);

  // Handle starting the chat
  

const handleStartChat = async () => {
  if (language.trim() && topic.trim()) {
    const systemMessage = {
      role: "system",
      content: `You are a friendly and fluent language buddy. Your goal is to help the user practice and improve their skills in ${language} by having casual, engaging conversations about ${topic}.
      Speak like a native speaker would, using natural phrases, idioms, and slang where appropriate. Keep your tone light, friendly, and encouraging.
      If the user makes mistakes, gently correct them in a way that feels natural, like a helpful friend would. Keep each reply between 60–80 characters.`,
    };

    const initialPrompt = {
      role: "user",
      content: `Please generate an engaging first question + welcome message to start a conversation about ${topic}. Only the message, no other text, no quotation marks.`,
    };

    setMessages([systemMessage]); // Add system message first
    setStarted(true); // Transition to the chat immediately

    // Show typing animation before requesting
    setIsThinking(true);

    try {
      // Generate the initial question using OpenAI
      const assistantResponse = await sendMessageToOpenAI([systemMessage, initialPrompt]);
      const initialQuestion = {
        role: "assistant",
        content: assistantResponse, // AI-generated question
        translated: false, // Initialize translated property
      };

      // Add the initial question to the conversation
      setMessages((prevMessages) => [...prevMessages, initialQuestion]);
    } catch (error) {
      console.error("Failed to generate the initial question:", error);
      const errorMessage = {
        role: "assistant",
        content: "Oops! Something went wrong. Please try starting the chat again.",
        translated: false, // Initialize translated property
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      // Turn off typing indicator
      setIsThinking(false);
    }
  }
};

const toggleHistory = () => {
  setShowHistory(!showHistory);
};

  return (
    <Router>
      <Routes>
        <Route path="/vocata" element={
          <div className="App">
            <div className="background">
              <ShaderGradientCanvas>
                <ShaderGradient
                  zoomOut={false}
                  control="query"
                  urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=on&bgColor1=%23000000&bgColor2=%23000000&brightness=1.1&cAzimuthAngle=180&cDistance=3.9&cPolarAngle=115&cameraZoom=1&color1=%235606FF&color2=%2383C5BE&color3=%23000000&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&grain=on&lightType=3d&pixelDensity=2&positionX=-0.5&positionY=0.1&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=235&shader=defaults&type=waterPlane&uAmplitude=3.4&uDensity=1.1&uFrequency=5.5&uSpeed=0.1&uStrength=1.6&uTime=0.2&wireframe=false"
                />
              </ShaderGradientCanvas>
            </div>

            {!started && (
              <button 
                className="history-toggle-button"
                onClick={toggleHistory}
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  padding: '8px 16px',
                  background: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {showHistory ? 'Back' : 'View Past Chats'}
              </button>
            )}

            {/* Main Content with Transition */}
            <CSSTransition
              in={!started}
              timeout={300}
              classNames="page-transition"
              unmountOnExit
            >
              <div className="Setup">
                <a href="/logout" className="logout-link">Log out</a>
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
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && language && topic) {
                      handleStartChat();
                    }
                  }}
                />

                {/* Start Chat Button */}
                <button onClick={handleStartChat} disabled={!language || !topic}>
                  Start Chat ✨
                </button>
              </div>
            </CSSTransition>

            {!started && showHistory ? (
              <div className="chat-history-overlay" onClick={(e) => {
                if (e.target.className === 'chat-history-overlay') {
                  setShowHistory(false);
                }
              }}>
                <ChatHistory 
                  onSelectChat={(selectedChat) => {
                    setMessages(selectedChat.messages);
                    setLanguage(selectedChat.language);
                    setTopic(selectedChat.topic);
                    setStarted(true);
                    setShowHistory(false);
                  }} 
                />
                <button 
                  className="close-button" 
                  onClick={() => setShowHistory(false)}
                >
                  ×
                </button>
              </div>
            ) : (
              <CSSTransition
                in={started}
                timeout={300}
                classNames="page-transition"
                unmountOnExit
              >
                <ChatWindow
                  messages={messages}
                  setMessages={setMessages}
                  language={language}
                  topic={topic}
                  isThinking={isThinking}
                  setIsThinking={setIsThinking}
                  LoadingComponent={LoadingAnimation}
                />
              </CSSTransition>
            )}
          </div>
        } />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
