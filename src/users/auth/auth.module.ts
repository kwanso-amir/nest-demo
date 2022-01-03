import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt-strategy';
import { User } from './../entities/user.entity';
import { LocalStrategy } from './local.strategy';
import { UsersService } from './../users.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'nestDemoSecretKey',
      signOptions: { expiresIn: '24h' },
      secretOrPrivateKey: process.env.SECRET_KEY || 'nestDemoSecretKey'
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
})
export class AuthModule { }
