import { Test, TestingModule } from '@nestjs/testing';
import { BlockedTimeService } from './blocked-time.service';

describe('BlockedTimeService', () => {
  let service: BlockedTimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlockedTimeService],
    }).compile();

    service = module.get<BlockedTimeService>(BlockedTimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
