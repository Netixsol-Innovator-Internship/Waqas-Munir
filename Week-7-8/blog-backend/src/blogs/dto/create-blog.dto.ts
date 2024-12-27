import { IsString, MinLength, IsUrl } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @MinLength(5)
  title: string;

  @IsString()
  @MinLength(10)
  description: string;

  @IsString()
  @MinLength(20)
  content: string;

  @IsString()
  category: string;

  @IsUrl()
  thumbnail: string;
}
