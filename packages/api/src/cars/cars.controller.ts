import { Body, Controller, Get, Post } from '@nestjs/common';
import { CarsService } from './cars.service';

import { Car as CarModel } from '@prisma/client';

@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}
  @Get()
  getCars(): Promise<CarModel[]> {
    return this.carsService.cars({});
  }

  @Post()
  createCar(@Body() car: Partial<CarModel>) {
    console.log(car);
  }
}
