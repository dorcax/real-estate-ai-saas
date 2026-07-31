import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { userEntity } from '../auth/dto/create-auth.dto';

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
        createdBy:{
          connect:{
            id:currentUser.id
          }

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

  findAll() {
    return `This action returns all property`;
  }

  findOne(id: number) {
    return `This action returns a #${id} property`;
  }

  update(id: number, updatePropertyDto: UpdatePropertyDto) {
    return `This action updates a #${id} property`;
  }

  remove(id: number) {
    return `This action removes a #${id} property`;
  }
}
