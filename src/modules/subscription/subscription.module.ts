import { Module } from '@nestjs/common';
import { FlutterwaveModule } from '../flutterwave/flutterwave.module';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';

@Module({
  imports:[FlutterwaveModule],

  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
