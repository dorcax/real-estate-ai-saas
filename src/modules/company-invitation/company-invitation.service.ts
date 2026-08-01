import {
  BadRequestException,
  ConflictException,
  GoneException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import {
  AcceptCompanyInvitationDto,
  CreateCompanyInvitation,
} from '../company-invitation/dto/create-companyInvitationDto'
import { userEntity } from '../auth/dto/create-auth.dto';
import { InvitationStatus } from '@prisma/client';
import { randomBytes } from 'crypto';
import { addMinutes } from 'date-fns';

@Injectable()
export class CompanyInvitationService {
  constructor(private readonly prismaService: PrismaService) {}


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
   
    const invitation = await this.prismaService.companyInvitation.create({
      data: {
        email,
        token:this.generateToken(),
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

  // reject company invite 
  async rejectCompanyInvitationByAgent(dto :AcceptCompanyInvitationDto,currentUser:userEntity){
    // find if the token exist 
    const {token} =dto
    const tokenExist  =await this.prismaService.companyInvitation.findUnique({
      where:{
        token 
      }
    })

    if(!tokenExist){
      throw new NotFoundException("token not found ")
    }

    // check if the invite status is pending  
    if(tokenExist.status !==InvitationStatus.PENDING){
      throw new ConflictException(`This invitation has already been ${tokenExist.status}`)

    }

    // check if it have expired  
    if (tokenExist.expiresAt <=new Date()){
      await this.prismaService.companyInvitation.update({
        where:{
          id:tokenExist.id
        },
        data:{
          status:InvitationStatus.EXPIRED
        }
      })
      throw new GoneException("Token have expired ")
    }
    // update the company reject 
    const rejectInvite =await this.prismaService.companyInvitation.update({
      where:{
        id:tokenExist.id
      },
      data:{
        status:InvitationStatus.DECLINED,
        acceptedBy:{
          connect:{
            id:currentUser.id
          }
        }
      }
    })
  }

  // generate token  
  private generateToken():string {
    return randomBytes(32).toString("hex")

  }

  // get expiryDate 
  private getExpiryDate() :Date {
    return addMinutes(Date.now(),10)
  }


  private async findInvitationByToken(token: string) {
    const invitation =
      await this.prismaService.companyInvitation.findUnique({
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
      throw new NotFoundException(
        'Invitation token was not found',
      );
    }

    return invitation;
  }


  private async validateInvittionNotExpired(invitation:any){
    if(invitation.expiresAt <= new Date()){
      await this.prismaService.companyInvitation.update({
        where:{
          id:invitation.idd


        },
        data:{
          status:invitation.EXPIRED
        }
      })

    }

  }
}
