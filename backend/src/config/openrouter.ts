import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "https://aismarttravelplanner-production.up.railway.app",
    "X-Title": "AI Smart Travel Planner"
  }
});

export default client;