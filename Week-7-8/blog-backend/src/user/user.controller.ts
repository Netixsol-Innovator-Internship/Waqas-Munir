import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from './user.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';

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

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  getUsers(@Query() query: { status?: string }) {
    const status = query.status ?? '';

    return this.userService.getUsers(status);
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  updateUserStatus(
    @Param() params: { id: string },
    @Body() body: { status: string },
  ) {
    return this.userService.updateStatus(params.id, body.status);
  }
}
