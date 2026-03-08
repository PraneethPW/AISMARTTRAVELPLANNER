import { model } from "../config/gemini";

export const getTransportOptions = async (
  start: string,
  destination: string
) => {

  const prompt = `
Suggest travel routes from ${start} to ${destination}.

Include:
- bus routes
- train routes
- cheapest option
- fastest option

Return structured text.
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
};