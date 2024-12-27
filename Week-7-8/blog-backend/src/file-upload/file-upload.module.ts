import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  controllers: [FileUploadController],
})
export class FileUploadModule {}
