import { Controller, Post, Req, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  signup(
    @Body('email') email: string,
    @Body('password', Parse) password: string,
  ) {
    console.log({
      email, 
      typeof
    });
    return this.authService.signup();
  }

  @Post('login')
  login() {
    return this.authService.login();
  }
}
