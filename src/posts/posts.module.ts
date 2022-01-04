import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from './posts.entity';
import { PostsService } from './posts.service';
import { UserModule } from 'src/users/users.module';
import { PostsController } from './posts.controller';
import { AuthModule } from 'src/users/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]),
  JwtModule.register({
    secret: process.env.SECRET_KEY || 'nestDemoSecretKey',
    signOptions: { expiresIn: '24h' },
    secretOrPrivateKey: process.env.SECRET_KEY || 'nestDemoSecretKey'
  }),
    AuthModule,
    UserModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostModule { }
