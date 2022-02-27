import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LocalGuard } from 'src/local.gurad';
import { LoggedInGuard } from 'src/logged-in.guard';

import { AuthService } from './auth.service';
import { Public } from './decorators/is-public.decorator';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalGuard)
  @Post('login')
  loginUser(@Req() req) {
    const user = req.session?.passport?.user;
    console.log({ user });
    if (!user) throw new BadRequestException();
    return user;
  }

  @UseGuards(LoggedInGuard)
  @Get('current')
  currentUser() {
    console.log('ok');
    return {
      o: 'k',
    };
  }

  @UseGuards(LoggedInGuard)
  @Post('logout')
  async logout(@Req() req, @Res() res) {
    try {
      await this.authService.destroySession(req, res);
      return res.status(200).json({});
    } catch (error) {
      throw error;
    }
  }
}
