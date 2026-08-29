import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { userEntity } from '../auth/dto/create-auth.dto';
import { PrismaService } from "../../services/prisma/prisma.service";
export declare class SubscriptionService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(dto: CreateSubscriptionDto, currentUser: userEntity): Promise<{
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
    async: any;
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
    update(id: number, updateSubscriptionDto: UpdateSubscriptionDto): string;
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
