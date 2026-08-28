import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentRequestService } from './appointment-request.service';

describe('AppointmentRequestService', () => {
  let service: AppointmentRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentRequestService],
    }).compile();

    service = module.get<AppointmentRequestService>(AppointmentRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
