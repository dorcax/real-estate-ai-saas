import { Module } from '@nestjs/common';
import { BlockedTimeService } from './blocked-time.service';
import { BlockedTimeController } from './blocked-time.controller';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
  controllers: [BlockedTimeController],
  providers: [BlockedTimeService,PrismaService],
  
})
export class BlockedTimeModule {}
