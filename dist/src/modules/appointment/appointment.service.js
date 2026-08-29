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
exports.AppointmentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../services/prisma/prisma.service");
let AppointmentService = class AppointmentService {
    PrismaService;
    constructor(PrismaService) {
        this.PrismaService = PrismaService;
    }
    async create(dto, currentUser) {
        if (!currentUser.companyId) {
            throw new common_1.BadRequestException('User is not assigned to a company');
        }
        const { customerId, leadId, propertyId, title, type, startAt, endAt, location, notes, } = dto;
        const companyId = currentUser.companyId;
        const start = new Date(startAt);
        const end = new Date(endAt);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            throw new common_1.BadRequestException('Invalid appointment date or time');
        }
        if (end <= start) {
            throw new common_1.BadRequestException('End time must be after start time');
        }
        const [customer, lead, property] = await Promise.all([
            this.PrismaService.customer.findFirst({
                where: {
                    id: customerId,
                    companyId,
                },
            }),
            this.PrismaService.lead.findFirst({
                where: {
                    id: leadId,
                    companyId,
                    customerId,
                },
            }),
            this.PrismaService.property.findFirst({
                where: {
                    id: propertyId,
                    companyId,
                },
            }),
        ]);
        if (!customer) {
            throw new common_1.BadRequestException('Customer not found in this company');
        }
        if (!lead) {
            throw new common_1.BadRequestException('Lead not found or does not belong to this customer');
        }
        if (!property) {
            throw new common_1.BadRequestException('Property not found in this company');
        }
        if (lead.assignedAgentId !== currentUser.id) {
            throw new common_1.BadRequestException('You are not assigned to this lead');
        }
        const conflictingAppointment = await this.PrismaService.appointment.findFirst({
            where: {
                companyId,
                agentId: currentUser.id,
                AND: [
                    {
                        startAt: {
                            lt: end,
                        },
                    },
                    {
                        endAt: {
                            gt: start,
                        },
                    },
                ],
            },
        });
        if (conflictingAppointment) {
            throw new common_1.BadRequestException('You already have an appointment during this time');
        }
        const appointment = await this.PrismaService.appointment.create({
            data: {
                title,
                type,
                startAt: start,
                endAt: end,
                location,
                notes,
                company: {
                    connect: {
                        id: companyId,
                    },
                },
                customer: {
                    connect: {
                        id: customerId,
                    },
                },
                lead: {
                    connect: {
                        id: leadId,
                    },
                },
                property: {
                    connect: {
                        id: propertyId,
                    },
                },
                agent: {
                    connect: {
                        id: currentUser.id,
                    },
                },
            },
            include: {
                customer: true,
                lead: true,
                property: true,
                agent: true,
            },
        });
        return {
            message: 'Appointment created successfully',
            data: appointment,
        };
    }
    async findAll(currentUser, query) {
        if (!currentUser.companyId) {
            throw new common_1.BadRequestException('User is not assigned to a company');
        }
        const { page, limit } = query;
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.PrismaService.appointment.findMany({
                where: {
                    companyId: currentUser.companyId,
                },
                skip,
                take: limit,
                include: {
                    customer: true,
                    lead: true,
                    property: true,
                    agent: true,
                },
                orderBy: {
                    startAt: 'asc',
                },
            }),
            this.PrismaService.appointment.count({
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
        if (!currentUser.companyId) {
            throw new common_1.BadRequestException('User is not assigned to a company');
        }
        const appointment = await this.PrismaService.appointment.findFirst({
            where: {
                id,
                companyId: currentUser.companyId,
            },
            include: {
                customer: true,
                lead: true,
                property: true,
                agent: true,
            },
        });
        if (!appointment) {
            throw new common_1.BadRequestException('Appointment not found');
        }
        return {
            message: 'Appointment retrieved successfully',
            data: appointment,
        };
    }
    async update(id, dto, currentUser) {
        if (!currentUser.companyId) {
            throw new common_1.BadRequestException('User is not assigned to a company');
        }
        const appointment = await this.PrismaService.appointment.findFirst({
            where: {
                id,
                companyId: currentUser.companyId,
            },
        });
        if (!appointment) {
            throw new common_1.BadRequestException('Appointment not found');
        }
        const start = dto.startAt ? new Date(dto.startAt) : appointment.startAt;
        const end = dto.endAt ? new Date(dto.endAt) : appointment.endAt;
        if (end <= start) {
            throw new common_1.BadRequestException('End time must be after start time');
        }
        const conflictingAppointment = await this.PrismaService.appointment.findFirst({
            where: {
                companyId: currentUser.companyId,
                agentId: appointment.agentId,
                id: {
                    not: appointment.id,
                },
                AND: [
                    {
                        startAt: {
                            lt: end,
                        },
                    },
                    {
                        endAt: {
                            gt: start,
                        },
                    },
                ],
            },
        });
        if (conflictingAppointment) {
            throw new common_1.BadRequestException('You already have another appointment during this time');
        }
        const updatedAppointment = await this.PrismaService.appointment.update({
            where: {
                id: appointment.id,
            },
            data: {
                ...dto,
                ...(dto.startAt && {
                    startAt: start,
                }),
                ...(dto.endAt && {
                    endAt: end,
                }),
            },
            include: {
                customer: true,
                lead: true,
                property: true,
                agent: true,
            },
        });
        return {
            message: 'Appointment updated successfully',
            data: updatedAppointment,
        };
    }
    async remove(id, currentUser) {
        if (!currentUser.companyId) {
            throw new common_1.BadRequestException('User is not assigned to a company');
        }
        const appointment = await this.PrismaService.appointment.findFirst({
            where: {
                id,
                companyId: currentUser.companyId,
            },
        });
        if (!appointment) {
            throw new common_1.BadRequestException('Appointment not found');
        }
        await this.PrismaService.appointment.delete({
            where: {
                id: appointment.id,
            },
        });
        return {
            message: 'Appointment deleted successfully',
        };
    }
};
exports.AppointmentService = AppointmentService;
exports.AppointmentService = AppointmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppointmentService);
//# sourceMappingURL=appointment.service.js.map