import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { userEntity } from '../auth/dto/create-auth.dto';
import { FlutterwaveService } from '../flutterwave/flutterwave.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { calculatePeriodEnd } from 'src/utils/calculatePeriodEnd';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly flutterwaveService: FlutterwaveService,
    private readonly logger: Logger,
  ) {}
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
        trialEndsAt: dto.trial
          ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          : null,
        currentPeriodStart: new Date(),
        currentPeriodEnd: calculatePeriodEnd(dto.interval),
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
    if (subscription.flutterwaveSubscriptionId) {
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

  // checkout
  async subscriptionCheckout(subscriptionId: string, currentUser: userEntity) {
    // get subscription
    const subscription = await this.prismaService.subscription.findUnique({
      where: {
        id: subscriptionId,
        companyId: currentUser.companyId,
      },
      include: {
        plan: true,

        company: true,
      },
    });

    if (!subscription) {
      throw new NotFoundException('subscription not found ');
    }
    // make sure the subscription is pending
    if (subscription.status !== 'PENDING') {
      throw new BadRequestException(
        'This subscription is not awaiting payment',
      );
    }
    // get plan
    if (!subscription.plan) {
      throw new NotFoundException('plan not found');
    }
    // get amount
    const amount =
      subscription.interval == 'MONTHLY'
        ? Number(subscription.plan.monthlyPrice)
        : Number(subscription.plan.yearlyPrice);

    if (!amount || amount <= 0) {
      throw new BadRequestException('Invalid plan price');
    }
    // generate transation reference code
    const txRef = `SUB-${subscription.id}-${Date.now()}`;
    // create payment
    const data = await this.prismaService.$transaction(async (tx) => {
      const payment = await tx.payment.create({
        data: {
          amount,

          currency: 'NGN',

          status: 'PENDING',

          description: `Payment for ${subscription.plan.name} subscription`,

          flutterwaveReference: txRef,

          companyId: currentUser.companyId,

          subscriptionId: subscription.id,
        },
      });

      try {
        const flutterwaveResponse =
          await this.flutterwaveService.initiatePayment({
            tx_ref: txRef,
            amount,
            currency: 'NGN',
            email: currentUser.email,
            name: currentUser.id || currentUser.email, // use actual name
            redirect_url: `${process.env.FRONTENDURL}/payment/callback`,
          });

        return {
          message: 'Payment initialized successfully',
          data: {
            paymentId: payment.id,
            subscriptionId: subscription.id,
            checkoutUrl: flutterwaveResponse.data.link,
          },
        };
      } catch (error) {
        await tx.payment.update({
          where: { id: payment.id },
          data: { status: 'FAILED' },
        });
        this.logger.error(`Flutterwave initiation failed: ${error}`);
        throw new BadRequestException(
          'Payment initialization failed. Please try again.',
        );
      }
    });
    return data;
  }
}
