import React, { useState, useRef, useEffect } from "react";
import { sendMessageToOpenAI } from "./OpenAIService";
import LoadingAnimation from './components/LoadingAnimation';
import { translateTextWithOpenAI } from "./OpenAIService";
import { useNavigate } from 'react-router-dom';

function ChatWindow({ messages, setMessages, language, topic, isThinking, setIsThinking }) {
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const [showSummaryPrompt, setShowSummaryPrompt] = useState(false);
  const [showSummaryIcon, setShowSummaryIcon] = useState(false);

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
      };

      setMessages((prev) => {
        const newMessages = [...prev, assistantMessage];
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
    navigate('/summary', { state: { messages } });
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
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && newMessage.trim()) {
              handleSendMessage();
            }
          }}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage} disabled={!newMessage.trim()}>
          Send
        </button>
      </div>

      <button
        className="translate-button"
        onClick={handleTranslateLastMessage}
        disabled={isThinking || !messages.some(msg => msg.role === "assistant" && !msg.translated)}
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
