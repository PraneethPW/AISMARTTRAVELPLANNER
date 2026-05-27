import OpenAI from "openai";
import { env } from "./env";

const client = new OpenAI({
  baseURL: env.openRouterBaseUrl,
  apiKey: env.openRouterApiKey,
  defaultHeaders: {
    "HTTP-Referer": env.appUrl,
    "X-Title": "AISMART Travel Planner"
  }
});

export default client;
