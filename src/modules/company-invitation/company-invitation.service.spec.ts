import { Test, TestingModule } from '@nestjs/testing';
import { CompanyInvitationService } from './company-invitation.service';

describe('CompanyInvitationService', () => {
  let service: CompanyInvitationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyInvitationService],
    }).compile();

    service = module.get<CompanyInvitationService>(CompanyInvitationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
