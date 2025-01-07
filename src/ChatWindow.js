import React, { useState, useRef, useEffect } from "react";
import { sendMessageToOpenAI } from "./OpenAIService";
import LoadingAnimation from './components/LoadingAnimation';
import { translateTextWithOpenAI } from "./OpenAIService";

function ChatWindow({ messages, setMessages, language, topic, isThinking, setIsThinking }) {
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef(null);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage = { role: "user", content: newMessage };
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");

    // Show typing
    setIsThinking(true);

    try {
      const assistantResponse = await sendMessageToOpenAI([...messages, userMessage]);
      const assistantMessage = { role: "assistant", content: assistantResponse };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Oops, something went wrong. Try again." },
      ]);
    } finally {
      // Turn off typing
      setIsThinking(false);
    }
  };

  const handleTranslateLastMessage = async () => {
    const lastAIMessage = messages
      .slice()
      .reverse()
      .find((msg) => msg.role === "assistant");
    if (!lastAIMessage) {
      alert("No AI message to translate!");
      return;
    }
    setIsThinking(true);
    try {
      const translatedMessage = await translateTextWithOpenAI(
        lastAIMessage.content
      );
      const translationMessage = {
        role: "assistant",
        content: `Translated: ${translatedMessage}`,
      };
      setMessages((prevMessages) => [...prevMessages, translationMessage]);
    } catch (error) {
      console.error("Translation failed:", error);
      alert("Translation failed. Please try again.");
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
      <div className="language-chips">
        <span className="language-chip">{language}</span>
        <span className="language-chip">{topic}</span>
      </div>

      <div className="Messages" ref={scrollRef}>
        {/* Example: A small welcome label, if you want  */}
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

      <button className="translate-button">
        <img src="globe-icon.png" alt="Translate" onClick={handleTranslateLastMessage} />
      </button>
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
