import { Injectable } from '@nestjs/common';
import { prisma, Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async find(prismaSearch: { where?: Prisma.UserWhereInput }): Promise<User[]> {
    return this.prismaService.user.findMany({
      where: prismaSearch.where,
      include: {
        role: true,
      },
    });
  }

  async findOne(prismaSearch: {
    where?: Prisma.UserWhereInput;
  }): Promise<User | undefined> {
    return this.prismaService.user.findFirst(prismaSearch);
  }
}
