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
            expiresAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            companyId: string;
            status: import("@prisma/client").$Enums.SubscriptionStatus;
            interval: import("@prisma/client").$Enums.BillingInterval;
            flutterwaveSubscriptionId: string | null;
            flutterwavePriceId: string | null;
            trialEndsAt: Date | null;
            currentPeriodStart: Date | null;
            currentPeriodEnd: Date | null;
            cancelledAt: Date | null;
            cancelAtPeriodEnd: boolean;
            planId: string;
        };
    }>;
    findAll(companyId: string): Promise<{
        id: string;
        expiresAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
        status: import("@prisma/client").$Enums.SubscriptionStatus;
        interval: import("@prisma/client").$Enums.BillingInterval;
        flutterwaveSubscriptionId: string | null;
        flutterwavePriceId: string | null;
        trialEndsAt: Date | null;
        currentPeriodStart: Date | null;
        currentPeriodEnd: Date | null;
        cancelledAt: Date | null;
        cancelAtPeriodEnd: boolean;
        planId: string;
    }[]>;
    findOne(companyId: string): Promise<{
        id: string;
        expiresAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
        status: import("@prisma/client").$Enums.SubscriptionStatus;
        interval: import("@prisma/client").$Enums.BillingInterval;
        flutterwaveSubscriptionId: string | null;
        flutterwavePriceId: string | null;
        trialEndsAt: Date | null;
        currentPeriodStart: Date | null;
        currentPeriodEnd: Date | null;
        cancelledAt: Date | null;
        cancelAtPeriodEnd: boolean;
        planId: string;
    }>;
    update(id: string, updateSubscriptionDto: UpdateSubscriptionDto): string;
    remove(id: string, currentUser: userEntity): Promise<{
        message: string;
        data: {
            id: string;
            expiresAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            companyId: string;
            status: import("@prisma/client").$Enums.SubscriptionStatus;
            interval: import("@prisma/client").$Enums.BillingInterval;
            flutterwaveSubscriptionId: string | null;
            flutterwavePriceId: string | null;
            trialEndsAt: Date | null;
            currentPeriodStart: Date | null;
            currentPeriodEnd: Date | null;
            cancelledAt: Date | null;
            cancelAtPeriodEnd: boolean;
            planId: string;
        };
    }>;
    checkout(id: string, currentUser: userEntity): Promise<{
        message: string;
        data: {
            paymentId: string;
            subscriptionId: string;
            checkoutUrl: any;
        };
    }>;
}
