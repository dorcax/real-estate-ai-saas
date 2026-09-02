import { PrismaService } from "../../services/prisma/prisma.service";
import { userEntity } from '../auth/dto/create-auth.dto';
import { FlutterwaveService } from '../flutterwave/flutterwave.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
export declare class SubscriptionService {
    private readonly prismaService;
    private readonly flutterwaveService;
    private readonly logger;
    constructor(prismaService: PrismaService, flutterwaveService: FlutterwaveService);
    create(dto: CreateSubscriptionDto, currentUser: userEntity): Promise<{
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
    update(id: number, updateSubscriptionDto: UpdateSubscriptionDto): string;
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
    subscriptionCheckout(subscriptionId: string, currentUser: userEntity): Promise<{
        message: string;
        data: {
            paymentId: string;
            subscriptionId: string;
            checkoutUrl: any;
        };
    }>;
}
