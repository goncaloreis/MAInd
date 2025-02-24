import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  getHello(): string {
    return 'Hello from Auth!';
  }

  login(username: string, password: string): string {
    // For demonstration, using hardcoded credentials
    if (username === 'user' && password === 'password') {
      // Sign a JWT token with a secret key
      const token = jwt.sign({ username }, 'secretKey', { expiresIn: '1h' });
      return token;
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
} 