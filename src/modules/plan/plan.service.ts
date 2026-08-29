import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Injectable()
export class PlanService {
  constructor(private readonly prismaService: PrismaService) {}

  // CREATE PLAN
  async create(dto: CreatePlanDto) {
    const {
      code,
      name,
      description,
      currency,
      monthlyPrice,
      yearlyPrice,
   
      maxProperties,
     
      features,
      isActive,
    } = dto;

    // Check if plan code already exists
    const existingPlan = await this.prismaService.plan.findUnique({
      where: {
        code,
      },
    });

    if (existingPlan) {
      throw new BadRequestException(
        'A plan with this code already exists',
      );
    }

    const plan = await this.prismaService.plan.create({
      data: {
        code,
        name,
        description,
        currency: currency ?? 'USD',
        monthlyPrice,
        yearlyPrice,
        maxProperties,
        features,
        isActive: isActive ?? true,
      },
    });

    return {
      message: 'Plan created successfully',
      data: plan,
    };
  }

  // get all plans
  async findAll() {
    const plans = await this.prismaService.plan.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      message: 'Plans retrieved successfully',
      data: plans,
    };
  }

  //get one plan
  async findOne(id: string) {
    const plan = await this.prismaService.plan.findUnique({
      where: {
        id,
      },
    });

    if (!plan) {
      throw new NotFoundException('Plan not found');
    }

    return {
      message: 'Plan retrieved successfully',
      data: plan,
    };
  }

  // update plan 
  async update(id: string, dto: UpdatePlanDto) {
    const existingPlan = await this.prismaService.plan.findUnique({
      where: {
        id,
      },
    });

    if (!existingPlan) {
      throw new NotFoundException('Plan not found');
    }

    
    if (dto.code && dto.code !== existingPlan.code) {
      const codeExists = await this.prismaService.plan.findUnique({
        where: {
          code: dto.code,
        },
      });

      if (codeExists) {
        throw new BadRequestException(
          'A plan with this code already exists',
        );
      }
    }

    const plan = await this.prismaService.plan.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });

    return {
      message: 'Plan updated successfully',
      data: plan,
    };
  }

  // DEACTIVATE PLAN
  async deactivate(id: string) {
    const existingPlan = await this.prismaService.plan.findUnique({
      where: {
        id,
      },
    });

    if (!existingPlan) {
      throw new NotFoundException('Plan not found');
    }

    if (!existingPlan.isActive) {
      throw new BadRequestException('Plan is already inactive');
    }

    const plan = await this.prismaService.plan.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });

    return {
      message: 'Plan deactivated successfully',
      data: plan,
    };
  }
}