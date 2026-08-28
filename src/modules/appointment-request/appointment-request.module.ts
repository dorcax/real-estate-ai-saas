import { Module } from '@nestjs/common';
import { AppointmentRequestService } from './appointment-request.service';
import { AppointmentRequestController } from './appointment-request.controller';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CustomerModule } from '../customer/customer.module';
import { LeadsModule } from '../leads/leads.module';

@Module({
  imports:[CustomerModule,LeadsModule],
  controllers: [AppointmentRequestController],
  providers: [AppointmentRequestService,PrismaService],
})
export class AppointmentRequestModule {}
