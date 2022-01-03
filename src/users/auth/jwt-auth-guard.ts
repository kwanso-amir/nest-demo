import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private usersService: UsersService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp()
    
    if (!ctx.getRequest().headers.authorization) {
      return false;
    }
    context.switchToHttp().getRequest().body = await this.validateToken(ctx.getRequest().headers.authorization);
    console.log(context.switchToHttp().getRequest().body, "=========================")
    return true;
  }

  async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid Authorization Token - No Token Provided in Headers', HttpStatus.UNAUTHORIZED);
    }
    const token = auth.split(' ')[1];
    try {
      console.log(await this.usersService.verify(token), "000000000000")
      const user = await this.usersService.verify(token)
      return user;
    } catch (err) {
      console.log(err, "--------")
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'Invalid Authorization Token - Expired or Invalid',
        message: 'Token Invalid'
      }, HttpStatus.UNAUTHORIZED);
    }
  }
}
