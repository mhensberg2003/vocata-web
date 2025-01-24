import React, { useState, useRef, useEffect } from "react";
import { sendMessageToOpenAI } from "./ai/OpenAIService";
import LoadingAnimation from './LoadingAnimation';
import { translateTextWithOpenAI } from "./ai/OpenAIService";
import { useNavigate } from 'react-router-dom';
import '../css/Chat.css';
import { saveChat } from './firebase/firestoreService';

function ChatWindow({ messages, setMessages, language, topic, isThinking, setIsThinking }) {
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const [showSummaryPrompt, setShowSummaryPrompt] = useState(false);
  const [showSummaryIcon, setShowSummaryIcon] = useState(false);
  const [canTranslate, setCanTranslate] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    // Enable translation if there's any untranslated AI message
    const hasUntranslatedMessage = messages.some(
      (msg) => msg.role === "assistant" && !msg.translated
    );
    setCanTranslate(hasUntranslatedMessage);
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage = { role: "user", content: newMessage };
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setIsThinking(true);

    try {
      const assistantResponse = await sendMessageToOpenAI([...messages, userMessage]);
      const assistantMessage = {
        role: "assistant",
        content: assistantResponse,
        translated: false,
      };

      setMessages((prev) => {
        const newMessages = [...prev, assistantMessage];
        setCanTranslate(true);
        // Check if we've reached 10 user messages after adding the AI response
        const userMessageCount = newMessages.filter(msg => msg.role === "user").length;
        if (userMessageCount === 10) {
          // Set a timeout to show the prompt 2 seconds after the AI's message
          setTimeout(() => {
            setShowSummaryPrompt(true);
          }, 2000);
        }
        return newMessages;
      });
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  useEffect(() => {
    const saveMessages = async () => {
      // Only save if we have more than just the system message
      if (messages.length > 1) {
        try {
          await saveChat(messages, language, topic);
        } catch (error) {
          console.error('Error saving chat:', error);
        }
      }
    };
    
    // Add a debounce to prevent rapid saves
    const timeoutId = setTimeout(() => {
      saveMessages();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [messages, language, topic]);

  const handleTranslateLastMessage = async () => {
    const lastAIMessageIndex = messages
      .slice()
      .reverse()
      .findIndex((msg) => msg.role === "assistant" && !msg.translated);

    if (lastAIMessageIndex === -1) {
      alert("No AI message to translate or already translated!");
      return;
    }

    const lastAIMessage = messages[messages.length - 1 - lastAIMessageIndex];

    setIsThinking(true);
    try {
      const translatedMessage = await translateTextWithOpenAI(
        lastAIMessage.content
      );
      const translationMessage = {
        role: "assistant",
        content: `Translated: ${translatedMessage}`,
        translated: true,
      };
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[messages.length - 1 - lastAIMessageIndex] = {
          ...lastAIMessage,
          translated: true,
        };
        setCanTranslate(false);
        return [...updatedMessages, translationMessage];
      });
    } catch (error) {
      console.error("Translation failed:", error);
      alert("Translation failed. Please try again.");
    } finally {
      setIsThinking(false);
    }
  };

  const handleSummarize = () => {
    if (messages.length > 0) {
      navigate('/summary', { state: { messages, language } });
    }
  };

  const handleSummaryPromptResponse = (wantsSummary) => {
    setShowSummaryPrompt(false);
    if (wantsSummary) {
      handleSummarize();
    } else {
      setShowSummaryIcon(true);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  useEffect(() => {
    if (!isThinking && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isThinking]);

  return (
    <div className="Chat-container">
      <div className="language-chips">
        <span className="language-chip">{language}</span>
        <span className="language-chip">{topic}</span>
      </div>

      {showSummaryIcon && (
        <button className="summarize-button" onClick={handleSummarize}>
          <span className="summarize-icon">📝</span>
        </button>
      )}

      <div className="Messages" ref={scrollRef}>
        <div className="Message welcome">
          This is the beginning of your conversation with your language buddy.
        </div>

        {messages.filter((msg) => msg.role !== "system").map((msg, index) => (
          <div key={index} className={`Message ${msg.role}`}>
            {msg.content}
          </div>
        ))}

        {isThinking && <LoadingAnimation message="AI is thinking..." />}
      </div>

      <div className="Input-container">
        <input
          ref={inputRef}
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && newMessage.trim() && !isThinking) {
              handleSendMessage();
            }
          }}
          placeholder="Type your message..."
          disabled={isThinking}
        />
        <button 
          onClick={handleSendMessage} 
          disabled={!newMessage.trim() || isThinking}
        >
          Send
        </button>
      </div>

      <button
        className="translate-button"
        onClick={handleTranslateLastMessage}
        disabled={isThinking || !canTranslate}
      >
        <img src="translationstill.png" alt="Translate" className="translation-icon" />
      </button>

      {showSummaryPrompt && (
        <div className="summary-prompt-overlay">
          <div className="summary-prompt">
            <p>You've had 10 messages! Would you like to end the chat and get a summary?</p>
            <div className="summary-prompt-buttons">
              <button onClick={() => handleSummaryPromptResponse(true)}>Yes, get summary</button>
              <button onClick={() => handleSummaryPromptResponse(false)}>No, continue chatting</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Typing Indicator component
function TypingIndicator() {
  return (
    <div className="dots">
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </div>
  );
}

export default ChatWindow;
