import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { userEntity } from '../auth/dto/create-auth.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class AvailabilityService {
  constructor(private readonly prismaService:PrismaService){}
async createAvailability(
  dto: CreateAvailabilityDto,
  currentUser: userEntity,
) {
  const { dayOfWeek, startTime, endTime, timezone } = dto;

  if (startTime >= endTime) {
    throw new BadRequestException(
      'Start time must be before end time',
    );
  }

  const existing = await this.prismaService.availability.findUnique({
    where: {
      userId_dayOfWeek_startTime_endTime: {
        userId: currentUser.id,
        dayOfWeek,
        startTime,
        endTime,
      },
    },
  });

  if (existing) {
    throw new BadRequestException(
      'This availability already exists',
    );
  }

  const availability =
    await this.prismaService.availability.create({
      data: {
        dayOfWeek,
        startTime,
        endTime,
        timezone: timezone ?? 'Africa/Lagos',

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
    message: 'Availability created successfully',
    data: availability,
  };
}

  findAll() {
    return `This action returns all availability`;
  }

  findOne(id: number) {
    return `This action returns a #${id} availability`;
  }

  update(id: number, updateAvailabilityDto: UpdateAvailabilityDto) {
    return `This action updates a #${id} availability`;
  }

  remove(id: number) {
    return `This action removes a #${id} availability`;
  }
}
