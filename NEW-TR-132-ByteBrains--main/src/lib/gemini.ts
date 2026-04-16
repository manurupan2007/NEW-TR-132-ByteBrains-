import { GoogleGenerativeAI } from "@google/generative-ai";
import { AnalysisResult } from "../types";

let apiKey = "dummy_key_if_not_provided";

try {
  if (typeof process !== 'undefined' && process.env.GEMINI_API_KEY) {
    apiKey = process.env.GEMINI_API_KEY;
  } else if (import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) {
    apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  }
} catch(e) {
  // Ignore fallback
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function analyzePost(text: string, imageBase64?: string): Promise<AnalysisResult> {
  if (apiKey === "dummy_key_if_not_provided" || !apiKey) {
    console.warn("No Gemini API Key provided. Returning mock analysis result.");
    return new Promise((resolve) => {
      setTimeout(() => {
        const isCrisis = text.toLowerCase().includes("kill") || text.toLowerCase().includes("die");
        resolve({
          riskLevel: isCrisis ? "Crisis" : "Moderate",
          confidence: 0.89,
          intensity: isCrisis ? 92 : 65,
          keyThemes: ["distress", isCrisis ? "severe risk" : "anxiety"],
          summary: isCrisis 
            ? "Strong indicators of severe distress and self-harm ideation detected." 
            : "Moderate signs of anxiety and stress present in the language.",
          clinicalIndicators: ["Negative sentiment", "Urgency in tone"],
          timestamp: new Date().toISOString()
        });
      }, 1000);
    });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are an expert clinical sentiment analyzer. Analyze the provided text and optional image for mental health distress signals.
      Provide a comprehensive analysis conforming EXACTLY to the following JSON format without any markdown wrappers:
      {
        "riskLevel": "None" | "Mild" | "Moderate" | "Crisis",
        "confidence": <number between 0 and 1>,
        "intensity": <number between 0 and 100>,
        "keyThemes": [<list of short string themes like "loneliness", "anxiety">],
        "summary": "<clinical overview>",
        "clinicalIndicators": [<list of specific behaviors noted>]
      }
      
      Text to analyze: "${text}"
    `;

    const parts: any[] = [prompt];
    
    if (imageBase64) {
      parts.push({
        inlineData: {
          data: imageBase64,
          mimeType: "image/jpeg"
        }
      });
    }

    const result = await model.generateContent(parts);
    const response = await result.response;
    const textResponse = response.text();
    
    let parsed: any;
    try {
      const cleaned = textResponse.replace(/\`\`\`json/g, "").replace(/\`\`\`/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch(e) {
       console.error("Failed to parse Gemini response as JSON", textResponse);
       throw new Error("Invalid output format from intelligence layer.");
    }

    return {
      riskLevel: parsed.riskLevel || 'None',
      confidence: parsed.confidence || 0.5,
      intensity: parsed.intensity || 0,
      keyThemes: parsed.keyThemes || [],
      summary: parsed.summary || 'Analysis completed with limited confidence.',
      clinicalIndicators: parsed.clinicalIndicators || [],
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error("Analysis Error:", error);
    throw error;
  }
}
