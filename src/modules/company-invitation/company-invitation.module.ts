import { Module } from '@nestjs/common';
import { CompanyInvitationService } from './company-invitation.service';
import { CompanyInvitationController } from './company-invitation.controller';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
  controllers: [CompanyInvitationController],
  providers: [CompanyInvitationService,PrismaService],
})
export class CompanyInvitationModule {}
