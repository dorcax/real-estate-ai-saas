import { IsEnum, IsString } from 'class-validator';

import { BillingInterval } from '@prisma/client';

export class CreateSubscriptionDto {
  @IsString()
  planId: string;

  @IsEnum(BillingInterval)
  interval: BillingInterval;
}
