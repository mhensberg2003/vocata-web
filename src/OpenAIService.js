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
            content: `Summarize the following conversation in English and provide a grammar score from 0 to 100. Format the response as: "Summary: [summary text] Score: [number]".`,
          },
          ...messages.map(msg => ({ role: msg.role, content: msg.content })),
        ],
        max_tokens: 300,
        temperature: 0.5,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const summaryContent = response.data.choices[0].message.content;
    const summaryMatch = summaryContent.match(/Summary:\s*(.*?)\s*Score:/);
    const scoreMatch = summaryContent.match(/Score:\s*(\d+)/);

    const summary = summaryMatch ? summaryMatch[1].trim() : "Summary not available.";
    const score = scoreMatch ? parseInt(scoreMatch[1], 10) : null;

    return { summary, score };
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw new Error("Failed to summarize chat and score grammar.");
  }
};
