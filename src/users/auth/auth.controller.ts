import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  login(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.login(email, password)
  }

  @Post('register')
  register(@Body('email') email: string, @Body('name') name: string, @Body('password') password: string) {
    return this.authService.register(name, email, password)
  }
}
