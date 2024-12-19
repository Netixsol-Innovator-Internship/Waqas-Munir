import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email });
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async matchPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.findUserByEmail(createUserDto.email);
    if (user) throw new ConflictException('Email already exists');

    const hashedPassword = await this.hashPassword(createUserDto.password);

    const newUser = await this.userModel.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
    });

    return newUser;
  }

  async validateUser(email: string, password: string) {
    const user = await this.findUserByEmail(email);
    if (!user) throw new NotFoundException('Invalid Credentials');

    const matchPass = await this.matchPassword(password, user.password);
    if (!matchPass) throw new NotFoundException('Invalid Credentials');

    return user;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user._id };
    return { token: this.jwtService.sign(payload) };
  }
}
