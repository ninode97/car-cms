import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { LoginJWTSign } from './dto/login-jwt-sign.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(credentials: LoginCredentialsDto): Promise<LoginJWTSign> {
    const user = await this.userService.findOne({
      where: {
        email: credentials.email,
      },
    });

    try {
      if (!user || !(await bcrypt.compare(credentials.password, user.hash))) {
        throw new BadRequestException({
          message: 'Incorrect credentials',
          errCode: 'ERR_INCORRECT_CREDENTIALS',
        });
      }
    } catch (error) {
      if (error?.response?.errCode === 'ERR_INCORRECT_CREDENTIALS') {
        throw error;
      }
      throw new InternalServerErrorException({
        message: 'Validate user failure',
        errCode: 'ERR_VALIDATE_USER_FAILURE',
      });
    }

    return {
      id: user.id,
    };
  }

  async login(credentials: LoginCredentialsDto) {
    const jwtSignPayload = await this.validateUser(credentials);
    return {
      access_token: this.jwtService.sign(jwtSignPayload),
    };
  }
}
