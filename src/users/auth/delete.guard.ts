import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { UsersService } from "../users.service";

@Injectable()
export class DeleteGuard implements CanActivate {
  constructor(private authService: AuthService, private userService: UsersService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp()
    const currentUser = ctx.getRequest().body;

    if (currentUser) {
      return true;
    } else
      return false
  }
}