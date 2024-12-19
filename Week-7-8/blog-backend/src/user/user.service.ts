import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entities';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { MailService } from 'src/mail/mail.service';
import { generateOTP } from 'utils';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private mailService: MailService,
    private jwtSerive: JwtService,
  ) {}

  async findUserByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findUserById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }

  async signUp(registerDto: RegisterDto) {
    const user = await this.findUserByEmail(registerDto.email);
    if (user) throw new ConflictException('Email already exists');

    const hashedPassword = await this.hashPassword(registerDto.password);

    const newUser = this.userRepository.create({
      name: registerDto.name,
      email: registerDto.email,
      password: hashedPassword,
      role: registerDto.role,
    });
    await this.userRepository.save(newUser);

    const otp = generateOTP();
    newUser.otp_code = otp;
    newUser.otp_expiry_time = new Date(Date.now() + 15 * 60 * 1000);
    await this.userRepository.save(newUser);

    await this.mailService.sendOTP(newUser.email, otp);

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };
  }

  async verifyEmail(email: string, otp: number) {
    const user = await this.findUserByEmail(email);
    if (!user) throw new NotFoundException('User not found');

    if (user.otp_code !== otp) {
      throw new BadRequestException('OTP is invalid');
    }
    if (new Date(user.otp_expiry_time) < new Date()) {
      throw new BadRequestException('OTP has expired');
    }

    user.otp_code = null;
    user.otp_expiry_time = null;
    user.email_verified = true;

    await this.userRepository.save(user);

    return 'Verification Successfull';
  }

  async resendOtp(email: string) {
    const user = await this.findUserByEmail(email);
    if (!user) throw new NotFoundException("Email doesn't exists");

    const newOtp = generateOTP();
    user.otp_code = newOtp;
    user.otp_expiry_time = new Date(Date.now() + 15 * 60 * 1000);
    await this.userRepository.save(user);

    await this.mailService.sendOTP(email, newOtp);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      message: 'OTP Sent!',
    };
  }

  async signIn(credentials: {
    email: string;
    password: string;
  }): Promise<User> {
    const user = await this.findUserByEmail(credentials.email);
    if (!user) throw new NotFoundException('Invalid Credentials');

    if (!user.email_verified)
      throw new UnauthorizedException({
        message: "'Please verify your email to continue'",
        user,
      });

    const matchPass = await this.comparePassword(
      credentials.password,
      user.password,
    );
    if (!matchPass) throw new NotFoundException('Invalid Credentials');
    return user;
  }

  generateToken(user: User) {
    return this.jwtSerive.sign({ sub: user.id, email: user.email });
  }
}
