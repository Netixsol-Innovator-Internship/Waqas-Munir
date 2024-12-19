import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from './schemas/questions.schema';
import mongoose, { Model } from 'mongoose';
import { CreateQuestionDto } from './dto/createQuestion.dto';
import { TagsService } from 'src/tags/tags.service';
import { AnswersService } from 'src/answers/answers.service';
import { CreateAnswerDto } from 'src/answers/dto/create-answer.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name) private QuestionModel: Model<Question>,
    private tagService: TagsService,
    private answerService: AnswersService,
  ) {}

  async createQuestion(createQuestionDto: CreateQuestionDto, req) {
    const tagsObj = [];
    const { description, tags, title } = createQuestionDto;

    for (const tag of tags) {
      const existingTag = await this.tagService.findTag(tag);
      if (existingTag) {
        tagsObj.push(existingTag._id);
      } else {
        const newTag = await this.tagService.createNewTag(tag);
        tagsObj.push(newTag._id);
      }
    }

    const question = new this.QuestionModel({
      title,
      description,
      tags: tagsObj,
      authorId: req.user.id,
    });

    await question.save();

    return question;
  }

  async getQuestions(page: number, limit: number, tags?: string[]) {
    let query = {};

    if (tags?.length > 0) {
      const tagIds = await this.tagService.getTagIdsByNames(tags);

      if (tagIds.length < tags.length) {
        return {
          questions: [],
          totalPages: 0,
          totalQuestions: 0,
          currentPage: page,
        };
      }

      query = { tags: { $all: tagIds } };
    }

    const questions = await this.QuestionModel.find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const totalQuestions = await this.QuestionModel.countDocuments(query);

    const totalPages = Math.ceil(totalQuestions / limit);

    return {
      questions,
      totalPages,
      totalQuestions,
      currentPage: page,
    };
  }

  async getOneQuestion(id: string) {
    const question = await this.QuestionModel.findById(
      new mongoose.Types.ObjectId(id),
    ).populate('authorId', 'name');

    console.log(question);

    if (!question) throw new NotFoundException('Question Not Found');

    const answers = await this.answerService.getAnswers(
      question._id.toString(),
    );

    return { question, answers };
  }

  async postAnswer(createAnswerDto: CreateAnswerDto, id: any, req) {
    const question = await this.QuestionModel.findById(
      new mongoose.Types.ObjectId(id),
    );

    if (!question) throw new NotFoundException('Question Not Found');

    if (question.authorId.toString() === req.user.id.toString())
      throw new BadRequestException("Can't answer your own question");

    return this.answerService.createAnswer(
      createAnswerDto.content,
      question._id,
      req.user.id,
    );
  }
}
