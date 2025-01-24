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

  return (
    <div className="chat-history-container">
      <h2>Recent Conversations</h2>
      <div className="chat-history-list">
        {chats.map((chat) => (
          <div key={chat.id} className="chat-history-item" onClick={() => onSelectChat(chat)}>
            <div className="chat-history-header">
              <span className="chat-language">{chat.language}</span>
              <span className="chat-topic">{chat.topic}</span>
              <span className="chat-date">
                {new Date(chat.timestamp.seconds * 1000).toLocaleDateString()}
              </span>
            </div>
            <div className="chat-preview">
              {chat.messages.slice(-2).map((msg, index) => (
                <div key={index} className={`chat-message ${msg.role}`}>
                  <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content.slice(0, 100)}
                  {msg.content.length > 100 ? '...' : ''}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatHistory;