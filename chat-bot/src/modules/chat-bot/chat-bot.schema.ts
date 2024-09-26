import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AnswerDocument = Answer & Document;

@Schema()
export class Answer {
  @Prop({ required: true })
  sessionId: string;

  @Prop({ required: true })
  answers: string[];
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
