import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  AcceptCompanyInvitationDto,
  CreateCompanyDto,
  CreateCompanyInvitation,
} from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { userEntity } from '../auth/dto/create-auth.dto';
import { randomBytes } from 'crypto';
import { addMinutes, isAfter } from 'date-fns';
import { InvitationStatus } from '@prisma/client';

@Injectable()
export class CompanyService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createCompanyDto: CreateCompanyDto, currentUser: userEntity) {
    const { name, description, address, email, phoneNumber, logoId } =
      createCompanyDto;
    // check if company already exist
    const existingCompany = await this.prismaService.company.findUnique({
      where: {
        email,
      },
    });

    if (existingCompany) {
      throw new ConflictException(
        'Company with this email or name already exists',
      );
    }

    const createCompany = await this.prismaService.company.create({
      data: {
        name,
        description,
        address,
        email,
        phoneNumber,
        ...(logoId && {
          logo: {
            connect: {
              id: logoId,
            },
          },
        }),
        users: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });
    return {
      message: 'company corrected created ',
      data: createCompany,
    };
  }


  
  // company invitation

  async createCompanyInvitation(
    dto: CreateCompanyInvitation,
    currentUser: userEntity,
  ) {
    const { email } = dto;
    if (!currentUser.companyId) {
      throw new BadRequestException(
        'you must belong to a company before you can invite an agent ',
      );
    }

    // find existing invitation
    const existingInvitation =
      await this.prismaService.companyInvitation.findFirst({
        where: {
          email,
          status: InvitationStatus.PENDING,

          companyId: currentUser.companyId,

          expiresAt: {
            gt: new Date(),
          },
        },
      });

    if (existingInvitation) {
      throw new ConflictException(
        'An active invitation has already been sent to this email',
      );
    }
    // create invitation
    const token = randomBytes(32).toString('hex');
    const invitation = await this.prismaService.companyInvitation.create({
      data: {
        email,
        token,
        expiresAt: addMinutes(Date.now(), 10),
        company: {
          connect: {
            id: currentUser.companyId,
          },
        },
        invitedBy: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    // send mail to user here

    return {
      message: 'invitation sent successfully',
      invitation,
    };
  }

  // accept invitation

  async acceptCompanyInvitation(
    dto: AcceptCompanyInvitationDto,
    currentUser: userEntity,
  ) {
    const { token } = dto;
    // find the invitation
    const invitation = await this.prismaService.companyInvitation.findFirst({
      where: {
        token,
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        company: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });

    if (!invitation) {
      throw new NotFoundException('Invitation token not found or expired  ');
    }
    // update the status to accepted
    if (invitation.status !== InvitationStatus.PENDING) {
      throw new ConflictException(
        `This invitation is already ${invitation.status.toLowerCase()}`,
      );
    }
    // update the user company and company invitation
    const result = await this.prismaService.$transaction(async (prisma) => {
      const updatedInvitation = await prisma.companyInvitation.update({
        where: {
          id: invitation.id,
        },
        data: {
          status: InvitationStatus.ACCEPTED,
          acceptedBy: {
            connect: {
              id: currentUser.id,
            },
          },
          acceptedAt: new Date(),
        },
      });

      const updateUser = await prisma.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          role: invitation.role,
          company: {
            connect: {
              id: invitation.companyId,
            },
          },
        },
      });
    });
    return {
      message: 'invitation accepted ',
      result,
    };
  }

  findAll() {
    return `This action returns all company`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
