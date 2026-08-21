import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { Auth, AuthUser } from '../auth/decorator/auth.decorator';
import { userEntity } from '../auth/dto/create-auth.dto';
import {
  CompanyInvitationDto,
  CreateCompanyInvitation,
} from '../company-invitation/dto/create-companyInvitationDto';
import { CompanyInvitationService } from './company-invitation.service';
import { GetQueryDto } from './dto/getQuery.dto';

@Controller('company-invitation')
export class CompanyInvitationController {
  constructor(
    private readonly companyInvitationService: CompanyInvitationService,
  ) {}

  @Auth(['OWNER'])
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
  @Auth(['ADMIN'])
  @Get()
  getCompanyInvitation(@Query() query:GetQueryDto,@AuthUser() currentUser:userEntity){
    return this.companyInvitationService.getCompanyInvitation(currentUser,query)
  }


}
