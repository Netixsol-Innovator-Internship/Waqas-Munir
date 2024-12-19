import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Answer } from './schemas/answer.schema';
import mongoose, { Model } from 'mongoose';
import { RepliesService } from 'src/replies/replies.service';

@Injectable()
export class AnswersService {
  constructor(
    @InjectModel(Answer.name) private anserModel: Model<Answer>,
    private replyService: RepliesService,
  ) {}

  async getAnswers(questionId: string) {
    const answers = await this.anserModel
      .find({ questionId })
      .populate('authorId', 'name email')
      .sort({ createdAt: -1 })
      .lean();

    for (const answer of answers) {
      const replyCount = await this.replyService.countReplies(answer._id);
      answer['replyCount'] = replyCount;
    }

    return answers;
  }

  async getReplies(id: any) {
    return this.replyService.getReplies(id);
  }

  async createAnswer(content: string, questionId: any, authorId: string) {
    const answer = new this.anserModel({ content, questionId, authorId });
    await answer.save();

    await answer.populate('authorId', 'name');

    return answer;
  }

  async createReply(content: string, answerId: any, authorId: string) {
    const answer = await this.anserModel.findById(
      new mongoose.Types.ObjectId(answerId),
    );

    if (!answer) throw new NotFoundException('Answer not Found');
    return this.replyService.createReply(content, answer._id, authorId);
  }
}
