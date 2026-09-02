import { BillingInterval } from '@prisma/client';
export declare class CreateSubscriptionDto {
    planId: string;
    interval: BillingInterval;
    trial: Date;
}
