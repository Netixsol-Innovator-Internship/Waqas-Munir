import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MailModule } from '../mail/mail.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: 'secretSecret',
      signOptions: { expiresIn: '1d' },
    }),
    MailModule,
    PassportModule,
  ],
  controllers: [UserController],
  providers: [UserService, LocalStrategy],
})
export class UserModule {}
