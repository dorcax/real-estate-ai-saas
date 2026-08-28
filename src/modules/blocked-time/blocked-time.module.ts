import { Module } from '@nestjs/common';
import { BlockedTimeService } from './blocked-time.service';
import { BlockedTimeController } from './blocked-time.controller';

@Module({
  controllers: [BlockedTimeController],
  providers: [BlockedTimeService],
})
export class BlockedTimeModule {}
