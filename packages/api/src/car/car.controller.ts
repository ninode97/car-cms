import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CarService } from './car.service';

import { Car as CarModel } from '@prisma/client';
import { GetCarsRequestDto } from './dto/get-cars-request.dto';
import { GetCarsResponseDto } from './dto/get-cars-response.dto';
import { PostCarRequestDto } from './dto/post-car-request.dto';

@Controller('car')
export class CarController {
  constructor(private carService: CarService) {}
  @Get()
  async getCars(
    @Query() query: GetCarsRequestDto,
  ): Promise<GetCarsResponseDto> {
    const cars = await this.carService.cars(query);
    return {
      skip: query.skip,
      take: query.take,
      data: cars,
    };
  }

  @Post()
  createCar(@Body() dto: PostCarRequestDto) {
    return this.carService.createCar(dto);
  }
}
