import React, { useState, useEffect, useRef } from "react";
import { sendMessageToOpenAI, translateTextWithOpenAI } from "./OpenAIService";

function ChatWindow({ messages, setMessages, language, topic }) {
  const [newMessage, setNewMessage] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef(null);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage = { role: "user", content: newMessage };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setNewMessage("");

    setIsThinking(true);

    try {
      const assistantResponse = await sendMessageToOpenAI([
        ...messages,
        userMessage,
      ]);
      const assistantMessage = {
        role: "assistant",
        content: assistantResponse,
      };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage = {
        role: "assistant",
        content: "Oops! Something went wrong. Please try again.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  return (
    <div className="Chat-container">
      <div className="Messages" ref={scrollRef}>
        {/* Welcome Message */}
        <div className="Message welcome">
          This is the beginning of your conversation with your language buddy.
        </div>

        {/* Chat Messages */}
        {messages
          .filter((msg) => msg.role !== "system") // Exclude system messages
          .map((msg, index) => (
            <div key={index} className={`Message ${msg.role}`}>
              {msg.content}
            </div>
          ))}

        {isThinking && (
          <div className="Message assistant typing-indicator">
            <TypingIndicator />
          </div>
        )}
      </div>

      <div className="Input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

// Typing Indicator Component
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
