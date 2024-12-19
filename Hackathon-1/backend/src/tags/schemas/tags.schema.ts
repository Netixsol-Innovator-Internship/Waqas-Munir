import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TagsDocument = HydratedDocument<Tags>;

@Schema()
export class Tags {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  _id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop({ default: () => Date.now() })
  createdAt: Date;
}

export const TagSchema = SchemaFactory.createForClass(Tags);
