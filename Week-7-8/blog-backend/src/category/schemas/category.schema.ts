import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Category extends Document {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: Date, default: () => Date.now() })
  createdAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
