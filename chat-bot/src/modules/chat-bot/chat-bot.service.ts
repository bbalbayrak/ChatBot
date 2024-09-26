import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';
import { Answer, AnswerDocument } from './chat-bot.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ChatBotService {
  private openAI: OpenAI;

  constructor(
    @InjectModel(Answer.name)
    private readonly answerModel: Model<AnswerDocument>,
  ) {
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
  async saveAnswer(sessionId: string, answer: string) {
    let session = await this.answerModel.findOne({ sessionId });

    if (!session) {
      session = new this.answerModel({ sessionId, answers: [answer] });
    } else {
      session.answers.push(answer);
    }

    return session.save();
  }

  async getAnswersBySession(sessionId: string): Promise<Answer[]> {
    return this.answerModel.find({ sessionId }).exec();
  }
}
