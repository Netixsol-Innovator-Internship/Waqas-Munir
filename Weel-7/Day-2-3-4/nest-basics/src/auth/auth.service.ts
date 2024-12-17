import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entity/user.entities";
import { Repository } from "typeorm";
import { AuthDTO } from "./dto/auth.dto";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async checkUser(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email: email } });
    return user;
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  createToken(user: User): { token: string } {
    const token = this.jwtService.sign({ email: user.email, sub: user.id });
    return { token: token };
  }

  async register(credentials: AuthDTO): Promise<User> {
    const user = await this.checkUser(credentials.email);
    if (user) throw new BadRequestException("Email already exists");

    const hash = await this.hashPassword(credentials.password);
    const newUser = this.userRepository.create({
      email: credentials.email,
      password: hash,
    });

    await this.userRepository.save(newUser);
    return newUser;
  }
  async login(credentials: AuthDTO): Promise<User> {
    const user = await this.checkUser(credentials.email);
    if (!user) throw new NotFoundException("Invalid Credentials");

    const matchPass = await this.comparePassword(
      credentials.password,
      user.password,
    );
    if (!matchPass) throw new NotFoundException("Invalid Credentials");
    return user;
  }
}
