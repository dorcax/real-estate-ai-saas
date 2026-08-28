import { Module } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { LeadController } from './leads.controller';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
  controllers: [LeadController],
  providers: [LeadsService,PrismaService],
  exports:[LeadsService]
})
export class LeadsModule {}
