import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateReplyDto } from 'src/replies/dto/create-reply.dto';
import { AnswersService } from './answers.service';

@Controller('answers')
export class AnswersController {
  constructor(private answerService: AnswersService) {}

  @Get(':id/replies')
  getReplies(@Param() id: string) {
    return this.answerService.getReplies(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/replies')
  createReply(
    @Param() id: string,
    @Body() createReplyDto: CreateReplyDto,
    @Request() req,
  ) {
    return this.answerService.createReply(
      createReplyDto.content,
      id,
      req.user.id,
    );
  }
}
