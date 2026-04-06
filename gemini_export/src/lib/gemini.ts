import { GoogleGenAI, ThinkingLevel, Type } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

export const getGeminiResponse = async (
  prompt: string, 
  model: string = "gemini-3-flash-preview",
  config: any = {}
) => {
  if (!apiKey) throw new Error("GEMINI_API_KEY is not defined");
  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: prompt }] }],
      config
    });

    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return `Error: ${error instanceof Error ? error.message : String(error)}`;
  }
};

export const analyzeMedia = async (
  prompt: string,
  mediaData: string,
  mimeType: string,
  model: string = "gemini-3.1-pro-preview"
) => {
  if (!apiKey) throw new Error("GEMINI_API_KEY is not defined");
  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model,
      contents: [
        {
          parts: [
            { text: prompt },
            { inlineData: { data: mediaData, mimeType } }
          ]
        }
      ]
    });
    return response.text || "Analysis complete, but no text returned.";
  } catch (error) {
    console.error("Media Analysis Error:", error);
    throw error;
  }
};

export const generateImage = async (
  prompt: string,
  config: {
    aspectRatio?: string;
    imageSize?: string;
    model?: string;
    negativePrompt?: string;
    seed?: number;
  } = {}
) => {
  if (!apiKey) throw new Error("GEMINI_API_KEY is not defined");
  const ai = new GoogleGenAI({ apiKey });
  const model = config.model || "gemini-3.1-flash-image-preview";
  
  // Construct the full prompt with negative constraints if provided
  const fullPrompt = config.negativePrompt 
    ? `${prompt}\n\n[NEGATIVE_PROMPT: Avoid the following: ${config.negativePrompt}]`
    : prompt;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: { parts: [{ text: fullPrompt }] },
      config: {
        seed: config.seed,
        imageConfig: {
          aspectRatio: config.aspectRatio || "1:1",
          imageSize: config.imageSize || "1K"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data returned from model.");
  } catch (error) {
    console.error("Image Generation Error:", error);
    throw error;
  }
};

export const animateImageToVideo = async (
  imageBytes: string,
  mimeType: string,
  prompt: string = "Animate this image into a cinematic video"
) => {
  if (!apiKey) throw new Error("GEMINI_API_KEY is not defined");
  const ai = new GoogleGenAI({ apiKey });
  
  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt,
      image: {
        imageBytes,
        mimeType,
      },
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '16:9'
      }
    });

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) throw new Error("Video generation failed to return a URI.");

    const response = await fetch(downloadLink, {
      method: 'GET',
      headers: {
        'x-goog-api-key': apiKey,
      },
    });

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Video Generation Error:", error);
    throw error;
  }
};
