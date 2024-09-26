import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';

@Injectable()
export class ChatBotService {
  private openAI: OpenAI;

  constructor() {
    this.openAI = new OpenAI({
      apiKey: process.env.OPEN_AI_API_KEY,
    });
  }

  async askQuestion(prompt: string): Promise<string> {
    const response = await this.openAI.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
    });

    return response.choices[0].message.content.trim();
  }
}
