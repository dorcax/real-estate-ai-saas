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
exports.AppointmentRequestService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../services/prisma/prisma.service");
const customer_service_1 = require("../customer/customer.service");
const leads_service_1 = require("../leads/leads.service");
let AppointmentRequestService = class AppointmentRequestService {
    prismaService;
    customerService;
    leadService;
    constructor(prismaService, customerService, leadService) {
        this.prismaService = prismaService;
        this.customerService = customerService;
        this.leadService = leadService;
    }
    async create(dto) {
        const { fullName, email, phone, propertyId, appointmentType, requestedStartAt, requestedEndAt, message, timezone, } = dto;
        return await this.prismaService.$transaction(async (tx) => {
            const property = await tx.property.findUnique({
                where: {
                    id: propertyId,
                },
                include: {
                    company: {
                        select: {
                            id: true,
                        },
                    },
                    assignedAgents: {
                        include: {
                            agent: {
                                select: {
                                    id: true,
                                },
                            },
                        },
                    },
                },
            });
            if (!property) {
                throw new common_1.NotFoundException('Property not found');
            }
            const companyId = property.company.id;
            const agent = property.assignedAgents[0]?.agent;
            const customer = await this.customerService.create({
                fullName,
                email,
                phone,
                companyId,
            }, tx);
            const existingRequest = await tx.appointmentRequest.findFirst({
                where: {
                    companyId,
                    customerId: customer.data.id,
                    propertyId,
                    status: 'PENDING',
                },
            });
            if (existingRequest) {
                throw new common_1.BadRequestException('You already have a pending appointment request for this property');
            }
            const lead = await this.leadService.create({
                customerId: customer.data.id,
                companyId,
                intent: 'GENERAL_ENQUIRY',
                status: 'NEW',
                propertyId: property.id,
                preferredType: property.propertyType,
                preferredPurpose: property.propertyPurpose,
                preferredLocation: property.city,
                preferredState: property.state,
            }, tx);
            const appointmentRequest = await tx.appointmentRequest.create({
                data: {
                    type: appointmentType,
                    status: 'PENDING',
                    requestedStartAt: new Date(requestedStartAt),
                    requestedEndAt: new Date(requestedEndAt),
                    timezone: timezone ?? 'Africa/Lagos',
                    notes: message,
                    company: {
                        connect: {
                            id: companyId,
                        },
                    },
                    customer: {
                        connect: {
                            id: customer.data.id,
                        },
                    },
                    lead: {
                        connect: {
                            id: lead.data.id,
                        },
                    },
                    property: {
                        connect: {
                            id: property.id,
                        },
                    },
                    ...(agent && {
                        agent: {
                            connect: {
                                id: agent.id,
                            },
                        },
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
                message: 'Appointment request sent successfully',
                data: appointmentRequest,
            };
        });
    }
    async accept(id, currentUser) {
        return await this.prismaService.$transaction(async (tx) => {
            const request = await tx.appointmentRequest.findFirst({
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
            if (!request) {
                throw new common_1.NotFoundException('Appointment request not found');
            }
            if (request.status !== 'PENDING') {
                throw new common_1.BadRequestException(`Appointment request has already been ${request.status.toLowerCase()}`);
            }
            if (!request.agentId) {
                throw new common_1.BadRequestException('No agent is assigned to this appointment request');
            }
            if (request.agentId !== currentUser.id) {
                throw new common_1.BadRequestException('You are not assigned to this appointment request');
            }
            const startAt = request.requestedStartAt;
            const endAt = request.requestedEndAt;
            const dayOfWeek = startAt.getDay();
            const availability = await tx.availability.findFirst({
                where: {
                    userId: request.agentId,
                    dayOfWeek,
                    isActive: true,
                },
            });
            if (!availability) {
                throw new common_1.BadRequestException('Agent is not available on this day');
            }
            const blockedTime = await tx.blockedTime.findFirst({
                where: {
                    userId: request.agentId,
                    startAt: {
                        lt: request.requestedEndAt,
                    },
                    endAt: {
                        gt: request.requestedStartAt,
                    },
                },
            });
            if (blockedTime) {
                throw new common_1.BadRequestException('The requested time is blocked for this agent');
            }
            const ExistingAppointment = await tx.appointment.findFirst({
                where: {
                    agentId: request.agentId,
                    status: {
                        in: ['PENDING', 'CONFIRMED', 'RESCHEDULED'],
                    },
                    startAt: {
                        lt: request.requestedEndAt,
                    },
                    endAt: {
                        gt: request.requestedStartAt,
                    },
                },
            });
            if (ExistingAppointment) {
                throw new common_1.BadRequestException('Agent is not available at the requested time');
            }
            const appointment = await tx.appointment.create({
                data: {
                    title: `Property Inspection - ${request.customer.fullName}`,
                    type: request.type,
                    status: 'CONFIRMED',
                    description: request.notes,
                    startAt: request.requestedStartAt,
                    endAt: request.requestedEndAt,
                    timezone: request.timezone,
                    company: {
                        connect: {
                            id: request.companyId,
                        },
                    },
                    customer: {
                        connect: {
                            id: request.customerId,
                        },
                    },
                    agent: {
                        connect: {
                            id: request.agentId,
                        },
                    },
                    property: {
                        connect: {
                            id: request.propertyId,
                        },
                    },
                    lead: request.leadId
                        ? {
                            connect: {
                                id: request.leadId,
                            },
                        }
                        : undefined,
                },
                include: {
                    customer: true,
                    property: true,
                    agent: true,
                    lead: true,
                },
            });
            await tx.appointmentRequest.update({
                where: {
                    id: request.id,
                },
                data: {
                    status: 'APPROVED',
                },
            });
            if (request.leadId) {
                await tx.lead.update({
                    where: {
                        id: request.leadId,
                    },
                    data: {
                        status: 'APPOINTMENT_BOOKED',
                    },
                });
            }
            return {
                message: 'Appointment request accepted successfully',
                data: appointment,
            };
        });
    }
    async reject(id, dto, currentUser) {
        return await this.prismaService.$transaction(async (tx) => {
            const request = await tx.appointmentRequest.findFirst({
                where: {
                    id,
                    companyId: currentUser.companyId,
                },
            });
            if (!request) {
                throw new common_1.NotFoundException('Appointment request not found');
            }
            if (request.status !== 'PENDING') {
                throw new common_1.BadRequestException('Only pending appointment requests can be rejected');
            }
            if (request.agentId && request.agentId !== currentUser.id) {
                throw new common_1.BadRequestException('You are not assigned to this appointment request');
            }
            const updatedRequest = await tx.appointmentRequest.update({
                where: {
                    id,
                },
                data: {
                    status: 'REJECTED',
                    rejectionReason: dto.reason,
                },
                include: {
                    customer: true,
                    lead: true,
                    property: true,
                    agent: true,
                },
            });
            return {
                message: 'Appointment request rejected successfully',
                data: updatedRequest,
            };
        });
    }
    async reschedule(id, dto, currentUser) {
        return await this.prismaService.$transaction(async (tx) => {
            const request = await tx.appointmentRequest.findFirst({
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
            if (!request) {
                throw new common_1.NotFoundException('Appointment request not found');
            }
            if (request.status !== 'PENDING') {
                throw new common_1.BadRequestException('Only pending appointment requests can be rescheduled');
            }
            if (request.agentId && request.agentId !== currentUser.id) {
                throw new common_1.BadRequestException('You are not assigned to this appointment request');
            }
            const newStartAt = new Date(dto.requestedStartAt);
            const newEndAt = new Date(dto.requestedEndAt);
            if (newStartAt >= newEndAt) {
                throw new common_1.BadRequestException('End time must be after start time');
            }
            if (request.agentId) {
                const conflict = await tx.appointment.findFirst({
                    where: {
                        agentId: request.agentId,
                        status: {
                            in: ['PENDING', 'CONFIRMED', 'RESCHEDULED'],
                        },
                        startAt: {
                            lt: newEndAt,
                        },
                        endAt: {
                            gt: newStartAt,
                        },
                    },
                });
                if (conflict) {
                    throw new common_1.BadRequestException('Agent is not available at the proposed time');
                }
                const blocked = await tx.blockedTime.findFirst({
                    where: {
                        userId: request.agentId,
                        startAt: {
                            lt: newEndAt,
                        },
                        endAt: {
                            gt: newStartAt,
                        },
                    },
                });
                if (blocked) {
                    throw new common_1.BadRequestException('The proposed time is blocked for this agent');
                }
            }
            const updatedRequest = await tx.appointmentRequest.update({
                where: {
                    id,
                },
                data: {
                    status: 'RESCHEDULE_REQUESTED',
                    requestedStartAt: newStartAt,
                    requestedEndAt: newEndAt,
                    notes: dto.message ?? request.notes,
                },
                include: {
                    customer: true,
                    lead: true,
                    property: true,
                    agent: true,
                },
            });
            return {
                message: 'Appointment reschedule request sent successfully',
                data: updatedRequest,
            };
        });
    }
};
exports.AppointmentRequestService = AppointmentRequestService;
exports.AppointmentRequestService = AppointmentRequestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        customer_service_1.CustomerService,
        leads_service_1.LeadsService])
], AppointmentRequestService);
//# sourceMappingURL=appointment-request.service.js.map