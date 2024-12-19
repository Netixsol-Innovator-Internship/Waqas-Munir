import { Injectable } from '@nestjs/common';
import { Tags } from './schemas/tags.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tags.name) private TagsModel: Model<Tags>) {}

  async createNewTag(name: string): Promise<Tags> {
    const tag = await this.findTag(name);
    if (tag) return tag;
    const newTag = new this.TagsModel({ name });
    await newTag.save();
    return newTag;
  }

  async findTag(name: string): Promise<Tags | null> {
    return await this.TagsModel.findOne({ name });
  }

  async getTagIdsByNames(tagNames: string[]) {
    const tags = await this.TagsModel.find({ name: { $in: tagNames } }).select(
      '_id',
    );
    console.log(tags);
    return tags.map((tag) => tag._id);
  }
}
