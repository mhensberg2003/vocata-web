import axios from "axios";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "../firebase/firebaseConfig";
import { getFirestore } from 'firebase/firestore';

const chatModel = "gpt-4o-mini";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

let db = null;

const getApiKey = async () => {
  const response = await fetch('/api/getApiKey');
  const data = await response.json();
  return data.apiKey;
};

export const sendMessageToOpenAI = async (messages) => {
  try {
    const apiKey = await getApiKey();
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: chatModel,
        messages: messages,
        max_tokens: 90,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw new Error("Failed to communicate with OpenAI API.");
  }
};

export const translateTextWithOpenAI = async (
  text,
  targetLanguage = "English"
) => {
  try {
    const apiKey = await getApiKey();
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: chatModel, // or your preferred model
        messages: [
          {
            role: "system",
            content: `Translate the following text to ${targetLanguage}: "${text}"`,
          },
        ],
        max_tokens: 100, // Adjust for translation length
        temperature: 0.3, // Lower randomness for translation
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Translation Error:", error);
    throw new Error("Failed to translate text.");
  }
};

export const eTextWithOpenAI = async (
  text,
  targetLanguage = "English"
) => {
  try {
    const apiKey = await getApiKey();
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: chatModel, // or your preferred model
        messages: [
          {
            role: "system",
            content: `Translate the following text to ${targetLanguage}: "${text}"`,
          },
        ],
        max_tokens: 100, // Adjust for translation length
        temperature: 0.3, // Lower randomness for translation
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Translation Error:", error);
    throw new Error("Failed to translate text.");
  }
};

export const summarizeChatWithOpenAI = async (messages, language) => {
  try {
    const apiKey = await getApiKey();
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: chatModel,
        messages: [
          {
            role: "system",
            content: `Analyze the following conversation and provide detailed feedback in this format:

Summary: [Brief overview of the conversation topics and flow]

Language Skills Assessment:
- Grammar Score: [0-100]
- Vocabulary Score: [0-100]
- Vocabulary Usage: [Brief assessment of vocabulary level and variety]
- Common Mistakes: [List 2-3 specific grammar or vocabulary mistakes if any]

Areas for Improvement:
- [2-3 specific suggestions for improvement]

Strengths:
- [2-3 aspects where the learner performed well]

Practice Suggestions:
- [2-3 specific exercises or focus areas for future practice]`,
          },
          ...messages.map(msg => ({ role: msg.role, content: msg.content })),
        ],
        max_tokens: 500,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const content = response.data.choices[0].message.content;
    
    // Extract scores using regex
    const grammarScoreMatch = content.match(/Grammar Score: (\d+)/);
    const vocabularyScoreMatch = content.match(/Vocabulary Score: (\d+)/);
    const grammarScore = grammarScoreMatch ? parseInt(grammarScoreMatch[1], 10) : null;
    const vocabularyScore = vocabularyScoreMatch ? parseInt(vocabularyScoreMatch[1], 10) : null;

    // Updated regex to better capture mistakes
    const mistakesMatch = content.match(/Common Mistakes:([^]*?)(?=Areas for Improvement:|$)/);
    const mistakes = mistakesMatch 
      ? mistakesMatch[1]
        .split('-')
        .map(mistake => mistake.trim())
        .filter(mistake => mistake && !mistake.includes('Common Mistakes'))
      : [];

    return { 
      summary: content,
      grammarScore: grammarScore,
      vocabularyScore: vocabularyScore,
      mistakes: mistakes
    };
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw new Error("Failed to analyze chat performance.");
  }
};

export const saveChat = async (messages, language, topic) => {
  if (!db) {
    db = await initializeFirestore();
  }
  const auth = getAuth();
  const user = auth.currentUser;
  
  if (!user) {
    throw new Error('User must be authenticated to save chats');
  }

  try {
    const chatData = {
      userId: user.uid,
      messages,
      language,
      topic,
      timestamp: new Date(),
      lastMessageAt: new Date()
    };

    const userChatsRef = collection(db, 'users', user.uid, 'chats');
    const docRef = await addDoc(userChatsRef, chatData);
    return docRef.id;
  } catch (error) {
    console.error('Error saving chat:', error);
    throw error;
  }
};
