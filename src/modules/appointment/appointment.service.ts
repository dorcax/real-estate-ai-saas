import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { userEntity } from '../auth/dto/create-auth.dto';
import { GetQueryDto } from '../property/dto/get-query.dto';

@Injectable()
export class AppointmentService {
  constructor(private readonly PrismaService: PrismaService) {}
  async create(dto: CreateAppointmentDto, currentUser: userEntity) {
    if (!currentUser.companyId) {
      throw new BadRequestException('User is not assigned to a company');
    }

    const {
      customerId,
      leadId,
      propertyId,
      title,
      type,
      startAt,
      endAt,
      location,
      notes,
    } = dto;

    const companyId = currentUser.companyId;

    // Validate appointment dates
    const start = new Date(startAt);
    const end = new Date(endAt);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new BadRequestException('Invalid appointment date or time');
    }

    if (end <= start) {
      throw new BadRequestException('End time must be after start time');
    }

    // Check customer, lead and property
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
      throw new BadRequestException('Customer not found in this company');
    }

    if (!lead) {
      throw new BadRequestException(
        'Lead not found or does not belong to this customer',
      );
    }

    if (!property) {
      throw new BadRequestException('Property not found in this company');
    }

    // Make sure the logged-in agent is assigned to this lead
    if (lead.assignedAgentId !== currentUser.id) {
      throw new BadRequestException('You are not assigned to this lead');
    }

    // Check for appointment conflict
    const conflictingAppointment =
      await this.PrismaService.appointment.findFirst({
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
      throw new BadRequestException(
        'You already have an appointment during this time',
      );
    }

    // Create appointment
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

  async findAll(currentUser: userEntity, query: GetQueryDto) {
    if (!currentUser.companyId) {
      throw new BadRequestException('User is not assigned to a company');
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

  async findOne(id: string, currentUser: userEntity) {
    if (!currentUser.companyId) {
      throw new BadRequestException('User is not assigned to a company');
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
      throw new BadRequestException('Appointment not found');
    }

    return {
      message: 'Appointment retrieved successfully',
      data: appointment,
    };
  }

  async update(id: string, dto: UpdateAppointmentDto, currentUser: userEntity) {
    if (!currentUser.companyId) {
      throw new BadRequestException('User is not assigned to a company');
    }

    const appointment = await this.PrismaService.appointment.findFirst({
      where: {
        id,
        companyId: currentUser.companyId,
      },
    });

    if (!appointment) {
      throw new BadRequestException('Appointment not found');
    }

    const start = dto.startAt ? new Date(dto.startAt) : appointment.startAt;

    const end = dto.endAt ? new Date(dto.endAt) : appointment.endAt;

    if (end <= start) {
      throw new BadRequestException('End time must be after start time');
    }


    // Check for overlapping appointment
    const conflictingAppointment =
      await this.PrismaService.appointment.findFirst({
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
      throw new BadRequestException(
        'You already have another appointment during this time',
      );
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

 
  async remove(
  id: string,
  currentUser: userEntity,
) {
  if (!currentUser.companyId) {
    throw new BadRequestException(
      'User is not assigned to a company',
    );
  }

  const appointment =
    await this.PrismaService.appointment.findFirst({
      where: {
        id,
        companyId: currentUser.companyId,
      },
    });

  if (!appointment) {
    throw new BadRequestException(
      'Appointment not found',
    );
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
}
