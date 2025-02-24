import { Injectable, ConflictException } from '@nestjs/common';

export interface UserProfile {
  username: string;
  name: string;
  email: string;
  interests: string[];
}

@Injectable()
export class UserService {
  private users: Map<string, UserProfile> = new Map();

  constructor() {
    // Initialize default user for demo purposes
    this.users.set('user', {
      username: 'user',
      name: 'Default User',
      email: 'user@example.com',
      interests: ['technology', 'programming'],
    });
  }

  getUser(username: string): UserProfile {
    return this.users.get(username);
  }

  updateUser(username: string, updateData: Partial<UserProfile>): UserProfile {
    const existing = this.users.get(username);
    if (!existing) {
      throw new Error("User not found");
    }
    const updated = { ...existing, ...updateData };
    this.users.set(username, updated);
    return updated;
  }

  createUser(newUser: UserProfile): UserProfile {
    if (this.users.has(newUser.username)) {
      throw new ConflictException('Username already exists');
    }
    this.users.set(newUser.username, newUser);
    return newUser;
  }
} 