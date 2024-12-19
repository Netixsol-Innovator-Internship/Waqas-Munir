import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Answer } from 'src/answers/schemas/answer.schema';
import { User } from 'src/auth/schemas/user.schema';

export type RepliesDocument = HydratedDocument<Replies>;

@Schema()
export class Replies {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  _id: Types.ObjectId;

  @Prop()
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' })
  answerId: Answer;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  authorId: User;

  @Prop({ default: () => Date.now() })
  createdAt: Date;
}

export const RepliesSchema = SchemaFactory.createForClass(Replies);
