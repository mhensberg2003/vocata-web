import React, { useState } from "react";
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
      {!started ? (
        <div className="Setup">
          {/* Globe Icon */}
          <img src="/globe-icon.png" alt="Globe Icon" className="globe-icon" />

          {/* Vocata Title */}
          <h1>vocata</h1>
          <p>Get started by selecting a language and topic!</p>

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
