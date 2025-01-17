import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { summarizeChatWithOpenAI } from '../OpenAIService';

const SummaryPage = () => {
  const location = useLocation();
  const { messages, language } = location.state || { messages: [], language: 'English' };
  const [summary, setSummary] = useState('');
  const [grammarScore, setGrammarScore] = useState(null);
  const [vocabularyScore, setVocabularyScore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchSummaryAndScore = async () => {
      try {
        const { summary, grammarScore, vocabularyScore } = await summarizeChatWithOpenAI(messages, language);
        if (isMounted) {
          setSummary(summary);
          setGrammarScore(grammarScore);
          setVocabularyScore(vocabularyScore);
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
      isMounted = false;
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
          <h2>Vocabulary Score: {vocabularyScore !== null ? vocabularyScore : 'Unavailable'}</h2>
        </>
      )}
    </div>
  );
};

export default SummaryPage; 