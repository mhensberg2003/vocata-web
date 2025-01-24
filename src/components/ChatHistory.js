import React, { useEffect, useState } from 'react';
import { getLastFiveChats } from './firebase/firestoreService';
import '../css/ChatHistory.css';

function ChatHistory({ onSelectChat }) {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const fetchedChats = await getLastFiveChats();
        setChats(fetchedChats);
      } catch (err) {
        setError('Failed to load chat history');
        console.error('Error fetching chats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  if (loading) return <div className="chat-history-loading">Loading chat history...</div>;
  if (error) return <div className="chat-history-error">{error}</div>;
  if (chats.length === 0) return <div className="chat-history-empty">No previous chats found</div>;

  const getChatTitle = (chat) => {
    const date = new Date(chat.timestamp.seconds * 1000);
    return `${chat.language} conversation about ${chat.topic}`;
  };

  return (
    <div className="chat-history-container">
      <h2>Your Past Conversations</h2>
      <div className="chat-history-list">
        {chats.map((chat) => (
          <div key={chat.id} className="chat-history-item">
            <div className="chat-history-header">
              <h3>{getChatTitle(chat)}</h3>
              <span className="chat-date">
                {new Date(chat.timestamp.seconds * 1000).toLocaleDateString()}
              </span>
            </div>
            <button 
              className="continue-chat-button"
              onClick={() => onSelectChat(chat)}
            >
              Continue Chat
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatHistory;