import { GoogleGenAI, Chat } from "@google/genai";
import { ChatMessage } from "../types";

// Initialize the client. API_KEY is injected by the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are "DocNow Assistant", a helpful, empathetic, and professional healthcare virtual assistant. 
Your goal is to assist users with app navigation, general medical information, and symptom checking.

CRITICAL SAFETY RULES:
1. You are NOT a doctor. You CANNOT provide a definitive medical diagnosis.
2. If a user presents severe symptoms (chest pain, difficulty breathing, severe bleeding), IMMEDIATELY advise them to use the "Emergency" button or call an ambulance.
3. For symptom checking, provide "Possible Causes" and "Recommended Specialist". ALWAYS include a disclaimer: "This is not medical advice. Please consult a doctor."
4. Be concise and use simple language.
`;

// Helper to get formatted history for the chat
const getHistory = (messages: ChatMessage[]) => {
  return messages.map(m => ({
    role: m.role,
    parts: [{ text: m.text }]
  }));
};

export const sendMessageToAI = async (
  currentMessages: ChatMessage[],
  newMessage: string
): Promise<string> => {
  try {
    const chat: Chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: getHistory(currentMessages),
    });

    const response = await chat.sendMessage({ message: newMessage });
    return response.text || "I'm having trouble understanding. Please try again.";
  } catch (error) {
    console.error("AI Error:", error);
    return "I apologize, I am currently experiencing connection issues. Please check your internet or try again later.";
  }
};

export const checkSymptomsWithAI = async (symptoms: string): Promise<string> => {
  try {
    const prompt = `
      User symptoms: ${symptoms}.
      
      Please analyze these symptoms and provide a response in the following Markdown format:
      
      **Analysis:** [Brief analysis]
      
      **Possible Causes:**
      * [Cause 1]
      * [Cause 2]
      
      **Recommended Action:** [Home remedy or Doctor visit urgency]
      
      **Specialist to Visit:** [e.g., Cardiologist, Dermatologist]
      
      **Disclaimer:** This is AI-generated information and not a medical diagnosis.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Could not analyze symptoms.";
  } catch (error) {
    console.error("Symptom Checker Error:", error);
    return "Service unavailable.";
  }
};

export const findNearbyHospitals = async (locationDesc: string): Promise<{ text: string; chunks: any[] }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Using flash for speed, assuming tools supported
      contents: `Find the top 3 hospitals near ${locationDesc}. List their names, rating, and address.`,
      config: {
        tools: [{ googleMaps: {} }],
      },
    });
    
    return {
      text: response.text || "No hospitals found.",
      chunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Maps Error:", error);
    return { text: "Unable to search for hospitals at this time.", chunks: [] };
  }
};
