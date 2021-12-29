import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }
  @Post()
  createUser(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.userService.createUser(name, email, password);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('email') email: string,
  ) {
    return this.userService.updateUser(id, name, email);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Post('change-password')
  changePassword(@Body('email') email: string, @Body('password') password: string, @Body('newPassword') newPassword: string) {
    return this.userService.changePassword(email, password, newPassword)
  }

  @Patch('activate/:id')
  activateUser(@Param('id') id: string) {
    return this.userService.activateUser(id)
  }

  @Patch('deactivate/:id')
  deactivateUser(@Param('id') id: string) {
    return this.userService.deactivateUser(id)
  }
}
