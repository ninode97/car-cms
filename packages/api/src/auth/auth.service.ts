import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { LoginJWTSign } from './dto/login-jwt-sign.dto';

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

    const isCredentialsIncorrect = !user || credentials.password !== 'password';
    if (isCredentialsIncorrect) {
      throw new BadRequestException('Incorrect credentials');
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
