import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: any, @Body('email') email: string, @Body('password') password: string) {
    return this.authService.login(email, password)
  }

  @Post('register')
  register(@Body('email') email: string, @Body('name') name: string, @Body('password') password: string) {
    return this.authService.register(name, email, password)
  }
}
