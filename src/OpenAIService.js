import axios from "axios";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

export const sendMessageToOpenAI = async (messages) => {
  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: "gpt-4o-mini", // Replace with your desired model (e.g., "gpt-3.5-turbo" or "gpt-4")
        messages: messages,
        max_tokens: 90, // Limit the response length
        temperature: 0.7, // Adjust for randomness
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
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
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Translation Error:", error);
    throw new Error("Failed to translate text.");
  }
};
