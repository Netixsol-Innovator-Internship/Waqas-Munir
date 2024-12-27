import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { BlogsModule } from './blogs/blogs.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './category/category.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { FileUploadModule } from './file-upload/file-upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
    }),
    MongooseModule.forRoot(
      'mongodb+srv://devwaqas232:devwaqas232@cluster0.d0ueg.mongodb.net/blogs',
    ),
    UserModule,
    MailModule,
    BlogsModule,
    CategoryModule,
    CloudinaryModule,
    FileUploadModule,
  ],
  controllers: [AppController],
  providers: [AppService, CloudinaryService],
})
export class AppModule {}
