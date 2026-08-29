import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { userEntity } from '../auth/dto/create-auth.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { Subscription } from 'rxjs';

@Injectable()
export class SubscriptionService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(dto: CreateSubscriptionDto, currentUser: userEntity) {
    if (!currentUser.companyId) {
      throw new BadRequestException();
    }
    // check plan
    const plan = await this.prismaService.plan.findFirst({
      where: {
        id: dto.planId,
        isActive: true,
      },
    });
    if (!plan) {
      throw new NotFoundException('Plan not found');
    }

    // check for active sunscription

    const existingSubscription =
      await this.prismaService.subscription.findFirst({
        where: {
          companyId: currentUser.companyId,
          status: {
            in: ['ACTIVE', 'TRIAL', 'PAST_DUE'],
          },
        },
      });

    if (existingSubscription) {
      throw new BadRequestException('Company already have active subscription');
    }
    // create subscription
    const subscription = await this.prismaService.subscription.create({
      data: {
        interval: dto.interval,
        plan: {
          connect: {
            id: dto.planId,
          },
        },
        company: {
          connect: {
            id: currentUser.companyId,
          },
        },
      },
    });

    return {
      message: 'active subscription have been successfully created ',
      data: subscription,
    };
  }

 

  async findAll(companyId: string) {
    return await this.prismaService.subscription.findMany({
      where: {
        companyId,
      },
    });
  }

  async findOne(companyId: string) {
    return await this.prismaService.subscription.findFirst({
      where: {
        companyId,
      },
    });
  }

  update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    return `This action updates a #${id} subscription`;
  }

  async remove(id: string, currentUser: userEntity) {
    if (!currentUser.companyId) {
      throw new BadRequestException('User is not assigned to a company');
    }

    const subscription = await this.prismaService.subscription.findFirst({
      where: {
        id,
        companyId: currentUser.companyId,
      },
    });

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    if (subscription.status === 'CANCELLED') {
      throw new BadRequestException('Subscription is already cancelled');
    }

    const cancelledSubscription = await this.prismaService.subscription.update({
      where: {
        id: subscription.id,
      },
      data: {
        status: 'CANCELLED',
        cancelAtPeriodEnd: true,
        cancelledAt: new Date(),
      },
    });

    return {
      message: 'Subscription cancelled successfully',
      data: cancelledSubscription,
    };
  }
}
