import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { Category } from 'src/category/schemas/category.schema';

@Schema()
export class Blog extends Document {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  _id: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  thumbnail: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  content: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  category: Category;

  @Prop({ default: 'unapproved' })
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  author: User;

  @Prop({ type: Date, default: () => Date.now() })
  createdAt: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
