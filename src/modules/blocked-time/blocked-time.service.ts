import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBlockedTimeDto } from './dto/create-blocked-time.dto';
import { UpdateBlockedTimeDto } from './dto/update-blocked-time.dto';
import { userEntity } from '../auth/dto/create-auth.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class BlockedTimeService {
  constructor(private readonly prismaService:PrismaService){}
async createBlockedTime(
  dto: CreateBlockedTimeDto,
  currentUser: userEntity,
) {
  const { startAt, endAt, reason } = dto;

  const start = new Date(startAt);
  const end = new Date(endAt);

  if (start >= end) {
    throw new BadRequestException(
      'Start time must be before end time',
    );
  }

  const conflict =
    await this.prismaService.blockedTime.findFirst({
      where: {
        userId: currentUser.id,
        startAt: {
          lt: end,
        },
        endAt: {
          gt: start,
        },
      },
    });

  if (conflict) {
    throw new BadRequestException(
      'This time is already blocked',
    );
  }

  const blockedTime =
    await this.prismaService.blockedTime.create({
      data: {
        startAt: start,
        endAt: end,
        reason,

        company: {
          connect: {
            id: currentUser.companyId,
          },
        },

        user: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

  return {
    message: 'Blocked time created successfully',
    data: blockedTime,
  };
}


  findAll() {
    return `This action returns all blockedTime`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blockedTime`;
  }

  update(id: number, updateBlockedTimeDto: UpdateBlockedTimeDto) {
    return `This action updates a #${id} blockedTime`;
  }

  remove(id: number) {
    return `This action removes a #${id} blockedTime`;
  }
}
