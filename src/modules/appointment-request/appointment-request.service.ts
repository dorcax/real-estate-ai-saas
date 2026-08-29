import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { userEntity } from '../auth/dto/create-auth.dto';
import { CustomerService } from '../customer/customer.service';
import { LeadsService } from '../leads/leads.service';
import {
  CreateAppointmentRequestDto,
  RejectAppointmentRequestDto,
  RescheduleAppointmentRequestDto,
} from './dto/create-appointment-request.dto';

@Injectable()
export class AppointmentRequestService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly customerService: CustomerService,
    private readonly leadService: LeadsService,
  ) {}
  async create(dto: CreateAppointmentRequestDto) {
    const {
      fullName,
      email,
      phone,
      propertyId,
      appointmentType,
      requestedStartAt,
      requestedEndAt,
      message,
      timezone,
    } = dto;

    return await this.prismaService.$transaction(async (tx) => {
      // Find property
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
        throw new NotFoundException('Property not found');
      }

      const companyId = property.company.id;

      // Get agent
      const agent = property.assignedAgents[0]?.agent;


      //  create customer
      const customer = await this.customerService.create(
        {
          fullName,
          email,
          phone,
          companyId,
        },
        tx,
      );

      // prevent duplicate pending request
      const existingRequest = await tx.appointmentRequest.findFirst({
        where: {
          companyId,
          customerId: customer.data.id,
          propertyId,
          status: 'PENDING',
        },
      });

      if (existingRequest) {
        throw new BadRequestException(
          'You already have a pending appointment request for this property',
        );
      }

      

      // create lead

      const lead = await this.leadService.create(
        {
          customerId: customer.data.id,
          companyId,

          intent: 'GENERAL_ENQUIRY',
          status: 'NEW',

          propertyId: property.id,

          preferredType: property.propertyType,
          preferredPurpose: property.propertyPurpose,
          preferredLocation: property.city,
          preferredState: property.state,
        },
        tx,
      );

      // create appointment request

      const appointmentRequest = await tx.appointmentRequest.create({
        data: {
          type: appointmentType,

          status: 'PENDING',

          requestedStartAt: new Date(requestedStartAt),

          requestedEndAt: new Date(requestedEndAt),

          timezone: timezone ?? 'Africa/Lagos',

          notes:message,

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

  async accept(id: string, currentUser: userEntity) {
    return await this.prismaService.$transaction(async (tx) => {
      // find appointment request

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
        throw new NotFoundException('Appointment request not found');
      }
      // check appointment request status

      if (request.status !== 'PENDING') {
        throw new BadRequestException(
          `Appointment request has already been ${request.status.toLowerCase()}`,
        );
      }

      // check if agent exist

      if (!request.agentId) {
        throw new BadRequestException(
          'No agent is assigned to this appointment request',
        );
      }

      // Make sure current agent is the assigned agent
      if (request.agentId !== currentUser.id) {
        throw new BadRequestException(
          'You are not assigned to this appointment request',
        );
      }

     

      const startAt = request.requestedStartAt;
      const endAt = request.requestedEndAt;

      // CHECK AVAILABILITY
      const dayOfWeek = startAt.getDay();

      const availability = await tx.availability.findFirst({
        where: {
          userId: request.agentId,
          dayOfWeek,
          isActive: true,
        },
      });

      if (!availability) {
        throw new BadRequestException('Agent is not available on this day');
      }
      // check blocked time

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
        throw new BadRequestException(
          'The requested time is blocked for this agent',
        );
      }

       // check for existing appointment

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
        throw new BadRequestException(
          'Agent is not available at the requested time',
        );
      }

      // create appointment

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

      // update appointment request
      await tx.appointmentRequest.update({
        where: {
          id: request.id,
        },

        data: {
          status: 'APPROVED',
        },
      });

      // update lead

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

  async reject(
    id: string,
    dto: RejectAppointmentRequestDto,
    currentUser: userEntity,
  ) {
    return await this.prismaService.$transaction(async (tx) => {
      // find request

      const request = await tx.appointmentRequest.findFirst({
        where: {
          id,
          companyId: currentUser.companyId,
        },
      });

      if (!request) {
        throw new NotFoundException('Appointment request not found');
      }

      // check agent

      if (request.status !== 'PENDING') {
        throw new BadRequestException(
          'Only pending appointment requests can be rejected',
        );
      }

      // check agent

      if (request.agentId && request.agentId !== currentUser.id) {
        throw new BadRequestException(
          'You are not assigned to this appointment request',
        );
      }

      //  update appointment request to reject

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

  async reschedule(
    id: string,
    dto: RescheduleAppointmentRequestDto,
    currentUser: userEntity,
  ) {
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
        throw new NotFoundException('Appointment request not found');
      }

      if (request.status !== 'PENDING') {
        throw new BadRequestException(
          'Only pending appointment requests can be rescheduled',
        );
      }

      if (request.agentId && request.agentId !== currentUser.id) {
        throw new BadRequestException(
          'You are not assigned to this appointment request',
        );
      }

      const newStartAt = new Date(dto.requestedStartAt);

      const newEndAt = new Date(dto.requestedEndAt);

      if (newStartAt >= newEndAt) {
        throw new BadRequestException('End time must be after start time');
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
          throw new BadRequestException(
            'Agent is not available at the proposed time',
          );
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
          throw new BadRequestException(
            'The proposed time is blocked for this agent',
          );
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
      // send a mail to the customer to make another request around that time

      return {
        message: 'Appointment reschedule request sent successfully',

        data: updatedRequest,
      };
    });
  }

  // implement notification , follow-up later 
  
}
