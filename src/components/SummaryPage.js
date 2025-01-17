import React from 'react';
import { useLocation } from 'react-router-dom';

const SummaryPage = () => {
  const location = useLocation();
  const { messages } = location.state || { messages: [] };

  const summarizeChat = (messages) => {
    // Simple summary logic for demonstration
    return messages.map(msg => msg.content).join(' ');
  };

  return (
    <div className="summary-container">
      <h1>Chat Summary</h1>
      <p>{summarizeChat(messages)}</p>
    </div>
  );
};

export default SummaryPage; 