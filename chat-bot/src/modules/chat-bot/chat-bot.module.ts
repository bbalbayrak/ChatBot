import { Module } from '@nestjs/common';
import { ChatBotService } from './chat-bot.service';
import { ChatBotController } from './chat-bot.controller';
import OpenAI from 'openai';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Answer, AnswerSchema } from './chat-bot.schema';

@Module({
  // exports: [OpenAI],
  imports: [
    MongooseModule.forFeature([{ name: Answer.name, schema: AnswerSchema }]),
    ConfigModule,
  ],
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
  exports: [MongooseModule],
})
export class ChatBotModule {}
