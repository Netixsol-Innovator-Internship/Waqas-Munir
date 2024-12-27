import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: false })
  email_verified: boolean;

  @Prop({ required: true })
  password: string;

  @Prop({ nullable: true })
  otp_code: number;

  @Prop({ nullable: true })
  otp_expiry_time: Date;

  @Prop({ default: 'unblocked' })
  status: string;

  @Prop({ default: 'reader' })
  role: string;

  @Prop({ default: () => Date.now() })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
