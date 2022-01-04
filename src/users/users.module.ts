import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserSubscriber } from './subscribers/user.subscriber';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.register({
    secret: process.env.SECRET_KEY || 'nestDemoSecretKey',
    signOptions: { expiresIn: '24h' },
    secretOrPrivateKey: process.env.SECRET_KEY || 'nestDemoSecretKey'
  }),
],
  controllers: [UsersController],
  providers: [UsersService, UserSubscriber, AuthService],
  exports: [UsersService],
})
export class UserModule { }
