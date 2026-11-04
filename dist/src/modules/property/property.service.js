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
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../services/prisma/prisma.service");
let PropertyService = class PropertyService {
    PrismaService;
    constructor(PrismaService) {
        this.PrismaService = PrismaService;
    }
    async create(dto, currentUser) {
        const { title, description, price, address, state, city, attachmentsId, amenities, propertyPurpose, propertyType, isFeatured, bedrooms, parkingSpace, bathrooms, } = dto;
        const existingCompany = await this.PrismaService.company.findFirst({
            where: {
                id: currentUser.companyId,
            },
        });
        if (!existingCompany)
            throw new common_1.NotFoundException('company not found ');
        const property = await this.PrismaService.$transaction(async (tx) => {
            const newProperty = await tx.property.create({
                data: {
                    title,
                    description,
                    price,
                    address,
                    city,
                    state,
                    isFeatured,
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
                include: {
                    attachment: true,
                },
            });
            if (attachmentsId?.length > 5) {
                throw new common_1.BadRequestException('A property can have a maximum of 5 images');
            }
            const uniqueId = [...new Set(attachmentsId)];
            if (uniqueId.length !== attachmentsId.length) {
                throw new common_1.BadRequestException('Duplicate upload IDs are not allowed');
            }
            if (attachmentsId?.length && newProperty.attachment) {
                const attachmentId = newProperty.attachment.id;
                await Promise.all(attachmentsId.map((uploadId, index) => tx.upload.update({
                    where: {
                        id: uploadId,
                    },
                    data: {
                        attachmentsId: attachmentId,
                        order: index + 1,
                    },
                })));
            }
            return newProperty;
        });
        return {
            message: 'Property created successfully',
            property,
        };
    }
    async findAll(currentUser, query) {
        const { status, limit, page, search } = query;
        const skip = (page - 1) * limit;
        const searchTerm = search?.trim() ?? '';
        const searchPrice = Number(searchTerm);
        const isValidPrice = searchPrice && Number.isFinite(searchPrice);
        const where = {
            companyId: currentUser.companyId,
            ...(status && { propertyStatus: status }),
            ...(search && {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                    { address: { contains: search, mode: 'insensitive' } },
                    ...(isValidPrice
                        ? [
                            {
                                price: {
                                    equals: searchPrice,
                                },
                            },
                        ]
                        : []),
                    { city: { contains: search, mode: 'insensitive' } },
                    { state: { contains: search, mode: 'insensitive' } },
                ],
            }),
        };
        const [data, total] = await Promise.all([
            this.PrismaService.property.findMany({
                where,
                skip,
                take: limit,
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    attachment: {
                        select: {
                            uploads: {
                                orderBy: {
                                    order: 'asc',
                                },
                            },
                        },
                    },
                },
            }),
            this.PrismaService.property.count({
                where,
            }),
        ]);
        console.log({
            page,
            limit,
            search,
            skip,
            total,
            totalPage: Math.ceil(total / limit),
            returned: data.length,
        });
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
    async findOne(id, currentUser, source = 'dashboard') {
        const property = await this.PrismaService.property.findFirst({
            where: {
                id,
                ...(source === 'dashboard'
                    ? { companyId: currentUser.companyId }
                    : { PropertyStatus: 'Available' }),
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
        if (source === 'marketplace') {
            try {
                await this.PrismaService.propertyView.create({
                    data: {
                        propertyId: property.id,
                    },
                });
            }
            catch (error) {
                console.error('Failed to record property view:', error);
            }
        }
        return {
            property,
        };
    }
    async update(id, dto, currentUser) {
        const { title, description, price, address, state, city, attachmentsId, amenities, propertyPurpose, propertyType, bedrooms, parkingSpace, bathrooms, } = dto;
        const property = await this.PrismaService.property.findFirst({
            where: {
                id,
                companyId: currentUser.companyId,
            },
        });
        if (!property) {
            throw new common_1.NotFoundException('Property not found');
        }
        const updatedProperty = await this.PrismaService.$transaction(async (tx) => {
            let attachmentId = property.attachmentsId;
            if (attachmentsId !== undefined && !attachmentId) {
                const attachment = await tx.attachments.create({
                    data: {},
                });
                attachmentId = attachment.id;
                await tx.property.update({
                    where: { id },
                    data: {
                        attachmentsId: attachmentId,
                    },
                });
            }
            await tx.property.update({
                where: { id },
                data: {
                    title,
                    description,
                    price,
                    address,
                    state,
                    city,
                    amenities,
                    propertyPurpose,
                    propertyType,
                    bedrooms,
                    parkingSpace,
                    bathrooms,
                },
            });
            if (attachmentsId !== undefined && attachmentId) {
                await tx.attachments.update({
                    where: { id: attachmentId },
                    data: {
                        uploads: {
                            set: attachmentsId.map((uploadId) => ({
                                id: uploadId,
                            })),
                        },
                    },
                });
            }
            return tx.property.findUnique({
                where: { id },
                include: {
                    attachment: {
                        include: {
                            uploads: {
                                orderBy: { order: 'asc' },
                            },
                        },
                    },
                },
            });
        });
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
    async getPropertyStats(currentUser) {
        const [total, rented, sold, pending] = await Promise.all([
            this.PrismaService.property.count({
                where: {
                    companyId: currentUser.companyId,
                },
            }),
            this.PrismaService.property.count({
                where: {
                    companyId: currentUser.companyId,
                    propertyStatus: 'RENTED',
                },
            }),
            this.PrismaService.property.count({
                where: {
                    companyId: currentUser.companyId,
                    propertyStatus: 'SOLD',
                },
            }),
            this.PrismaService.property.count({
                where: {
                    companyId: currentUser.companyId,
                    propertyStatus: 'PENDING',
                },
            }),
        ]);
        return {
            total,
            rented,
            sold,
            pending,
        };
    }
    async getPropertyPerformanceStats(currentUser) {
        const companyId = currentUser.companyId;
        const [views, enquiries, reservations, totalProperties, totalAmount] = await Promise.all([
            this.PrismaService.propertyView.count({
                where: {
                    property: {
                        companyId,
                    },
                },
            }),
            this.PrismaService.enquiry.count({
                where: {
                    property: {
                        companyId,
                    },
                },
            }),
            this.PrismaService.appointment.count({
                where: {
                    property: {
                        companyId,
                    },
                },
            }),
            this.PrismaService.property.count({
                where: {
                    companyId,
                },
            }),
            this.PrismaService.payment.aggregate({
                where: {
                    companyId: currentUser.companyId,
                    status: 'SUCCESSFUL',
                },
                _sum: {
                    amount: true,
                },
            }),
        ]);
        return {
            views,
            enquiries,
            reservations,
            totalProperties,
            totalAmount: totalAmount._sum.amount ?? 0,
        };
    }
    async checkPropertyLimit(companyId) {
        await this.PrismaService.$transaction(async (tx) => {
            const subscription = await tx.subscription.findFirst({
                where: {
                    companyId,
                },
                include: {
                    plan: {
                        select: {
                            maxProperties: true,
                            name: true,
                        },
                    },
                },
            });
            if (!subscription) {
                throw new common_1.ForbiddenException('No  active subscription ');
            }
            const propertyCount = await tx.property.count({
                where: {
                    companyId,
                },
            });
            if (propertyCount >= subscription.plan.maxProperties) {
                throw new common_1.ForbiddenException(`Your ${subscription.plan.name} plan allows a maximum of ${subscription.plan.maxProperties} properties`);
            }
        });
    }
};
exports.PropertyService = PropertyService;
exports.PropertyService = PropertyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PropertyService);
//# sourceMappingURL=property.service.js.map