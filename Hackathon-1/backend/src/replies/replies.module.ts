import { Module } from '@nestjs/common';
import { RepliesService } from './replies.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Replies, RepliesSchema } from './schemas/replies.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Replies.name, schema: RepliesSchema }]),
  ],
  providers: [RepliesService],
  exports: [RepliesService],
})
export class RepliesModule {}
