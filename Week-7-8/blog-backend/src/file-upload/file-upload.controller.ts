import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('upload')
export class FileUploadController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const fileName = `${Date.now()}${extname(file.originalname)}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file) {
    if (!file) {
      throw new Error('No file uploaded');
    }

    const imageUrl = await this.cloudinaryService.uploadImage(file);
    return { url: imageUrl };
  }
}
