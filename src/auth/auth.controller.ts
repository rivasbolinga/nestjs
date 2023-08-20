import { Controller, Post, Req, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  signup(@Body() dto: any) {
    console.log({
      dto,
    });
    return this.authService.signup();
  }

  @Post('login')
  login() {
    return this.authService.login();
  }
}
