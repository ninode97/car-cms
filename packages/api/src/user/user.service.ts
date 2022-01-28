import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(prismaSearch: {
    where?: Prisma.UserWhereInput;
  }): Promise<User | undefined> {
    return this.prismaService.user.findFirst(prismaSearch);
  }
}
