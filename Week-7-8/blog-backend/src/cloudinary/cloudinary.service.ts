import { Injectable } from '@nestjs/common';
import { v2 as cloudinaryV2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinaryV2.config({
      cloud_name: 'dlzamyadc',
      api_key: '575472535283874',
      api_secret: 'VoT-rnzhW93idgN04eVvARNgcNk',
    });
  }

  async uploadImage(file) {
    try {
      const result = await cloudinaryV2.uploader.upload(file.path);

      return result.secure_url;
    } catch (error) {
      console.log(error);
      throw new Error('Error uploading image to Cloudinary');
    }
  }
}
