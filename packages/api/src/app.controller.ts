import { Controller, Get, Post, Request, Body, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/decorators/is-public.decorator';
import { LoginCredentialsDto } from './auth/dto/login-credentials.dto';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Post('auth/login')
  async login(@Res() response: Response, @Body() body: LoginCredentialsDto) {
    const payload = await this.authService.login(body);
    response
      .cookie('access_token', payload.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        domain: 'localhost', // your domain here!
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      })
      .json({ success: true });
  }

  @Public()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
