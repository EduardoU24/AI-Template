import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateDashboardInsight = async (metricName: string, value: number): Promise<string> => {
  if (!apiKey) {
    return "API Key not configured. Please set the API_KEY environment variable to use AI features.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a short, professional, one-sentence business insight or actionable tip for a dashboard metric.
      Metric: ${metricName}
      Current Value: ${value}
      Context: This is a SaaS application dashboard.`,
    });
    return response.text || "No insight generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to generate insight at this time.";
  }
};

export const generateReleaseNotes = async (features: string[]): Promise<string> => {
  if (!apiKey) return "API Key missing.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Create a markdown formatted release note summary for the following features: ${features.join(', ')}. Keep it exciting and technical.`,
    });
    return response.text || "";
  } catch (error) {
    console.error(error);
    return "Failed to generate release notes.";
  }
};