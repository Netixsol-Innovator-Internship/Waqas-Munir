import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema } from './schemas/questions.schema';
import { TagsModule } from 'src/tags/tags.module';
import { AnswersModule } from 'src/answers/answers.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
    ]),
    TagsModule,
    AnswersModule,
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService, JwtStrategy],
})
export class QuestionsModule {}
