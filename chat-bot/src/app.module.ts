import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatBotModule } from './modules/chat-bot/chat-bot.module';
import { ConfigModule } from '@nestjs/config';
import { SessionModule } from 'nestjs-session';
import { ChatBotService } from './modules/chat-bot/chat-bot.service';

@Module({
  imports: [
    ChatBotModule,
    ConfigModule.forRoot(),
    SessionModule.forRoot({
      session: {
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ChatBotService],
})
export class AppModule {}
