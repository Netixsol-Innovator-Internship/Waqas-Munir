import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from './user.service';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  signUp(@Body() registerDto: RegisterDto) {
    return this.userService.signUp(registerDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  signIn(@Request() req) {
    return { token: this.userService.generateToken(req.user), user: req.user };
  }

  @Post('verify-email')
  verifyEmail(@Body() data: { email: string; otp: number }) {
    return this.userService.verifyEmail(data.email, data.otp);
  }

  @Post('resend-otp')
  resendOtp(@Body() data: { email: string }) {
    return this.userService.resendOtp(data.email);
  }
}
