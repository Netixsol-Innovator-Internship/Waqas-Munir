import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Replies } from './schemas/replies.schemas';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class RepliesService {
  constructor(@InjectModel(Replies.name) private replymodel: Model<Replies>) {}

  async createReply(content: string, answerId: any, authorId: any) {
    const reply = new this.replymodel({ content, answerId, authorId });

    await reply.save();

    await reply.populate('authorId', 'name');

    return reply;
  }

  async countReplies(answerId: any) {
    const count = await this.replymodel.countDocuments({ answerId: answerId });
    return count;
  }

  async getReplies(id: any) {
    const replies = await this.replymodel
      .find({ answerId: new mongoose.Types.ObjectId(id.id) })
      .populate('authorId', 'name')
      .sort({ createdAt: 1 });

    return replies;
  }
}
