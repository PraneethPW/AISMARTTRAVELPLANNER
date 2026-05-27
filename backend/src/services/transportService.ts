import client from "../config/openrouter";
import { env } from "../config/env";

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

  const completion = await client.chat.completions.create({
    model: env.openRouterModel,
    messages: [
      {
        role: "user",
        content: prompt
      }
    ]
  });

  return completion.choices[0].message.content;
};
