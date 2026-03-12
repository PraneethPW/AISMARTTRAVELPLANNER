import client from "../config/openrouter";

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

  const completion = await client.chat.completions.create({
    model: "openai/gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: prompt
      }
    ]
  });

  return completion.choices[0].message.content;
};