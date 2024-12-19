import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Tags, TagSchema } from './schemas/tags.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tags.name, schema: TagSchema }]),
  ],
  providers: [TagsService],
  exports: [TagsService],
})
export class TagsModule {}
