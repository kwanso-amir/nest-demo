import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth-guard';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  createUser(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.userService.createUser(name, email, password);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('email') email: string,
  ) {
    return this.userService.updateUser(id, name, email);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  changePassword(@Body('email') email: string, @Body('password') password: string, @Body('newPassword') newPassword: string) {
    return this.userService.changePassword(email, password, newPassword)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('activate/:id')
  activateUser(@Param('id') id: string) {
    return this.userService.activateUser(id)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('deactivate/:id')
  deactivateUser(@Param('id') id: string) {
    return this.userService.deactivateUser(id)
  }
}
