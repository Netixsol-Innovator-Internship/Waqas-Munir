import { IsString, IsEmail, MinLength } from "class-validator";

export class AuthDTO {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
