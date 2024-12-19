import {
  IsString,
  MinLength,
  MaxLength,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  title: string;

  @IsString()
  @MinLength(10)
  @MaxLength(250)
  description: string;

  @IsArray()
  @ArrayMinSize(3)
  @ArrayMaxSize(10)
  @IsString({ each: true })
  tags: string[];
}
