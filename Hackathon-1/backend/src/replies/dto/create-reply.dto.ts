import { IsString, MinLength } from 'class-validator';

export class CreateReplyDto {
  @IsString()
  @MinLength(2)
  content: string;
}
