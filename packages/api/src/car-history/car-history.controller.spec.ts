import { Test, TestingModule } from '@nestjs/testing';
import { CarHistoryController } from './car-history.controller';

describe('CarHistoryController', () => {
  let controller: CarHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarHistoryController],
    }).compile();

    controller = module.get<CarHistoryController>(CarHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
