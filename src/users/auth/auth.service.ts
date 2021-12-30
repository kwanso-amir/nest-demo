import * as bcrypt from 'bcrypt';
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
    private jwtService: JwtService,
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
      const { status } = user

      if (status) {
        return this.createToken(user, password);
      } else {
        return {
          message: 'User is not active',
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

  async createToken(user: User, paramPass: string) {
    const { id, email, password } = user;
    const passwordMatch = await bcrypt.compare(paramPass, password)

    if (passwordMatch) {
      const payload = { email, sub: id };

      return {
        access_token: this.jwtService.sign(payload),
        response: {
          message: "OK", status: 200, name: "Token Created"
        }
      };
    } else {
      return {
        response: {
          message: "Incorrect Email or Password", status: 404, name: "Email or Password invalid"
        }, access_token: null
      };
    }
  }

}
