import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { memoryStorage } from 'multer';

@Controller('upload')
export class FileUploadController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
    }),
  )
  async uploadFile(@UploadedFile() file) {
    if (!file) {
      throw new Error('No file uploaded');
    }

    // Pass the file buffer to your Cloudinary service for upload
    const imageUrl = await this.cloudinaryService.uploadImage(file.buffer);
    return { url: imageUrl };
  }
}
