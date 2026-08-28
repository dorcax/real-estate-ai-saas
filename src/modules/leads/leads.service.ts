import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AssignLeadDto, CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto, UpdateLeadStatusDto } from './dto/update-lead.dto';
import { userEntity } from '../auth/dto/create-auth.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { GetQueryDto } from '../property/dto/get-query.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class LeadsService {
  constructor(private readonly PrismaService: PrismaService) {}
  async create(dto: CreateLeadDto,  tx?: Prisma.TransactionClient,) {
    if (!dto.companyId) {
      throw new BadRequestException('User is not assigned to a company');
    }

    const {
      customerId,
      intent,
      budgetMinimum,
      budgetMaximum,
      preferredLocation,
      status,
      preferredState,
      companyId,
      propertyId,
      preferredType,
      preferredPurpose,
      
    } = dto;

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

    // Check that customer exists and belongs to this company
    const customer = await tx ?? this.PrismaService.customer.findFirst({
      where: {
        id: customerId,
        companyId
      },
    });

    if (!customer) {
      throw new BadRequestException('Customer not found');
    }

    const lead = await tx ??this.PrismaService.lead.create({
      data: {
        intent,
        budgetMinimum,
        budgetMaximum,
        preferredLocation,
        preferredPurpose,
        preferredType,
        preferredState,
     
        status,
       
       

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

  async findAll(currentUser: userEntity, query: GetQueryDto) {
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
          createdBy: true,
          assignedTo: true,
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

  async findOne(id: string, currentUser: userEntity) {
    const lead = await this.PrismaService.lead.findFirst({
      where: {
        id,
        companyId: currentUser.companyId,
      },

      include: {
        customer: true,
        createdBy: true,
        assignedTo: true,
      },
    });

    if (!lead) {
      throw new BadRequestException('Lead not found');
    }

    return {
      message: 'Lead retrieved successfully',
      data: lead,
    };
  }

  async update(id: string, dto: UpdateLeadDto, currentUser: userEntity) {
    const { customerId, ...leadData } = dto;
    const existingLead = await this.PrismaService.lead.findFirst({
      where: {
        id,
        companyId: currentUser.companyId,
      },
    });

    if (!existingLead) {
      throw new BadRequestException('Lead not found');
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

  async updateStatus(
    id: string,
    dto: UpdateLeadStatusDto,
    currentUser: userEntity,
  ) {
    const lead = await this.PrismaService.lead.findFirst({
      where: {
        id,
        companyId: currentUser.companyId,
      },
    });

    if (!lead) {
      throw new BadRequestException('Lead not found');
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

  // assign agent to lead
  async assignAgent(id: string, dto: AssignLeadDto, currentUser: userEntity) {
    const lead = await this.PrismaService.lead.findFirst({
      where: {
        id,
        companyId: currentUser.companyId,
      },
    });

    if (!lead) {
      throw new BadRequestException('Lead not found');
    }

    const agent = await this.PrismaService.user.findFirst({
      where: {
        id: dto.agentId,
        companyId: currentUser.companyId,
        role: 'AGENT',
      },
    });

    if (!agent) {
      throw new BadRequestException('Agent not found in this company');
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

  // unassign agent to lead
  async unassignAgent(id: string, currentUser: userEntity) {
    const lead = await this.PrismaService.lead.findFirst({
      where: {
        id,
        companyId: currentUser.companyId,
      },
    });

    if (!lead) {
      throw new BadRequestException('Lead not found');
    }

    if (!lead.assignedAgentId) {
      throw new BadRequestException('No agent is assigned to this lead');
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
  async remove(id: string, currentUser: userEntity) {
    const existingLead = await this.PrismaService.lead.findFirst({
      where: {
        id,
        companyId: currentUser.companyId,
      },
    });

    if (!existingLead) {
      throw new BadRequestException('Lead not found');
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
}
