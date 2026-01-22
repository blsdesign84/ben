
import { GoogleGenAI } from "@google/genai";

// Always create a new instance before making an API call to ensure current key is used.
export const generatePackshot = async (
  base64Image: string,
  stylePrompt: string
): Promise<string> => {
  // Always use the process.env.API_KEY directly for initialization.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Strip the prefix if present (data:image/png;base64,)
  const imageData = base64Image.split(',')[1] || base64Image;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: imageData,
              mimeType: 'image/png',
            },
          },
          {
            text: `${stylePrompt} 
            CRITICAL INSTRUCTION: The object MUST be perfectly lit from the front (front lighting). Ensure no dark shadows are on the front face of the wooden object. 
            Keep the exact shape, texture, and details of the wooden object from the image. 
            Only change the background and lighting environment to match the description. 
            Maintain the object's scale. Output ONLY the resulting image.`,
          },
        ],
      },
    });

    let imageUrl = '';
    
    // Iterate through all parts to find the image part as recommended.
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!imageUrl) {
      throw new Error("Aucune image n'a été générée par l'IA.");
    }

    return imageUrl;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Handle the specific error related to API key selection.
    if (error?.message?.includes("Requested entity was not found")) {
        if (typeof window !== 'undefined' && (window as any).aistudio?.openSelectKey) {
            await (window as any).aistudio.openSelectKey();
        }
        throw new Error("Erreur de configuration. Veuillez sélectionner une clé API valide liée à un projet avec facturation.");
    }
    
    throw error;
  }
};
