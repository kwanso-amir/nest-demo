import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async createUser(name: string, email: string, password: string) {
    const user = await this.alreadyExists(email)

    if (user) {
      throw new ConflictException('User already exists!')
    }

    return await this.userRepository.save({ name, email, password });
  }

  async getUsers() {
    return await this.userRepository.find();
  }

  async getUser(id: string) {
    return await this.findUser(id);
  }

  async updateUser(id: string, name: string, email: string) {
    const user = await this.findUser(id);
    let updatedUser = { ...user };

    if (name) {
      updatedUser = { ...updatedUser, name };
    }

    if (email) {
      const otherUser = await this.userRepository.findOne({ email });

      if (otherUser) {
        throw new ConflictException('User already exists!')
      }

      updatedUser = { ...updatedUser, email };
    }

    return await this.userRepository.save({ ...user, ...updatedUser });
  }

  async deleteUser(id: string) {
    await this.findUser(id);

    return await this.userRepository.delete(id);
  }

  async changePassword(email: string, password: string, newPassword: string) {
    const user = await this.findByEmail(email);
    const { password: userPassword } = user

    if (userPassword === password) {
      await this.userRepository.save({ ...user, password: newPassword })
      return {
        response: { message: "Password changed successfully!" }
      }
    } else
      throw new BadRequestException('Passwords did not match!');
  }

  async activateUser(id: string) {
    const user = await this.findUser(id);
    const { status } = user;

    if (status) {
      return {
        message: 'User already activated!',
        status: 200
      }
    }

    await this.userRepository.save({ ...user, status: 1 })

    return {
      message: "User activated successfully!",
      status: 200
    }
  }

  async deactivateUser(id: string) {
    const user = await this.findUser(id);
    const { status } = user;

    if (!status) {
      return {
        message: 'User already deactivated!',
        status: 200
      }
    }

    await this.userRepository.save({ ...user, status: 0 })

    return {
      message: "User deactivated successfully!",
      status: 200
    }
  }

  // Helper methods
  async findUser(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async alreadyExists?(email: string) {
    return await this.userRepository.findOne({ email });
  }
}
