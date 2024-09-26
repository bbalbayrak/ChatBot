import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Document türü ile birlikte Answer türünü tanımlıyoruz.
export type AnswerDocument = Answer & Document;

@Schema() // Mongoose için bir şema tanımlıyoruz.
export class Answer {
  @Prop({ required: true })
  sessionId: string;

  @Prop({ required: true })
  answers: string[];
}

// Şemayı oluşturuyoruz.
export const AnswerSchema = SchemaFactory.createForClass(Answer);
