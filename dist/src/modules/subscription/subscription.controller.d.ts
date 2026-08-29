import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { userEntity } from '../auth/dto/create-auth.dto';
export declare class SubscriptionController {
    private readonly subscriptionService;
    constructor(subscriptionService: SubscriptionService);
    create(createSubscriptionDto: CreateSubscriptionDto, currentUser: userEntity): Promise<{
        message: string;
        data: {
            id: string;
            status: import("@prisma/client").$Enums.SubscriptionStatus;
            interval: import("@prisma/client").$Enums.BillingInterval;
            stripeSubscriptionId: string | null;
            stripePriceId: string | null;
            trialEndsAt: Date | null;
            currentPeriodStart: Date | null;
            currentPeriodEnd: Date | null;
            expiresAt: Date | null;
            cancelledAt: Date | null;
            cancelAtPeriodEnd: boolean;
            createdAt: Date;
            updatedAt: Date;
            companyId: string;
            planId: string;
        };
    }>;
    findAll(companyId: string): Promise<{
        id: string;
        status: import("@prisma/client").$Enums.SubscriptionStatus;
        interval: import("@prisma/client").$Enums.BillingInterval;
        stripeSubscriptionId: string | null;
        stripePriceId: string | null;
        trialEndsAt: Date | null;
        currentPeriodStart: Date | null;
        currentPeriodEnd: Date | null;
        expiresAt: Date | null;
        cancelledAt: Date | null;
        cancelAtPeriodEnd: boolean;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
        planId: string;
    }[]>;
    findOne(companyId: string): Promise<{
        id: string;
        status: import("@prisma/client").$Enums.SubscriptionStatus;
        interval: import("@prisma/client").$Enums.BillingInterval;
        stripeSubscriptionId: string | null;
        stripePriceId: string | null;
        trialEndsAt: Date | null;
        currentPeriodStart: Date | null;
        currentPeriodEnd: Date | null;
        expiresAt: Date | null;
        cancelledAt: Date | null;
        cancelAtPeriodEnd: boolean;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
        planId: string;
    }>;
    update(id: string, updateSubscriptionDto: UpdateSubscriptionDto): string;
    remove(id: string, currentUser: userEntity): Promise<{
        message: string;
        data: {
            id: string;
            status: import("@prisma/client").$Enums.SubscriptionStatus;
            interval: import("@prisma/client").$Enums.BillingInterval;
            stripeSubscriptionId: string | null;
            stripePriceId: string | null;
            trialEndsAt: Date | null;
            currentPeriodStart: Date | null;
            currentPeriodEnd: Date | null;
            expiresAt: Date | null;
            cancelledAt: Date | null;
            cancelAtPeriodEnd: boolean;
            createdAt: Date;
            updatedAt: Date;
            companyId: string;
            planId: string;
        };
    }>;
}
