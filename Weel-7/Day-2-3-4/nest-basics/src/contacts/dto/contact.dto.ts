import { IsString, MinLength } from "class-validator";

export class ContactDto {
  @IsString()
  @MinLength(3)
  contact: string;
}
