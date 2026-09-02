"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SubscriptionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../services/prisma/prisma.service");
const flutterwave_service_1 = require("../flutterwave/flutterwave.service");
const calculatePeriodEnd_1 = require("../../utils/calculatePeriodEnd");
let SubscriptionService = SubscriptionService_1 = class SubscriptionService {
    prismaService;
    flutterwaveService;
    logger = new common_1.Logger(SubscriptionService_1.name);
    constructor(prismaService, flutterwaveService) {
        this.prismaService = prismaService;
        this.flutterwaveService = flutterwaveService;
    }
    async create(dto, currentUser) {
        if (!currentUser.companyId) {
            throw new common_1.BadRequestException();
        }
        const plan = await this.prismaService.plan.findFirst({
            where: {
                id: dto.planId,
                isActive: true,
            },
        });
        if (!plan) {
            throw new common_1.NotFoundException('Plan not found');
        }
        const existingSubscription = await this.prismaService.subscription.findFirst({
            where: {
                companyId: currentUser.companyId,
                status: {
                    in: ['ACTIVE', 'TRIAL', 'PAST_DUE'],
                },
            },
        });
        if (existingSubscription) {
            throw new common_1.BadRequestException('Company already have active subscription');
        }
        const subscription = await this.prismaService.subscription.create({
            data: {
                interval: dto.interval,
                trialEndsAt: dto.trial
                    ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                    : null,
                currentPeriodStart: new Date(),
                currentPeriodEnd: (0, calculatePeriodEnd_1.calculatePeriodEnd)(dto.interval),
                plan: {
                    connect: {
                        id: dto.planId,
                    },
                },
                company: {
                    connect: {
                        id: currentUser.companyId,
                    },
                },
            },
        });
        return {
            message: 'active subscription have been successfully created ',
            data: subscription,
        };
    }
    async findAll(companyId) {
        return await this.prismaService.subscription.findMany({
            where: {
                companyId,
            },
        });
    }
    async findOne(companyId) {
        return await this.prismaService.subscription.findFirst({
            where: {
                companyId,
            },
        });
    }
    update(id, updateSubscriptionDto) {
        return `This action updates a #${id} subscription`;
    }
    async remove(id, currentUser) {
        if (!currentUser.companyId) {
            throw new common_1.BadRequestException('User is not assigned to a company');
        }
        const subscription = await this.prismaService.subscription.findFirst({
            where: {
                id,
                companyId: currentUser.companyId,
            },
        });
        if (!subscription) {
            throw new common_1.NotFoundException('Subscription not found');
        }
        if (subscription.status === 'CANCELLED') {
            throw new common_1.BadRequestException('Subscription is already cancelled');
        }
        if (subscription.flutterwaveSubscriptionId) {
        }
        const cancelledSubscription = await this.prismaService.subscription.update({
            where: {
                id: subscription.id,
            },
            data: {
                status: 'CANCELLED',
                cancelAtPeriodEnd: true,
                cancelledAt: new Date(),
            },
        });
        return {
            message: 'Subscription cancelled successfully',
            data: cancelledSubscription,
        };
    }
    async subscriptionCheckout(subscriptionId, currentUser) {
        const subscription = await this.prismaService.subscription.findUnique({
            where: {
                id: subscriptionId,
                companyId: currentUser.companyId,
            },
            include: {
                plan: true,
                company: true,
            },
        });
        if (!subscription) {
            throw new common_1.NotFoundException('subscription not found ');
        }
        if (subscription.status !== 'PENDING') {
            throw new common_1.BadRequestException('This subscription is not awaiting payment');
        }
        if (!subscription.plan) {
            throw new common_1.NotFoundException('plan not found');
        }
        const amount = subscription.interval == 'MONTHLY'
            ? Number(subscription.plan.monthlyPrice)
            : Number(subscription.plan.yearlyPrice);
        if (!amount || amount <= 0) {
            throw new common_1.BadRequestException('Invalid plan price');
        }
        const txRef = `SUB-${subscription.id}-${Date.now()}`;
        const data = await this.prismaService.$transaction(async (tx) => {
            const payment = await tx.payment.create({
                data: {
                    amount,
                    currency: 'NGN',
                    status: 'PENDING',
                    description: `Payment for ${subscription.plan.name} subscription`,
                    flutterwaveReference: txRef,
                    companyId: currentUser.companyId,
                    subscriptionId: subscription.id,
                },
            });
            try {
                const flutterwaveResponse = await this.flutterwaveService.initiatePayment({
                    tx_ref: txRef,
                    amount,
                    currency: 'NGN',
                    email: currentUser.email,
                    name: currentUser.id || currentUser.email,
                    redirect_url: `${process.env.FRONTENDURL}/payment/callback`,
                });
                return {
                    message: 'Payment initialized successfully',
                    data: {
                        paymentId: payment.id,
                        subscriptionId: subscription.id,
                        checkoutUrl: flutterwaveResponse.data.link,
                    },
                };
            }
            catch (error) {
                await tx.payment.update({
                    where: { id: payment.id },
                    data: { status: 'FAILED' },
                });
                this.logger.error(`Flutterwave initiation failed: ${error}`);
                throw new common_1.BadRequestException('Payment initialization failed. Please try again.');
            }
        });
        return data;
    }
};
exports.SubscriptionService = SubscriptionService;
exports.SubscriptionService = SubscriptionService = SubscriptionService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        flutterwave_service_1.FlutterwaveService])
], SubscriptionService);
//# sourceMappingURL=subscription.service.js.map