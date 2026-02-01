
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getTravelIntelligence = async (origin: string, destination: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Perform a detailed analysis for travel from ${origin} to ${destination}. 
      Include:
      1. Real-time grounding: Current weather and any major news or festivals happening this week in ${destination}.
      2. Flight prediction: Analyze if prices are likely to rise based on typical trends for this route.
      3. Intelligence Tags: 3 short keyword tags (e.g., "Cultural Peak", "Low Demand").
      
      Format as JSON with: 'currentEvents' (string), 'weather' (string), 'priceForecast' (string: 'BUY', 'WAIT', or 'NEUTRAL'), 'forecastReason' (string), 'tags' (array of strings), 'sourceLinks' (array of {title: string, uri: string}).`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            currentEvents: { type: Type.STRING },
            weather: { type: Type.STRING },
            priceForecast: { type: Type.STRING },
            forecastReason: { type: Type.STRING },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
            sourceLinks: { 
              type: Type.ARRAY, 
              items: { 
                type: Type.OBJECT, 
                properties: { title: { type: Type.STRING }, uri: { type: Type.STRING } } 
              } 
            }
          },
          required: ["currentEvents", "weather", "priceForecast", "forecastReason", "tags"]
        }
      }
    });

    const data = JSON.parse(response.text);
    // Add grounding chunks if available
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const webSources = chunks.map(c => c.web).filter(Boolean);
    return { ...data, webSources };
  } catch (error) {
    console.error("Error fetching intelligence:", error);
    return null;
  }
};

export const chatWithConcierge = async (message: string, history: any[]) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: `You are the Prime Sky Executive Concierge. 
        You provide hyper-accurate flight intelligence and travel planning.
        - Use Markdown for emphasis.
        - Be authoritative yet welcoming.
        - Always look for premium options or clever budget hacks.
        - If asked about specific flight data, explain you are an AI assistant using real-time grounding.`,
      }
    });

    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Error in AI Concierge chat:", error);
    return "Intelligence link interrupted. Re-establishing connection...";
  }
};
