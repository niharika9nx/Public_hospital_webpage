import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { retrieveContext } from "./src/data/ragModule";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route - health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // API Route - chatbot
  app.post("/api/chatbot", async (req, res) => {
    try {
      const { message } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Missing required 'message' string in body." });
      }

      const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "Gemini API key is not configured. Please supply VITE_GEMINI_API_KEY in environment or Settings." });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      // 1. Retrieve Context
      const context = retrieveContext(message);

      // 2. Prepare grounded prompt
      const systemInstruction = `You are a helpful, professional, and empathetic AI Support Assistant for the Community Healthcare Support Portal (CHSP).
Your task is to answer user queries politely and concisely, strictly grounded in the provided context from our local knowledge base.

CONTEXT FROM PORTAL KNOWLEDGE BASE:
${context}

STRICT CONSTRAINTS & RULES:
1. You MUST answer the user's question using ONLY the facts explicitly specified in our local knowledge base context. This includes comprehensive info about hospital departments (General Medicine, Pediatrics, Cardiology, Orthopedics, Dermatology), healthcare services, specific facilities/locations, working hours, volunteering program requirements/benefits/commitment, and our complaint registration desk.
2. TECHNOLOGY CONFIRMATION: If the user asks about your tech stack, if you are powered by Gemini API, or whether this is just simple chat automation: You MUST explain clearly and proudly that **Yes, you are actively powered by Google's live Gemini AI model (using the modern @google/genai SDK on our full-stack Express backend)** rather than simple, static chat automation. Confirms that your replies are generated dynamically in real-time.
3. If the user asks general, irrelevant, or non-hospital questions that are completely unrelated to our medical services, clinical facilities, complaint policy, or volunteering program, politely guide them back to topics regarding our Community Healthcare Support Portal.
4. You MUST NOT speculate, extrapolate, or invent details not literally stated in the context.
5. ABSOLUTE COMPLIANCE: You are strictly forbidden from providing any medical diagnosis, prescribing medications/pharmaceutical treatments, or giving clinical emergency feedback. If the user's prompt is a health emergency or requests self-treatment advice, instruct them immediately to seek urgent professional care or call their local emergency number, and append the Portal's emergency hotline "+1 (555) 911-3000" if appropriate.
6. Remain polite, patient, and professional. Use a welcoming healthcare administrative tone.`;

      const result = await generateWithFallback(ai, message, systemInstruction);
      res.json(result);
    } catch (error: any) {
      console.error("Chatbot endpoint failed:", error);
      res.status(500).json({ error: error.message || "Failed to process chat query" });
    }
  });

  // API Route - patient summarizer
  app.post("/api/summarize-concern", async (req, res) => {
    try {
      const { name, age, department, symptoms, date } = req.body;
      if (!name || !symptoms) {
        return res.status(400).json({ error: "Name and Symptoms are required fields." });
      }

      const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "Gemini API key is not configured. Please supply VITE_GEMINI_API_KEY in environment or Settings." });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const prompt = `You are an administrative and patient-care coordination assistant for the Community Healthcare Support Portal.
A patient has successfully submitted a scheduled appointment request. Your task is to generate a beautiful, concise, and professional Clinical Concern Summary to present to the checking clinician and to reassure the patient.

Patient Appointment Details:
- Patient Name: ${name}
- Age: ${age || "N/A"}
- Preferred Department: ${department || "General OPD"}
- Target Consultation Date: ${date || "N/A"}
- Patient-Reported Concern & Symptoms: "${symptoms}"

Please generate a professional response styled in Markdown with the following sections:
1. **Administrative Briefing**: A friendly 2-3 sentence overview confirming the receipt of details and welcoming the patient.
2. **Clinical Symptom Overview**: A clear, summarized bullet-point analysis of their symptoms or clinical concerns for the doctor's quick review.
3. **Pre-Appointment Recommendations Checklist**: A short, bulleted actionable checklist of preparation recommendations (e.g. bring past reports, list of active medications, wear comfortable clothing, report 15 mins early to the lobby, etc.).
4. **Caring Administrative Sign-off**: A polite, encouraging reassurance closing statement with the hospital support signature.

Make sure the summary does not diagnose or prescribe clinical medicine. Keep it strictly focused on administrative receipt, supportive guidance, and clinical symptom consolidation. Do not mention any model fallback names or API details.`;

      const result = await generateWithFallback(ai, prompt);
      res.json(result);
    } catch (error: any) {
      console.error("Summarizer endpoint failed:", error);
      res.status(500).json({ error: error.message || "Failed to generate appointment concern summary" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

async function generateWithFallback(ai: GoogleGenAI, contents: string, systemInstruction?: string) {
  const models = [
    "gemini-2.5-flash-lite",
    "gemini-2.5-flash",
    "gemini-1.5-flash"
  ];

  let lastError: any = null;
  for (const model of models) {
    try {
      console.log(`Attempting generation with model: ${model}`);
      const response = await ai.models.generateContent({
        model,
        contents,
        config: systemInstruction ? { systemInstruction } : undefined,
      });

      if (response && response.text) {
        return {
          text: response.text,
          modelUsed: model
        };
      }
    } catch (err: any) {
      console.warn(`Model ${model} failed:`, err.message || err);
      lastError = err;
    }
  }

  throw lastError || new Error("All Gemini models failed to generate a response");
}

startServer();
