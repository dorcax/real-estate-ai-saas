import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentRequestController } from './appointment-request.controller';
import { AppointmentRequestService } from './appointment-request.service';

describe('AppointmentRequestController', () => {
  let controller: AppointmentRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentRequestController],
      providers: [AppointmentRequestService],
    }).compile();

    controller = module.get<AppointmentRequestController>(AppointmentRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
