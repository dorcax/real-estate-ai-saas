import { Global, Module } from '@nestjs/common';
import { MailProcessor } from './event.service';

import { BullModule } from '@nestjs/bullmq';

@Global()
@Module({
  imports: [BullModule.registerQueue({
    name:"mail"
  })],
  providers: [MailProcessor],
  exports: [BullModule],
})
export class EventModule {}
