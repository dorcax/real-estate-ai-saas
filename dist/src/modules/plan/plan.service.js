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
exports.PlanService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../services/prisma/prisma.service");
let PlanService = class PlanService {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(dto) {
        const { code, name, description, currency, monthlyPrice, yearlyPrice, maxProperties, features, isActive, } = dto;
        const existingPlan = await this.prismaService.plan.findUnique({
            where: {
                code,
            },
        });
        if (existingPlan) {
            throw new common_1.BadRequestException('A plan with this code already exists');
        }
        const plan = await this.prismaService.plan.create({
            data: {
                code,
                name,
                description,
                currency: currency ?? 'USD',
                monthlyPrice,
                yearlyPrice,
                maxProperties,
                features,
                isActive: isActive ?? true,
            },
        });
        return {
            message: 'Plan created successfully',
            data: plan,
        };
    }
    async findAll() {
        const plans = await this.prismaService.plan.findMany({
            where: {
                isActive: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return {
            message: 'Plans retrieved successfully',
            data: plans,
        };
    }
    async findOne(id) {
        const plan = await this.prismaService.plan.findUnique({
            where: {
                id,
            },
        });
        if (!plan) {
            throw new common_1.NotFoundException('Plan not found');
        }
        return {
            message: 'Plan retrieved successfully',
            data: plan,
        };
    }
    async update(id, dto) {
        const existingPlan = await this.prismaService.plan.findUnique({
            where: {
                id,
            },
        });
        if (!existingPlan) {
            throw new common_1.NotFoundException('Plan not found');
        }
        if (dto.code && dto.code !== existingPlan.code) {
            const codeExists = await this.prismaService.plan.findUnique({
                where: {
                    code: dto.code,
                },
            });
            if (codeExists) {
                throw new common_1.BadRequestException('A plan with this code already exists');
            }
        }
        const plan = await this.prismaService.plan.update({
            where: {
                id,
            },
            data: {
                ...dto,
            },
        });
        return {
            message: 'Plan updated successfully',
            data: plan,
        };
    }
    async deactivate(id) {
        const existingPlan = await this.prismaService.plan.findUnique({
            where: {
                id,
            },
        });
        if (!existingPlan) {
            throw new common_1.NotFoundException('Plan not found');
        }
        if (!existingPlan.isActive) {
            throw new common_1.BadRequestException('Plan is already inactive');
        }
        const plan = await this.prismaService.plan.update({
            where: {
                id,
            },
            data: {
                isActive: false,
            },
        });
        return {
            message: 'Plan deactivated successfully',
            data: plan,
        };
    }
};
exports.PlanService = PlanService;
exports.PlanService = PlanService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PlanService);
//# sourceMappingURL=plan.service.js.map