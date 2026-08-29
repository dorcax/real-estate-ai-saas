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
exports.LeadsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../services/prisma/prisma.service");
let LeadsService = class LeadsService {
    PrismaService;
    constructor(PrismaService) {
        this.PrismaService = PrismaService;
    }
    async create(dto, tx) {
        if (!dto.companyId) {
            throw new common_1.BadRequestException('User is not assigned to a company');
        }
        const { customerId, intent, budgetMinimum, budgetMaximum, preferredLocation, status, companyId, propertyId, preferredType, preferredPurpose, } = dto;
        const prisma = tx ?? this.PrismaService;
        const customer = await prisma.customer.findFirst({
            where: {
                id: customerId,
                companyId,
            },
        });
        if (!customer) {
            throw new common_1.BadRequestException('Customer not found');
        }
        const lead = await prisma.lead.create({
            data: {
                intent,
                budgetMinimum,
                budgetMaximum,
                preferredLocation,
                preferredPurpose,
                preferredType,
                status,
                property: {
                    connect: {
                        id: propertyId,
                    },
                },
                company: {
                    connect: {
                        id: companyId,
                    },
                },
                customer: {
                    connect: {
                        id: customer.id,
                    },
                },
            },
        });
        return {
            message: 'Lead created successfully',
            data: lead,
        };
    }
    async findAll(currentUser, query) {
        const { page, limit } = query;
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.PrismaService.lead.findMany({
                where: {
                    companyId: currentUser.companyId,
                },
                skip,
                take: limit,
                include: {
                    customer: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            }),
            this.PrismaService.lead.count({
                where: {
                    companyId: currentUser.companyId,
                },
            }),
        ]);
        return {
            data,
            pagination: {
                skip,
                limit,
                total,
                totalPage: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id, currentUser) {
        const lead = await this.PrismaService.lead.findFirst({
            where: {
                id,
                companyId: currentUser.companyId,
            },
            include: {
                customer: true,
            },
        });
        if (!lead) {
            throw new common_1.BadRequestException('Lead not found');
        }
        return {
            message: 'Lead retrieved successfully',
            data: lead,
        };
    }
    async update(id, dto, currentUser) {
        const { customerId, ...leadData } = dto;
        const existingLead = await this.PrismaService.lead.findFirst({
            where: {
                id,
                companyId: currentUser.companyId,
            },
        });
        if (!existingLead) {
            throw new common_1.BadRequestException('Lead not found');
        }
        const lead = await this.PrismaService.lead.update({
            where: {
                id,
            },
            data: {
                ...leadData,
            },
        });
        return {
            message: 'Lead updated successfully',
            data: lead,
        };
    }
    async updateStatus(id, dto, currentUser) {
        const lead = await this.PrismaService.lead.findFirst({
            where: {
                id,
                companyId: currentUser.companyId,
            },
        });
        if (!lead) {
            throw new common_1.BadRequestException('Lead not found');
        }
        const updatedLead = await this.PrismaService.lead.update({
            where: {
                id: lead.id,
            },
            data: {
                status: dto.status,
            },
        });
        return {
            message: 'Lead status updated successfully',
            data: updatedLead,
        };
    }
    async assignAgent(id, dto, currentUser) {
        const lead = await this.PrismaService.lead.findFirst({
            where: {
                id,
                companyId: currentUser.companyId,
            },
        });
        if (!lead) {
            throw new common_1.BadRequestException('Lead not found');
        }
        const agent = await this.PrismaService.user.findFirst({
            where: {
                id: dto.agentId,
                companyId: currentUser.companyId,
                role: 'AGENT',
            },
        });
        if (!agent) {
            throw new common_1.BadRequestException('Agent not found in this company');
        }
        const updatedLead = await this.PrismaService.lead.update({
            where: {
                id: lead.id,
            },
            data: {
                assignedAgent: {
                    connect: {
                        id: agent.id,
                    },
                },
            },
            include: {
                assignedAgent: true,
            },
        });
        return {
            message: 'Agent assigned to lead successfully',
            data: updatedLead,
        };
    }
    async unassignAgent(id, currentUser) {
        const lead = await this.PrismaService.lead.findFirst({
            where: {
                id,
                companyId: currentUser.companyId,
            },
        });
        if (!lead) {
            throw new common_1.BadRequestException('Lead not found');
        }
        if (!lead.assignedAgentId) {
            throw new common_1.BadRequestException('No agent is assigned to this lead');
        }
        const updatedLead = await this.PrismaService.lead.update({
            where: {
                id: lead.id,
            },
            data: {
                assignedAgent: {
                    disconnect: true,
                },
            },
        });
        return {
            message: 'Agent unassigned successfully',
            data: updatedLead,
        };
    }
    async remove(id, currentUser) {
        const existingLead = await this.PrismaService.lead.findFirst({
            where: {
                id,
                companyId: currentUser.companyId,
            },
        });
        if (!existingLead) {
            throw new common_1.BadRequestException('Lead not found');
        }
        await this.PrismaService.lead.delete({
            where: {
                id: existingLead.id,
            },
        });
        return {
            message: 'Lead deleted successfully',
        };
    }
};
exports.LeadsService = LeadsService;
exports.LeadsService = LeadsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LeadsService);
//# sourceMappingURL=leads.service.js.map