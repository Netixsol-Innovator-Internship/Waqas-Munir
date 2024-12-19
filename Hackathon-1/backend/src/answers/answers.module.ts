import { Module } from '@nestjs/common';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Answer, AnswerSchema } from './schemas/answer.schema';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { RepliesModule } from 'src/replies/replies.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Answer.name, schema: AnswerSchema }]),
    RepliesModule,
  ],
  controllers: [AnswersController],
  providers: [AnswersService, JwtStrategy],
  exports: [AnswersService],
})
export class AnswersModule {}
