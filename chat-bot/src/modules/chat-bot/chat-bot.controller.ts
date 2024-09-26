import { Body, Controller, Get, Query, Session } from '@nestjs/common';
import { ChatBotService } from './chat-bot.service';

@Controller('chat-bot')
export class ChatBotController {
  private questions = [
    'What is your favorite breed of cat, and why?',
    'How do you think cats communicate with their owners?',
    'Have you ever owned a cat? If so, what was their name and personality like?',
    'Why do you think cats love to sleep in small, cozy places?',
    'What’s the funniest or strangest behavior you’ve ever seen a cat do?',
    'Do you prefer cats or kittens, and what’s the reason for your preference?',
    'Why do you think cats are known for being independent animals?',
    'How do you think cats manage to land on their feet when they fall?',
    'What’s your favorite fact or myth about cats?',
    'How would you describe the relationship between humans and cats in three words?',
  ];

  constructor(private readonly chatBotService: ChatBotService) {}

  @Get('ask')
  async askQuestion(
    @Query('answer') answer: string,
    @Session() session: Record<string, any>,
  ) {
    if (!session.currentQuestionIndex) {
      session.currentQuestionIndex = 0;
      session.sessionId = new Date().toISOString();
    }

    if (answer) {
      await this.chatBotService.saveAnswer(session.sessionId, answer);
      session.currentQuestionIndex++;
    }

    if (session.currentQuestionIndex >= this.questions.length) {
      return { message: 'All questions done.' };
    }

    const nextQuestion = this.questions[session.currentQuestionIndex];
    return { question: nextQuestion };
  }
}
