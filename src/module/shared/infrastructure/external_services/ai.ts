import { ZodSchema, z } from "zod";

import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod.mjs";

export class AIService {
  private client: OpenAI;

  constructor(apiKey: string | undefined) {
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY is not set");
    }
    this.client = new OpenAI({ apiKey });
  }

  async genericParser<T extends ZodSchema>(
    schema: T,
    instruction: {
      mainPrompt: string;
      example?: string;
    }
  ): Promise<z.infer<T>> {
    const prompt = `
      ${instruction.mainPrompt}
      ------
      Example: ${instruction.example}
      `;

    const results = await this.client.beta.chat.completions.parse({
      model: "gpt-4o-mini",
      response_format: zodResponseFormat(schema, "GenericString"),
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
    });

    return results.choices[0].message.parsed;
  }
}
