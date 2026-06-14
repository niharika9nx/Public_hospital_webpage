import { retrieveContext } from "../data/ragModule";

// Define message interface for chatbot state
export interface ChatMessage {
  role: "user" | "model";
  text: string;
}

export interface SummarizeParams {
  name: string;
  age: number | string;
  phone: string;
  email: string;
  department: string;
  symptoms: string;
  date: string;
}

/**
 * Sends a message to the AI Chatbot.
 * It first attempts to call the secure backend Express endpoint (/api/chatbot).
 * If the backend is unavailable (e.g. running as static Vercel build), and VITE_GEMINI_API_KEY is configured on client,
 * it runs a fully functional client-side fallback using the @google/genai library.
 */
export async function sendChatMessage(
  message: string,
  history: ChatMessage[] = []
): Promise<{ text: string; source: "server" | "client_fallback"; modelUsed: string }> {
  // 1. Try secure Express backend API first
  try {
    const response = await fetch("/api/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, history }),
    });

    if (response.ok) {
      const data = await response.json();
      return {
        text: data.text,
        source: "server",
        modelUsed: data.modelUsed || "gemini-model-server",
      };
    }
  } catch (error) {
    console.warn("Express backend /api/chatbot not reachable, attempting client-side fallback...", error);
  }

  // 2. Client-side fallback if backend is not reachable or returns error
  const clientApiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!clientApiKey || clientApiKey === "your_api_key_here") {
    throw new Error(
      "AI Service is temporarily unavailable. (The server is unreachable and VITE_GEMINI_API_KEY is not configured on the client)."
    );
  }

  // Dynamically import @google/genai only when client fallback is active to conserve bundle size and keep strict imports separated
  try {
    const { GoogleGenAI } = await import("@google/genai");
    const ai = new GoogleGenAI({ apiKey: clientApiKey });

    // Client-side RAG context retrieval
    const context = retrieveContext(message);

    const systemInstruction = `You are a helpful, professional, and empathetic AI Support Assistant for the Community Healthcare Support Portal (CHSP).
Your task is to answer user queries politely and concisely, strictly grounded in the provided context from our local knowledge base.

CONTEXT FROM PORTAL KNOWLEDGE BASE:
${context}

STRICT CONSTRAINTS & RULES:
1. You MUST answer the user's question using ONLY the facts explicitly specified in the context above.
2. If the user asks general or hospital-related questions that are NOT contained in the retrieved context, or asks anything unrelated to the portal entirely, you MUST refuse to answer and politely respond exactly: "I can only assist with information related to this healthcare support portal."
3. You MUST NOT speculate, extrapolate, or invent details not literally stated in the context.
4. ABSOLUTE COMPLIANCE: You are strictly forbidden from providing any medical diagnosis, prescribing medications/pharmaceutical treatments, or giving clinical emergency feedback. If the user's prompt is a health emergency or requests self-treatment advice, instruct them immediately to seek urgent professional care or call their local emergency number, and append the Portal's emergency hotline "+1 (555) 911-3000" if appropriate.
5. Remain polite, patient, and professional. Use a welcoming healthcare administrative tone.`;

    // Implement Model Fallback client-side matching server list
    const models = [
      "gemini-2.5-flash",
      "gemini-2.5-flash-lite",
      "gemini-3.5-flash",
      "gemini-3.1-flash-lite"
    ];

    let lastError: any = null;
    for (const model of models) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: message,
          config: {
            systemInstruction,
          },
        });

        if (response && response.text) {
          return {
            text: response.text,
            source: "client_fallback",
            modelUsed: model,
          };
        }
      } catch (err: any) {
        console.warn(`Client fallback model ${model} failed:`, err);
        lastError = err;
      }
    }
    throw lastError || new Error("All client fallback models failed.");
  } catch (err: any) {
    throw new Error(`AI generation failed: ${err.message || err}`);
  }
}

/**
 * Requests the AI to generate a professional Clinical Concern Summary for a patient's symptoms.
 * Calls backend `/api/summarize-concern` first, and falls back to client execution if needed.
 */
export async function generateConcernSummary(
  params: SummarizeParams
): Promise<{ text: string; source: "server" | "client_fallback"; modelUsed: string }> {
  // 1. Try secure Express backend API first
  try {
    const response = await fetch("/api/summarize-concern", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (response.ok) {
      const data = await response.json();
      return {
        text: data.text,
        source: "server",
        modelUsed: data.modelUsed || "gemini-model-server",
      };
    }
  } catch (error) {
    console.warn("Express backend /api/summarize-concern not reachable, attempting client-side fallback...", error);
  }

  // 2. Client-side fallback
  const clientApiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!clientApiKey || clientApiKey === "your_api_key_here") {
    throw new Error(
      "Failed to generate concern summary. (The server is unreachable and VITE_GEMINI_API_KEY is not configured)."
    );
  }

  try {
    const { GoogleGenAI } = await import("@google/genai");
    const ai = new GoogleGenAI({ apiKey: clientApiKey });

    const prompt = `You are an administrative and patient-care coordination assistant for the Community Healthcare Support Portal.
A patient has successfully submitted a scheduled appointment request. Your task is to generate a beautiful, concise, and professional Clinical Concern Summary to present to the checking clinician and to reassure the patient.

Patient Appointment Details:
- Patient Name: ${params.name}
- Age: ${params.age || "N/A"}
- Preferred Department: ${params.department || "General OPD"}
- Target Consultation Date: ${params.date || "N/A"}
- Patient-Reported Concern & Symptoms: "${params.symptoms}"

Please generate a professional response styled in Markdown with the following sections:
1. **Administrative Briefing**: A friendly 2-3 sentence overview confirming the receipt of details and welcoming the patient.
2. **Clinical Symptom Overview**: A clear, summarized bullet-point analysis of their symptoms or clinical concerns for the doctor's quick review.
3. **Pre-Appointment Recommendations Checklist**: A short, bulleted actionable checklist of preparation recommendations (e.g. bring past records, list of active medications, wear comfortable clothing, report 15 mins early to the lobby, etc.).
4. **Caring Administrative Sign-off**: A polite, encouraging reassurance closing statement with the hospital support signature.

Make sure the summary does not diagnose or prescribe clinical medicine. Keep it strictly focused on administrative receipt, supportive guidance, and clinical symptom consolidation. Do not mention any model fallback names or API details.`;

    const models = [
      "gemini-2.5-flash",
      "gemini-2.5-flash-lite",
      "gemini-3.5-flash",
      "gemini-3.1-flash-lite"
    ];

    let lastError: any = null;
    for (const model of models) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
        });

        if (response && response.text) {
          return {
            text: response.text,
            source: "client_fallback",
            modelUsed: model,
          };
        }
      } catch (err: any) {
        console.warn(`Client fallback model ${model} failed for summary:`, err);
        lastError = err;
      }
    }
    throw lastError || new Error("All client fallback models failed.");
  } catch (err: any) {
    throw new Error(`Summary generation failed: ${err.message || err}`);
  }
}
