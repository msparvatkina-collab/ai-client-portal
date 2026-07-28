import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

type Client = {
  id: number;
  name: string;
  email: string;
  status: string;
  company: string | null;
  notes: string | null;
};

export async function filterClientIds(clients: Client[], query: string): Promise<number[]> {
  const interaction = await ai.interactions.create({
    model: "gemini-3.5-flash",
    input: `Here is a list of clients as JSON:\n${JSON.stringify(clients)}\n\nReturn the ids of clients matching this request: "${query}".`,
    response_format: {
      type: "text",
      mime_type: "application/json",
      schema: {
        type: "object",
        properties: {
          matching_ids: {
            type: "array",
            items: { type: "integer" },
          },
        },
        required: ["matching_ids"],
      },
    },
  });

  const result = JSON.parse(interaction.output_text ?? "{}");
  return result.matching_ids;
}