import { Body, Controller, Patch, Post,Get, Query } from '@nestjs/common';
import { CompanyInvitationService } from './company-invitation.service';
import { Auth, AuthUser } from '../auth/decorator/auth.decorator';
import {

  CompanyInvitationDto,
  CreateCompanyInvitation,
} from '../company-invitation/dto/create-companyInvitationDto';
import { userEntity } from '../auth/dto/create-auth.dto';
import { InvitationStatus } from '@prisma/client';
import { GetInvitationQueryDto } from './dto/getQuery.dto';

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

  @Auth(['AGENT'])
  @Patch('accept-invitation')
  acceptCompanyInvitation(
    @Body() acceptCompanyInvitationDto: CompanyInvitationDto,
    @AuthUser() currentUser: userEntity,
  ) {
    return this.companyInvitationService.acceptCompanyInvitation(
      acceptCompanyInvitationDto,
      currentUser,
    );
  }



  // reject company invite  

   @Auth(['AGENT'])
  @Patch('reject-invititation')
  rejectCompanyInvitation(
    @AuthUser() currentUser: userEntity, @Body() rejectCompanyInvitationDto: CompanyInvitationDto,
  ) {
    return this.companyInvitationService.rejectCompanyInvitationByAgent(
      rejectCompanyInvitationDto,
      currentUser,
    );
  }

  // get company invitation 
  @Auth(['ADMIN','OWNER'])
  @Get()
  getCompanyInvitation(@Query() query:GetInvitationQueryDto,@AuthUser() currentUser:userEntity){
    return this.companyInvitationService.getCompanyInvitation(currentUser,query)
  }


}
