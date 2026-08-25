import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { userEntity } from '../auth/dto/create-auth.dto';
import { GetQueryDto } from '../property/dto/get-query.dto';
import { PropertyStatus } from '@prisma/client';

@Injectable()
export class PropertyService {
  constructor(private readonly PrismaService: PrismaService) {}
  async create(dto: CreatePropertyDto, currentUser: userEntity) {
    const {
      title,
      description,
      price,
      address,
      country,
      state,
      currency,
      city,
      attachmentsId,
      amenities,
      propertyPurpose,
      propertyType,
      propertyStatus,
      bedrooms,
      parkingSpace,
      bathrooms,
    } = dto;
    // find the company exist aand user
    const existingCompany = await this.PrismaService.company.findFirst({
      where: {
        id: currentUser.companyId,
      },
    });

    if (!existingCompany) throw new NotFoundException('company not found ');
    // create property
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

  async findAll(currentUser: userEntity, query: GetQueryDto) {
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

  // Find one property
  async findOne(id: string, currentUser: userEntity) {
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
      throw new NotFoundException('Property not found');
    }

    return {
      property,
    };
  }

  // Update property
  async update(id: string, dto: UpdatePropertyDto, currentUser: userEntity) {
    const {
      title,
      description,
      price,
      address,
      country,
      state,
      currency,
      city,
      attachmentsId,
      amenities,
      propertyPurpose,
      propertyType,
      propertyStatus,
      bedrooms,
      parkingSpace,
      bathrooms,
    } = dto;
    // First check that property belongs to this company
    const property = await this.PrismaService.property.findFirst({
      where: {
        id,
        companyId: currentUser.companyId,
      },
    });

    if (!property) {
      throw new NotFoundException('Property not found');
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

  // update status

  async updatePropertyStatus(
    currentUser: userEntity,
    propertyId: string,
    status: PropertyStatus,
  ) {
    const property = await this.PrismaService.property.findFirst({
      where: {
        id: propertyId,
        companyId: currentUser.companyId,
      },
    });

    if (property.propertyStatus === PropertyStatus.SOLD) {
      throw new ConflictException('property sold not can not be updated ');
    }

    const updatePropertyStatus = await this.PrismaService.property.update({
      where: {
        id: propertyId,
        companyId: currentUser.companyId,
        propertyStatus: {
          not: PropertyStatus.SOLD,
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

  // Delete property
  async remove(id: string, currentUser: userEntity) {
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

  // add agent to property
  async addAgentToProperty(
    currentUser: userEntity,
    id: string,
    agentId: string,
  ) {
    const property = await this.PrismaService.property.findFirst({
      where: {
        id,
        companyId: currentUser.companyId,
      },
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    const agent = await this.PrismaService.user.findFirst({
      where: {
        id: agentId,
        companyId: currentUser.companyId,
      },
    });
    if (!agent) {
      throw new NotFoundException('Agent not found ');
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
  
  // get agents
  async getAgents(currentUser: userEntity, id: string) {
    return await this.PrismaService.propertyAgent.findMany({
      where: {
        propertyId: id,
        property: {
          companyId: currentUser.companyId,
        },
      },
    });
  }

  // delete agent from the property
  async deleteAgent(currentUser: userEntity, id: string, agentId: string) {
    return await this.PrismaService.propertyAgent.delete({
      where: {
        propertyId_agentId: {
          agentId,
          propertyId: id,
        },
      },
    });
  }
}
