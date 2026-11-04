import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  GoneException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InvitationStatus, Prisma } from '@prisma/client';
import { randomBytes } from 'crypto';
import { addMinutes } from 'date-fns';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { userEntity } from '../auth/dto/create-auth.dto';
import {
  CompanyInvitationDto,
  CreateCompanyInvitation,
} from '../company-invitation/dto/create-companyInvitationDto';
import { GetQueryDto } from './dto/getQuery.dto';

@Injectable()
export class CompanyInvitationService {
  constructor(private readonly prismaService: PrismaService) {}

  // company invitation
  async createCompanyInvitation(
    dto: CreateCompanyInvitation,
    currentUser: userEntity,
  ) {
    const { email, role } = dto;
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
          role,
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

    const invitation = await this.prismaService.companyInvitation.create({
      data: {
        email,
        role,
        token: this.generateToken(),
        expiresAt: this.getExpiryDate(),
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
    dto: CompanyInvitationDto,
    currentUser: userEntity,
  ) {
    const { token } = dto;
    // find the invitation
    const invitation = await this.prismaService.companyInvitation.findUnique({
      where: {
        token,
        // expiresAt: {
        //   gt: new Date(),
        // },
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
      throw new NotFoundException('Invitation token not found ');
    }
    // update the status to accepted
    if (invitation.status !== InvitationStatus.PENDING) {
      throw new ConflictException(
        `This invitation is already ${invitation.status.toLowerCase()}`,
      );
    }
    // check if the token have not expired
    if (invitation.expiresAt <= new Date()) {
      await this.prismaService.companyInvitation.update({
        where: {
          id: invitation.id,
        },
        data: {
          status: InvitationStatus.EXPIRED,
        },
      });
      throw new GoneException('this invitation has  expired ');
    }

    if (invitation.email !== currentUser.email) {
      throw new ForbiddenException('you are not the owner of this invitation');
    }

    // update the user company and company invitation
    return await this.prismaService.$transaction(async (prisma) => {
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

      return {
        message: 'invitation accepted ',
        user: updateUser,
      };
    });
  }

  // reject company invite
  async rejectCompanyInvitationByAgent(
    dto: CompanyInvitationDto,
    currentUser: userEntity,
  ) {
    // find if the token exist
    const { token } = dto;

    const invitation = await this.findInvitationByToken(token);

    // check if the invite status is pending
    if (invitation.status !== InvitationStatus.PENDING) {
      throw new ConflictException(
        `This invitation has already been ${invitation.status}`,
      );
    }

    await this.validateInvitationNotExpired(invitation);
    // update the company reject
    const declineInvitation = await this.prismaService.companyInvitation.update(
      {
        where: {
          id: invitation.id,
        },
        data: {
          status: InvitationStatus.DECLINED,
          acceptedBy: {
            connect: {
              id: currentUser.id,
            },
          },
        },
      },
    );
    return {
      message: 'Invitation is declined successfully ',
      data: declineInvitation,
    };
  }

  async getCompanyInvitation(currentUser: userEntity, query: GetQueryDto) {
    const { status, page, limit, search } = query;
    const skip = (page - 1) * limit;
    const searchTerm = search?.trim() ?? '';
    const where: Prisma.CompanyInvitationWhereInput = {
      companyId: currentUser.companyId,
      ...(status && { status: status }),
      ...(search && {
        OR: [
          { email: { contains: search, mode: 'insensitive' } },
          ...(Object.values(InvitationStatus).some(
            (value) => value.toLowerCase() === searchTerm.toLowerCase(),
          )
            ? [
                {
                  status: {
                    equals: Object.values(InvitationStatus).find(
                      (value) =>
                        value.toLowerCase() === searchTerm.toLowerCase(),
                    ),
                  },
                },
              ]
            : []),
        ],
      }),
    };
    const [data, total] = await Promise.all([
      this.prismaService.companyInvitation.findMany({
       where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prismaService.companyInvitation.count({
      where

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
  // get the company agent statistics

  async getStats(currentUser: userEntity) {
    // find if the company exist
    const existingCompany = await this.prismaService.company.findUnique({
      where: {
        id: currentUser.companyId,
      },
    });
    if (!existingCompany) {
      throw new NotFoundException('not found ');
    }

    const [totalMember, totalAdmin, totalAgent, totalPendingInvitation] =
      await Promise.all([
        this.prismaService.user.count({
          where: {
            companyId: currentUser.id,
            role: {
              in: ['ADMIN', 'AGENT'],
            },
          },
        }),
        this.prismaService.companyInvitation.count({
          where: {
            companyId: currentUser.id,

            role: 'AGENT',
          },
        }),
        this.prismaService.companyInvitation.count({
          where: {
            companyId: currentUser.id,

            role: 'ADMIN',
          },
        }),
        this.prismaService.companyInvitation.count({
          where: {
            companyId: currentUser.id,
            status: InvitationStatus.PENDING,
            expiresAt: {
              gt: new Date(),
            },
          },
        }),
      ]);
    console.log(totalMember, totalAdmin, totalAgent, totalPendingInvitation);
    return {
      totalMember,
      totalAdmin,
      totalAgent,
      totalPendingInvitation,
    };
  }




async getTeamMembers(currentUser: userEntity) {
  const companyId = currentUser.companyId;

  if (!companyId) {
    throw new BadRequestException("You must belong to a company");
  }

  const members = await this.prismaService.user.findMany({
    where: {
      companyId,
      role: {
        in: [ "ADMIN", "AGENT"],
      },
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      avatarUrl: true,
      role: true,
      isActive: true,
      createdAt: true,

      _count: {
        select: {
          propertyAssignments: true,
          assignedLeads: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return members
    // assignedProperties: member._count.propertyAssignments,
    // assignedLeads: member._count.assignedLeads,
    // joinedAt: member.createdAt,
  // }));
}

  async getCompanyInvitationById(id: string, currentUser: userEntity) {
    const invitation = await this.prismaService.companyInvitation.findFirst({
      where: {
        id,
        companyId: currentUser.companyId,
      },
    });
    if (!invitation) {
      throw new NotFoundException('invitation not found');
    }
    return invitation;
  }

  // generate token
  private generateToken(): string {
    return randomBytes(32).toString('hex');
  }

  // get expiryDate
  private getExpiryDate(): Date {
    return addMinutes(Date.now(), 10);
  }

  private async findInvitationByToken(token: string) {
    const invitation = await this.prismaService.companyInvitation.findUnique({
      where: {
        token: token.trim(),
      },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!invitation) {
      throw new NotFoundException('Invitation token was not found');
    }

    return invitation;
  }

  private async validateInvitationNotExpired(invitation: any) {
    if (invitation.expiresAt <= new Date()) {
      await this.prismaService.companyInvitation.update({
        where: {
          id: invitation.id,
        },
        data: {
          status: InvitationStatus.EXPIRED,
        },
      });
      throw new GoneException('This invitation have expired ');
    }
  }
}
