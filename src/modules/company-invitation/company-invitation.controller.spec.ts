import { Test, TestingModule } from '@nestjs/testing';
import { CompanyInvitationController } from './company-invitation.controller';
import { CompanyInvitationService } from './company-invitation.service';

describe('CompanyInvitationController', () => {
  let controller: CompanyInvitationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyInvitationController],
      providers: [CompanyInvitationService],
    }).compile();

    controller = module.get<CompanyInvitationController>(CompanyInvitationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
