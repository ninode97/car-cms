import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

import { User } from './models/user.interface';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  get users() {
    return [];
  }
  async getUserByEmail(email: string) {
    const user = await this.userService.findOne({
      where: {
        email: email,
      },
    });
    return user;
  }

  async validateUser(payload: LoginUserDto) {
    const user = await this.getUserByEmail(payload.email);
    if (!user || !(await compare(payload.password, user.hash))) {
      throw new UnauthorizedException('Incorrect username or password');
    }
    const { hash: hash, ...userData } = user;
    return userData;
  }

  async registerUser(user: RegisterUserDto): Promise<Omit<User, 'password'>> {
    const existingUser = this.users.find((u) => u.email === user.email);
    if (existingUser) {
      throw new BadRequestException('User remail must be unique');
    }
    if (user.password !== user.confirmationPassword) {
      throw new BadRequestException(
        'Password and Confirmation Password must match',
      );
    }
    const { confirmationPassword: _, ...newUser } = user;
    this.users.push({
      ...newUser,
      password: await hash(user.password, 12),
      id: this.users.length + 1,
    });
    return {
      id: this.users.length,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };
  }

  findById(id: number): Omit<User, 'password'> {
    const { password: _, ...user } = this.users.find((u) => u.id === id);
    if (!user) {
      throw new BadRequestException(`No user found with id ${id}`);
    }
    return user;
  }
}
