import {
  IsString,
  IsEmail,
  Matches,
  MinLength,
  MaxLength,
  IsIn,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/.*[A-Za-z].*/, {
    message: 'Password must contain at least one alphabet',
  })
  @Matches(/.*[0-9].*/, {
    message: 'Password must contain at least one number',
  })
  @Matches(/.*[!@#$%^&*(),.?":{}|<>].*/, {
    message: 'Password must contain at least one special character',
  })
  password: string;

  @IsString()
  @IsIn(['writer', 'reader', 'admin'], {
    message: 'Role must be one of: writer, reader, admin',
  })
  role: string;
}
