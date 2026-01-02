
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getGuardianGuidance = async (query: string, context: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: query,
      config: {
        systemInstruction: `You are the GuardianAI, an expert in ethical software design and the GuardianOS project. 
        GuardianOS is an offline, data-free, self-healing system for children's breathing exercises. 
        Context: ${context}. 
        Focus on being supportive, clear, and adhering to the project's ethics (Privacy, Safety, Care).`,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to the Guardian neural network, but I am still here to uphold the ethics of the system.";
  }
};
