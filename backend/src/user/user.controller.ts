import { Controller, Get, Put, Body, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UserService, UserProfile } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getProfile(@Req() request: Request): UserProfile {
    const user = request.user as { username: string };
    return this.userService.getUser(user.username);
  }

  @Put()
  updateProfile(@Req() request: Request, @Body() updateData: Partial<UserProfile>): UserProfile {
    const user = request.user as { username: string };
    return this.userService.updateUser(user.username, updateData);
  }
} 