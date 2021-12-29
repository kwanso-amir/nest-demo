import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private userService: UsersService
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
      const { password: userPassword, status } = user
      
      if (password === userPassword) {
        if(status){
          return {
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
}
