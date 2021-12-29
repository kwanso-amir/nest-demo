import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private userService: UsersService,
    private jwtService: JwtService
  ) { }

  async register(name: string, email: string, password: string) {
    const user = await this.userService.alreadyExists(email)

    if (user) {
      throw new ConflictException('User already exists!')
    }

    return await this.userRepository.save({ name, email, password, status: 0 });
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    } else {
      const { password: userPassword, status, name, id } = user

      if (password === userPassword) {
        if (status) {
          const payload = { name, sub: id };
          
          return {
            access_token: this.jwtService.sign({name, sub: id}),
            message: 'Logged in successfully!',
            status: 200
          }
        }
        return {
          message: 'User not active!',
          status: 400
        }
      } else {
        return {
          message: 'Wrong password!',
          status: 400
        }
      }
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await await this.userService.findByEmail(email);
    const { password: userPassword } = user

    if (userPassword === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
