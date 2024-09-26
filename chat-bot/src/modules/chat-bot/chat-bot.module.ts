import { Module } from '@nestjs/common';
import { ChatBotService } from './chat-bot.service';
import { ChatBotController } from './chat-bot.controller';
import OpenAI from 'openai';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  // exports: [OpenAI],
  // imports: [ConfigModule],
  providers: [
    ChatBotService,
    //   // {
    //   //   provide: OpenAI,
    //   //   useFactory: (configService: ConfigService) =>
    //   //     new OpenAI({
    //   //       apiKey: configService.getOrThrow(process.env.OPEN_AI_API_KEY),
    //   //     }),
    //   //   inject: [ConfigService],
    //   // },
  ],
  controllers: [ChatBotController],
})
export class ChatBotModule {}
