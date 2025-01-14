import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import {
  Injectable,
  UnauthorizedException,
  Dependencies,
} from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
@Dependencies(AuthService)
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(public authService: AuthService) {
    super({ usernameField: "email", passwordField: "password" });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.login({ email, password });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
