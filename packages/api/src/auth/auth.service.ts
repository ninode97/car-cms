import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from '@prisma/client';

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

  async findById(id: number): Promise<Omit<User, 'hash'>> {
    const user = await this.userService.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new BadRequestException(`No user found with id ${id}`);
    }
    const { hash: _, ...partialuser } = user;
    return partialuser;
  }

  async destroySession(req: any, res: any) {
    return new Promise((resolve, reject) => {
      req.logout();
      req.session.destroy((err) => {
        if (err) {
          return reject(new InternalServerErrorException());
        }
        res.clearCookie('connect.sid');
        return resolve(true);
      });
    });
  }
}
