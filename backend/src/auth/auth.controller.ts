import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('hello')
  getHello(): string {
    return this.authService.getHello();
  }

  @Post('login')
  login(@Body() credentials: { username: string; password: string }): { token: string } {
    const token = this.authService.login(credentials.username, credentials.password);
    return { token };
  }
} 