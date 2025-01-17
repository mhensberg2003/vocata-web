import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { summarizeChatWithOpenAI } from '../OpenAIService';

const SummaryPage = () => {
  const location = useLocation();
  const { messages, language } = location.state || { messages: [], language: 'English' };
  const [summary, setSummary] = useState('');
  const [grammarScore, setGrammarScore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // Track if the component is still mounted

    const fetchSummaryAndScore = async () => {
      try {
        const { summary, score } = await summarizeChatWithOpenAI(messages, language);
        if (isMounted) { // Only update state if component is still mounted
          setSummary(summary);
          setGrammarScore(score);
        }
      } catch (error) {
        console.error("Error fetching summary and score:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchSummaryAndScore();

    return () => {
      isMounted = false; // Cleanup function to prevent state updates if unmounted
    };
  }, [messages, language]);

  return (
    <div className="summary-container">
      <h1>Chat Summary</h1>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
          <img 
            src="/60fps-slower.gif" 
            alt="Loading..."
            style={{ width: '40px', height: '40px' }}
            aria-label="Loading indicator"
          />
        </div>
      ) : (
        <>
          <p>{summary}</p>
          <h2>Grammar Score: {grammarScore !== null ? grammarScore : 'Unavailable'}</h2>
        </>
      )}
    </div>
  );
};

export default SummaryPage; 