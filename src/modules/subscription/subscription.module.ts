import { Module } from '@nestjs/common';
import { FlutterwaveModule } from '../flutterwave/flutterwave.module';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
  imports:[FlutterwaveModule],

  controllers: [SubscriptionController],
  providers: [SubscriptionService,PrismaService],
})
export class SubscriptionModule {}
