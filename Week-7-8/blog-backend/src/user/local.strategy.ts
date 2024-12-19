import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  UnauthorizedException,
  Dependencies,
} from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
@Dependencies(UserService)
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(public userService: UserService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, password: string) {
    const user = await this.userService.signIn({ email, password });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
