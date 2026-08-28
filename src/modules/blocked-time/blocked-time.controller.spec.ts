import { Test, TestingModule } from '@nestjs/testing';
import { BlockedTimeController } from './blocked-time.controller';
import { BlockedTimeService } from './blocked-time.service';

describe('BlockedTimeController', () => {
  let controller: BlockedTimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlockedTimeController],
      providers: [BlockedTimeService],
    }).compile();

    controller = module.get<BlockedTimeController>(BlockedTimeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
