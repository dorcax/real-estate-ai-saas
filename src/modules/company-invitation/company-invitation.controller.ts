import { Body, Controller, Post } from '@nestjs/common';
import { CompanyInvitationService } from './company-invitation.service';
import { Auth, AuthUser } from '../auth/decorator/auth.decorator';
import {
  AcceptCompanyInvitationDto,
  CreateCompanyInvitation,
} from '../company-invitation/dto/create-companyInvitationDto';
import { userEntity } from '../auth/dto/create-auth.dto';

@Controller('company-invitation')
export class CompanyInvitationController {
  constructor(
    private readonly companyInvitationService: CompanyInvitationService,
  ) {}

  @Auth(['OWNER', 'ADMIN'])
  @Post()
  create(
    @Body() createCompanyInvitationDto: CreateCompanyInvitation,
    @AuthUser() currentUser: userEntity,
  ) {
    return this.companyInvitationService.createCompanyInvitation(
      createCompanyInvitationDto,
      currentUser,
    );
  }

  @Auth(['OWNER', 'ADMIN'])
  @Post('accept-invite')
  acceptCompanyInvitation(
    @Body() acceptCompanyInvitationDto: AcceptCompanyInvitationDto,
    @AuthUser() currentUser: userEntity,
  ) {
    return this.companyInvitationService.acceptCompanyInvitation(
      acceptCompanyInvitationDto,
      currentUser,
    );
  }

  // reject company invite  

}
