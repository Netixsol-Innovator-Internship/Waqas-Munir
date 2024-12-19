import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateQuestionDto } from './dto/createQuestion.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { QuestionsService } from './questions.service';
import { CreateAnswerDto } from 'src/answers/dto/create-answer.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private questionService: QuestionsService) {}

  @Get()
  getQuestions(@Query() query: { page: string; limit: string; tags: string }) {
    const pageNum = query.page ? parseInt(query.page, 10) : 1;
    const limitNum = query.limit ? parseInt(query.limit, 10) : 2;
    let tagsArr: string[];
    if (query.tags) {
      tagsArr = query.tags.split(',');
      return this.questionService.getQuestions(pageNum, limitNum, tagsArr);
    }
    return this.questionService.getQuestions(pageNum, limitNum);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createQuestion(
    @Body() createQuestionDto: CreateQuestionDto,
    @Request() req: any,
  ) {
    return this.questionService.createQuestion(createQuestionDto, req);
  }

  @Get(':id')
  getOneQuestion(@Param() id: any) {
    return this.questionService.getOneQuestion(id.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/answers')
  postAnswer(
    @Param() id: any,
    @Body() createAnswerDto: CreateAnswerDto,
    @Request() req: any,
  ) {
    return this.questionService.postAnswer(createAnswerDto, id, req);
  }
}
