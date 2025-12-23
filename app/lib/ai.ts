
import { GoogleGenAI } from "@google/genai";

// Fix: Strictly follow guidelines for API Key and Model selection.
// Always use gemini-3-flash-preview for basic text tasks and initialize with process.env.API_KEY.

export const generateDashboardInsight = async (metricName: string, value: number): Promise<string> => {
  // Fix: Create instance right before generating content to ensure it uses the correct context.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      // Fix: Use gemini-3-flash-preview instead of gemini-2.5-flash for text tasks.
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, professional, one-sentence business insight or actionable tip for a dashboard metric.
      Metric: ${metricName}
      Current Value: ${value}
      Context: This is a SaaS application dashboard.`,
    });
    // Fix: Access .text property directly (not a method).
    return response.text || "No insight generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to generate insight at this time.";
  }
};

export const generateReleaseNotes = async (features: string[]): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      // Fix: Use gemini-3-flash-preview for text tasks.
      model: 'gemini-3-flash-preview',
      contents: `Create a markdown formatted release note summary for the following features: ${features.join(', ')}. Keep it exciting and technical.`,
    });
    // Fix: Access .text property directly.
    return response.text || "";
  } catch (error) {
    console.error(error);
    return "Failed to generate release notes.";
  }
};
