import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ModelController } from './model.controller';
import { ModelService } from './model.service';

@Module({
  controllers: [ModelController],
  providers: [ModelService, PrismaService],
})
export class ModelModule {}
