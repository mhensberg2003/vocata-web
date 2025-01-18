import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { summarizeChatWithOpenAI } from '../OpenAIService';
import './SummaryPage.css';
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

const SummaryPage = () => {
  const location = useLocation();
  const { messages, language } = location.state || { messages: [], language: 'English' };
  const [summary, setSummary] = useState('');
  const [grammarScore, setGrammarScore] = useState(null);
  const [vocabularyScore, setVocabularyScore] = useState(null);
  const [mistakes, setMistakes] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchSummaryAndScore = async () => {
      try {
        const { summary, grammarScore, vocabularyScore, mistakes } = await summarizeChatWithOpenAI(messages, language);
        if (isMounted) {
          setSummary(summary);
          setGrammarScore(grammarScore);
          setVocabularyScore(vocabularyScore);
          setMistakes(mistakes);
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
    <>
      <div className="background">
        <ShaderGradientCanvas>
          <ShaderGradient
            zoomOut={false}
            control="query"
            urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=on&bgColor1=%23000000&bgColor2=%23000000&brightness=1.1&cAzimuthAngle=180&cDistance=3.9&cPolarAngle=115&cameraZoom=1&color1=%235606FF&color2=%2383C5BE&color3=%23000000&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&grain=on&lightType=3d&pixelDensity=2&positionX=-0.5&positionY=0.1&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=235&shader=defaults&type=waterPlane&uAmplitude=3.4&uDensity=1.1&uFrequency=5.5&uSpeed=0.1&uStrength=1.6&uTime=0.2&wireframe=false"
          />
        </ShaderGradientCanvas>
      </div>
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
            
            <div className="mistakes-section">
              <button 
                className="mistakes-dropdown-button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-expanded={isDropdownOpen}
              >
                Common Mistakes {isDropdownOpen ? '▼' : '▶'}
              </button>
              {isDropdownOpen && mistakes.length > 0 && (
                <ul className="mistakes-list">
                  {mistakes.map((mistake, index) => (
                    <li key={index}>{mistake}</li>
                  ))}
                </ul>
              )}
              {isDropdownOpen && mistakes.length === 0 && (
                <p className="no-mistakes">No common mistakes found.</p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SummaryPage; 