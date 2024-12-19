import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsModule } from './questions/questions.module';
import { TagsModule } from './tags/tags.module';
import { AnswersModule } from './answers/answers.module';
import { RepliesModule } from './replies/replies.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://devwaqas232:devwaqas232@cluster0.d0ueg.mongodb.net/hackathon1',
    ),
    AuthModule,
    QuestionsModule,
    TagsModule,
    AnswersModule,
    RepliesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
