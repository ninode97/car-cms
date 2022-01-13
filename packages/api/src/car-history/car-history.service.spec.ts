import { Test, TestingModule } from '@nestjs/testing';
import { CarHistoryService } from './car-history.service';

describe('CarHistoryService', () => {
  let service: CarHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarHistoryService],
    }).compile();

    service = module.get<CarHistoryService>(CarHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
