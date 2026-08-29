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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../services/prisma/prisma.service");
let SubscriptionService = class SubscriptionService {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(dto, currentUser) {
        if (!currentUser.companyId) {
            throw new common_1.BadRequestException();
        }
        const plan = await this.prismaService.plan.findFirst({
            where: {
                id: dto.planId,
                isActive: true
            }
        });
        if (!plan) {
            throw new common_1.NotFoundException('Plan not found');
        }
        const existingSubscription = await this.prismaService.subscription.findFirst({
            where: {
                companyId: currentUser.companyId,
                status: {
                    in: ['ACTIVE', 'TRIAL', 'PAST_DUE']
                }
            }
        });
        if (existingSubscription) {
            throw new common_1.BadRequestException('Company already have active subscription');
        }
        const subscription = await this.prismaService.subscription.create({
            data: {
                interval: dto.interval,
                plan: {
                    connect: {
                        id: dto.planId
                    }
                },
                company: {
                    connect: {
                        id: currentUser.companyId
                    }
                }
            }
        });
        return {
            message: 'active subscription have been successfully created ',
            data: subscription
        };
    }
    async;
    async findAll(companyId) {
        return await this.prismaService.subscription.findMany({
            where: {
                companyId
            }
        });
    }
    async findOne(companyId) {
        return await this.prismaService.subscription.findFirst({
            where: {
                companyId
            }
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
};
exports.SubscriptionService = SubscriptionService;
exports.SubscriptionService = SubscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubscriptionService);
//# sourceMappingURL=subscription.service.js.map