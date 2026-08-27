import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { userEntity } from '../auth/dto/create-auth.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { GetQueryDto } from '../property/dto/get-query.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly PrismaService: PrismaService) {}
  async create(dto: CreateCustomerDto, currentUser: userEntity) {
    const { fullName, email, phone, address, city, state, country, notes } =
      dto;

    // Check if customer already exists in this company
    const existingCustomer = await this.PrismaService.customer.findUnique({
      where: {
        companyId_phone: {
          companyId: currentUser.companyId,
          phone,
        },
      },
    });

    if (existingCustomer) {
      throw new BadRequestException(
        'Customer with this phone number already exists',
      );
    }
    const customer = await this.PrismaService.customer.create({
      data: {
        fullName,
        email,
        address,
        state,
        phone,
        city,
        country,
        notes,
        company: {
          connect: {
            id: currentUser.companyId,
          },
        },
        createdBy: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });
    return {
      message:'customer created successfully',
      data:customer

    }
  }

  async findAll(currentUser: userEntity, query: GetQueryDto) {
    const { page, limit } = query;
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.PrismaService.customer.findMany({
        where: {
          companyId: currentUser.companyId,
        },
        skip,
        take: limit,
      }),
      this.PrismaService.customer.count({
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
  const customer = await this.PrismaService.customer.findFirst({
    where: {
      
      id,
      companyId: currentUser.companyId,
    },
    include: {
      leads: true,
      appointments: true,
    },
  });

  if (!customer) {
    throw new BadRequestException('Customer not found');
  }

  return {
    message: 'Customer retrieved successfully',
    data: customer,
  };
}

async update(
  id: string,
  dto: UpdateCustomerDto,
  currentUser: userEntity,
) {
  const existingCustomer =
    await this.PrismaService.customer.findFirst({
      where: {
        id,
        companyId: currentUser.companyId,
      },
    });

  if (!existingCustomer) {
    throw new BadRequestException('Customer not found');
  }

  if (dto.phone && dto.phone !== existingCustomer.phone) {
    const phoneExists =
      await this.PrismaService.customer.findUnique({
        where: {
          companyId_phone: {
            companyId: currentUser.companyId,
            phone: dto.phone,
          },
        },
      });

    if (phoneExists) {
      throw new BadRequestException(
        'Customer with this phone number already exists',
      );
    }
  }

  const customer = await this.PrismaService.customer.update({
    where: {
      id,
    },
    data: {
      ...dto,
    },
  });

  return {
    message: 'Customer updated successfully',
    data: customer,
  };
}

async remove(id: string, currentUser: userEntity) {
  const existingCustomer =
    await this.PrismaService.customer.findFirst({
      where: {
        id,
        companyId: currentUser.companyId,
      },
    });

  if (!existingCustomer) {
    throw new BadRequestException('Customer not found');
  }

  await this.PrismaService.customer.delete({
    where: {
      id
    },
  });

  return {
    message: 'Customer deleted successfully',
  };
}

}
