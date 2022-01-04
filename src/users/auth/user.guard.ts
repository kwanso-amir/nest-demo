import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { AuthService } from "./auth.service";

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private authService: AuthService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp()

    if (!ctx.getRequest().headers.authorization) {
      return false;
    }

    let body = ctx.getRequest().body
    const currentUser = await this.validateToken(ctx.getRequest().headers.authorization);
    body = { ...body, currentUser }

    return true;
  }

  async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid Authorization Token - No Token Provided in Headers', HttpStatus.UNAUTHORIZED);
    }
    const token = auth.split(' ')[1];
    try {
      const user = await this.authService.verify(token)
      return user;
    } catch (err) {
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'Invalid Authorization Token - Expired or Invalid',
        message: 'Token Invalid'
      }, HttpStatus.UNAUTHORIZED);
    }
  }
}
