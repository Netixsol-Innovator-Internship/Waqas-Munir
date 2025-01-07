import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { MailService } from '../mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private mailService: MailService,
    private jwtSerive: JwtService,
  ) {}

  async findUserByEmail(email: string): Promise<User | undefined> {
    return await this.userModel.findOne({ email });
  }

  async findUserById(id: number): Promise<User | undefined> {
    return await this.userModel.findOne({ id });
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

  generateOTP(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }

  async signUp(registerDto: RegisterDto) {
    const user = await this.findUserByEmail(registerDto.email);
    if (user) throw new ConflictException('Email already exists');

    const hashedPassword = await this.hashPassword(registerDto.password);

    const newUser = new this.userModel({
      name: registerDto.name,
      email: registerDto.email,
      password: hashedPassword,
      role: registerDto.role,
    });
    await newUser.save();

    const otp = this.generateOTP();
    newUser.otp_code = otp;
    newUser.otp_expiry_time = new Date(Date.now() + 15 * 60 * 1000);
    await newUser.save();

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

    await user.save();

    return 'Verification Successfull';
  }

  async resendOtp(email: string) {
    const user = await this.findUserByEmail(email);
    if (!user) throw new NotFoundException("Email doesn't exists");

    const newOtp = this.generateOTP();
    user.otp_code = newOtp;
    user.otp_expiry_time = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

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

    if (user.status === 'blocked')
      throw new ForbiddenException('You have been blocked by this site');

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
    return this.jwtSerive.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
  }

  async getUsers(status: string) {
    const filter: any = { role: { $ne: 'admin' } };
    if (status) {
      filter.status = status;
    }

    const users = await this.userModel.find(filter).sort({ createdAt: -1 });
    return users;
  }

  async updateStatus(id: string, status: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new NotFoundException("Can't find this user");

    const user = await this.userModel.findById(new mongoose.Types.ObjectId(id));

    if (!user) throw new NotFoundException('User not found');

    user.status = status;
    await user.save();

    return user;
  }
}
