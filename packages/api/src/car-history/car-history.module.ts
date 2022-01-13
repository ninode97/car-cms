import { Module } from '@nestjs/common';
import { CarHistoryController } from './car-history.controller';
import { CarHistoryService } from './car-history.service';

@Module({
  controllers: [CarHistoryController],
  providers: [CarHistoryService]
})
export class CarHistoryModule {}
