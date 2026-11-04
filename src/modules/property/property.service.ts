import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, PropertyStatus } from '@prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { userEntity } from '../auth/dto/create-auth.dto';
import { GetQueryDto } from '../property/dto/get-query.dto';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { tryCatch } from 'bullmq';

@Injectable()
export class PropertyService {
  constructor(private readonly PrismaService: PrismaService) {}
  async create(dto: CreatePropertyDto, currentUser: userEntity) {
    const {
      title,
      description,
      price,
      address,

      state,

      city,
      attachmentsId,
      amenities,
      propertyPurpose,
      propertyType,
      isFeatured,
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

    // await this.checkPropertyLimit(existingCompany.id);
    // create property
    const property = await this.PrismaService.$transaction(async (tx) => {
      // create new property

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
      // check the upload is not more than 5
      if (attachmentsId?.length > 5) {
        throw new BadRequestException(
          'A property can have a maximum of 5 images',
        );
      }
      // ensure each upload id appear once
      const uniqueId = [...new Set(attachmentsId)];
      if (uniqueId.length !== attachmentsId.length) {
        throw new BadRequestException('Duplicate upload IDs are not allowed');
      }

      if (attachmentsId?.length && newProperty.attachment) {
        const attachmentId = newProperty.attachment.id;

        await Promise.all(
          attachmentsId.map((uploadId, index) =>
            tx.upload.update({
              where: {
                id: uploadId,
              },
              data: {
                attachmentsId: attachmentId,
                order: index + 1,
              },
            }),
          ),
        );
      }
      return newProperty;
    });

    return {
      message: 'Property created successfully',
      property,
    };
  }

  async findAll(currentUser: userEntity, query: GetQueryDto) {
    const { status, limit, page, search } = query;
    const skip = (page - 1) * limit;
    const searchTerm =search?.trim() ??''
    const searchPrice = Number(searchTerm);
    const isValidPrice = searchPrice  && Number.isFinite(searchPrice);
    const where: Prisma.PropertyWhereInput = {
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

  // Find one property
  async findOne(
    id: string,
    currentUser: userEntity,
    source: 'dashboard' | 'marketplace' = 'dashboard',
  ) {
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
      throw new NotFoundException('Property not found');
    }

    // create product view when customer open property
    if (source === 'marketplace') {
      try {
        await this.PrismaService.propertyView.create({
          data: {
            propertyId: property.id,
          },
        });
      } catch (error) {
        console.error('Failed to record property view:', error);
      }
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

      state,

      city,
      attachmentsId,
      amenities,
      propertyPurpose,
      propertyType,

      bedrooms,
      parkingSpace,
      bathrooms,
    } = dto;

    const property = await this.PrismaService.property.findFirst({
      where: {
        id,
        companyId: currentUser.companyId,
      },
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    const updatedProperty = await this.PrismaService.$transaction(
      async (tx) => {
        let attachmentId = property.attachmentsId;

        // 1. Create an attachment record only if needed.
        if (attachmentsId !== undefined && !attachmentId) {
          const attachment = await tx.attachments.create({
            data: {},
          });

          attachmentId = attachment.id;

          // 2. Link the new attachment to the property.
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

        // 5. Return the latest property with its images.
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
      },
    );
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

  // get stats for total property

  async getPropertyStats(currentUser: userEntity) {
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

  async getPropertyPerformanceStats(currentUser: userEntity) {
    const companyId = currentUser.companyId;

    const [views, enquiries, reservations, totalProperties, totalAmount] =
      await Promise.all([
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

  // plan limit
  async checkPropertyLimit(companyId: string) {
    // find the company subcription
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
        throw new ForbiddenException('No  active subscription ');
      }

      const propertyCount = await tx.property.count({
        where: {
          companyId,
        },
      });

      if (propertyCount >= subscription.plan.maxProperties) {
        throw new ForbiddenException(
          `Your ${subscription.plan.name} plan allows a maximum of ${subscription.plan.maxProperties} properties`,
        );
      }
    });
  }
}
