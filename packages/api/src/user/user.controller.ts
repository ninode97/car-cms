import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  getUser() {
    return {};
  }

  @Post()
  createUser() {
    return {};
  }

  @Put('/:userId')
  updateUser() {
    return {};
  }

  @Delete('/:userId')
  removeUser() {
    return {};
  }

  @Get()
  getUsers() {
    return [];
  }

  @Get('/roles')
  getRoles() {
    return [];
  }
}
