import { Injectable } from '@nestjs/common';

import { User, Prisma, Car } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CarsService {
  constructor(private prisma: PrismaService) {}

  async car(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async cars(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CarWhereUniqueInput;
    where?: Prisma.CarWhereInput;
    orderBy?: Prisma.CarOrderByWithRelationInput;
  }): Promise<Car[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.car.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        model: true,
      },
    });
  }

  async createCar(data: Prisma.CarCreateInput): Promise<Car> {
    return this.prisma.car.create({
      data,
    });
  }

  async updateCar(params: {
    where: Prisma.CarWhereUniqueInput;
    data: Prisma.CarUpdateInput;
  }): Promise<Car> {
    const { where, data } = params;
    return this.prisma.car.update({
      data,
      where,
    });
  }

  async deleteCar(where: Prisma.CarWhereUniqueInput): Promise<Car> {
    return this.prisma.car.delete({
      where,
    });
  }
}
