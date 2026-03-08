import { model } from "../config/gemini";

export const getHotelSuggestions = async (
  destination: string,
  budget: number
) => {

  const prompt = `
Suggest 5 budget hotels in ${destination}.

Budget per night: ${budget / 3} INR.

Return:
- hotel name
- approx price
- area
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
};