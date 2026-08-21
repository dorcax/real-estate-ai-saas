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
exports.PropertyService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../services/prisma/prisma.service");
const client_1 = require("@prisma/client");
let PropertyService = class PropertyService {
    PrismaService;
    constructor(PrismaService) {
        this.PrismaService = PrismaService;
    }
    async create(dto, currentUser) {
        const { title, description, price, address, country, state, currency, city, attachmentsId, amenities, propertyPurpose, propertyType, propertyStatus, bedrooms, parkingSpace, bathrooms, } = dto;
        const existingCompany = await this.PrismaService.company.findFirst({
            where: {
                id: currentUser.companyId,
            },
        });
        if (!existingCompany)
            throw new common_1.NotFoundException('company not found ');
        const property = await this.PrismaService.property.create({
            data: {
                title,
                description,
                price,
                address,
                country,
                currency,
                city,
                state,
                propertyStatus,
                propertyType,
                propertyPurpose,
                bedrooms,
                bathrooms,
                amenities,
                parkingSpace,
                company: {
                    connect: {
                        id: existingCompany.id,
                    },
                },
                createdBy: {
                    connect: {
                        id: currentUser.id,
                    },
                },
                ...(attachmentsId && {
                    attachment: {
                        create: {
                            uploads: {
                                connect: attachmentsId.map((id) => ({ id })),
                            },
                        },
                    },
                }),
            },
        });
        return {
            message: 'Property created successfully',
            property,
        };
    }
    async findAll(currentUser, query) {
        const { status, page, limit } = query;
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.PrismaService.property.findMany({
                where: {
                    companyId: currentUser.companyId,
                    ...(status && { status }),
                },
                skip,
                take: limit,
            }),
            this.PrismaService.property.count({
                where: {
                    companyId: currentUser.companyId,
                    ...(status && { status }),
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
        const property = await this.PrismaService.property.findFirst({
            where: {
                id,
                companyId: currentUser.companyId,
            },
            include: {
                attachment: {
                    include: {
                        uploads: true,
                    },
                },
            },
        });
        if (!property) {
            throw new common_1.NotFoundException('Property not found');
        }
        return {
            property,
        };
    }
    async update(id, dto, currentUser) {
        const { title, description, price, address, country, state, currency, city, attachmentsId, amenities, propertyPurpose, propertyType, propertyStatus, bedrooms, parkingSpace, bathrooms, } = dto;
        const property = await this.PrismaService.property.findFirst({
            where: {
                id,
                companyId: currentUser.companyId,
            },
        });
        if (!property) {
            throw new common_1.NotFoundException('Property not found');
        }
        const updatedProperty = await this.PrismaService.property.update({
            where: {
                id,
            },
            data: {
                title,
                description,
                price,
                address,
                country,
                currency,
                city,
                state,
                propertyStatus,
                propertyType,
                propertyPurpose,
                bedrooms,
                bathrooms,
                amenities,
                parkingSpace,
                company: {
                    connect: {
                        id: property.companyId,
                    },
                },
                createdBy: {
                    connect: {
                        id: currentUser.id,
                    },
                },
                ...(attachmentsId && {
                    attachment: {
                        create: {
                            uploads: {
                                connect: attachmentsId.map((id) => ({ id })),
                            },
                        },
                    },
                }),
            },
        });
        return {
            message: 'Property updated successfully',
            property: updatedProperty,
        };
    }
    async updatePropertyStatus(currentUser, propertyId, status) {
        const property = await this.PrismaService.property.findFirst({
            where: {
                id: propertyId,
                companyId: currentUser.companyId,
            },
        });
        if (property.propertyStatus === client_1.PropertyStatus.SOLD) {
            throw new common_1.ConflictException('property sold not can not be updated ');
        }
        const updatePropertyStatus = await this.PrismaService.property.update({
            where: {
                id: propertyId,
                companyId: currentUser.companyId,
                propertyStatus: {
                    not: client_1.PropertyStatus.SOLD,
                },
            },
            data: {
                propertyStatus: status,
            },
        });
        return {
            message: 'property status updated successfully',
            data: updatePropertyStatus,
        };
    }
    async remove(id, currentUser) {
        await this.PrismaService.property.delete({
            where: {
                id_companyId: {
                    id,
                    companyId: currentUser.companyId,
                },
            },
        });
        return {
            message: 'Property deleted successfully',
        };
    }
    async addAgentToProperty(currentUser, id, agentId) {
        const property = await this.PrismaService.property.findFirst({
            where: {
                id,
                companyId: currentUser.companyId,
            },
        });
        if (!property) {
            throw new common_1.NotFoundException('Property not found');
        }
        const agent = await this.PrismaService.user.findFirst({
            where: {
                id: agentId,
                companyId: currentUser.companyId,
            },
        });
        if (!agent) {
            throw new common_1.NotFoundException('Agent not found ');
        }
        return await this.PrismaService.propertyAgent.create({
            data: {
                property: {
                    connect: {
                        id,
                    },
                },
                agent: {
                    connect: {
                        id: agentId,
                    },
                },
                createdBy: {
                    connect: {
                        id: currentUser.id,
                    },
                },
            },
        });
    }
    async getAgents(currentUser, id) {
        return await this.PrismaService.propertyAgent.findMany({
            where: {
                propertyId: id,
                property: {
                    companyId: currentUser.companyId,
                },
            },
        });
    }
    async deleteAgent(currentUser, id, agentId) {
        return await this.PrismaService.propertyAgent.delete({
            where: {
                propertyId_agentId: {
                    agentId,
                    propertyId: id,
                },
            },
        });
    }
};
exports.PropertyService = PropertyService;
exports.PropertyService = PropertyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PropertyService);
//# sourceMappingURL=property.service.js.map