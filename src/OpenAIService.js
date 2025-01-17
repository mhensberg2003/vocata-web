import axios from "axios";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

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
        model: "gpt-4o-mini",
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
        model: "gpt-4o-mini", // or your preferred model
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
        model: "gpt-4o-mini", // or your preferred model
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
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `Analyze the following conversation and provide detailed feedback in this format:

Summary: [Brief overview of the conversation topics and flow]

Language Skills Assessment:
- Grammar Score: [0-100]
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
    
    // Extract grammar score using regex
    const scoreMatch = content.match(/Grammar Score: (\d+)/);
    const score = scoreMatch ? parseInt(scoreMatch[1], 10) : null;

    return { 
      summary: content,
      score: score // Now properly extracted from the content
    };
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw new Error("Failed to analyze chat performance.");
  }
};
